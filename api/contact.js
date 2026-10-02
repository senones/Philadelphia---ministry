// Vercel Node.js function. Keep mail credentials in server environment variables.
const RECIPIENT = 'info@philadelphia-ministry.org';
const MAX_BODY_BYTES = 32768;
const RATE_WINDOW_MS = 60000;
const RATE_LIMIT = 5;
const attempts = new Map();
const emailPattern = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/u;
const requestIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function mailSettings() {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const from = (process.env.CONTACT_FROM_EMAIL || '').trim();
  const address = from.match(/^[^<>]*<([^<>]+)>$/)?.[1] || from;
  return { apiKey, from, enabled: Boolean(apiKey && emailPattern.test(address) && !/[\r\n\u0000]/.test(from)) };
}

function json(response, status, body) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.statusCode = status;
  response.end(JSON.stringify(body));
}

function sameOrigin(request) {
  try {
    const origin = new URL(request.headers.origin);
    return ['https:', 'http:'].includes(origin.protocol) && origin.host === request.headers.host;
  } catch { return false; }
}

function rateLimited(request) {
  const now = Date.now();
  for (const [key, item] of attempts) if (item.until <= now) attempts.delete(key);
  // Vercel supplies the client IP. This is a best-effort limit per warm instance.
  const ip = String(request.headers['x-forwarded-for'] || request.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const item = attempts.get(ip) || { count: 0, until: now + RATE_WINDOW_MS };
  if (item.count >= RATE_LIMIT) return true;
  item.count += 1;
  if (!attempts.has(ip) && attempts.size >= 1024) attempts.delete(attempts.keys().next().value);
  attempts.set(ip, item);
  return false;
}

async function readBody(request) {
  if (Number(request.headers['content-length']) > MAX_BODY_BYTES) throw new RangeError('body_size');
  let body = request.body;
  if (body === undefined) {
    const chunks = [];
    let bytes = 0;
    for await (const chunk of request) {
      bytes += Buffer.byteLength(chunk);
      if (bytes > MAX_BODY_BYTES) throw new RangeError('body_size');
      chunks.push(Buffer.from(chunk));
    }
    body = Buffer.concat(chunks).toString('utf8');
  }
  if (Buffer.isBuffer(body)) body = body.toString('utf8');
  if (typeof body === 'string') {
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) throw new RangeError('body_size');
    body = JSON.parse(body);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new TypeError('body_format');
  if (Buffer.byteLength(JSON.stringify(body)) > MAX_BODY_BYTES) throw new RangeError('body_size');
  return body;
}

module.exports = async function contact(request, response) {
  const settings = mailSettings();
  if (request.method === 'GET') return json(response, 200, { enabled: settings.enabled });
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST');
    return json(response, 405, { error: 'method_not_allowed' });
  }
  if (!settings.enabled) return json(response, 503, { error: 'unavailable' });
  if (!sameOrigin(request)) return json(response, 403, { error: 'forbidden' });
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers['content-type'] || '')) return json(response, 415, { error: 'invalid_format' });
  if (rateLimited(request)) {
    response.setHeader('Retry-After', '60');
    return json(response, 429, { error: 'rate_limit' });
  }

  let body;
  try { body = await readBody(request); }
  catch (error) { return json(response, error instanceof RangeError ? 413 : 400, { error: 'invalid' }); }
  if (body.website || !['name', 'email', 'message', 'requestId'].every((key) => typeof body[key] === 'string')) return json(response, 400, { error: 'invalid' });
  const name = body.name.trim();
  const email = body.email.trim();
  const message = body.message.trim();
  if (!name || name.length > 120 || /[\u0000-\u001f\u007f]/.test(name) || email.length > 254 || !emailPattern.test(email) || !message || message.length > 5000 || message.includes('\u0000') || !requestIdPattern.test(body.requestId)) return json(response, 400, { error: 'invalid' });
  const language = ['de', 'en', 'el', 'ar'].includes(body.locale) ? body.locale : 'de';

  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${settings.apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `philadelphia-contact/${body.requestId}`,
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        from: settings.from,
        to: [RECIPIENT],
        reply_to: email,
        subject: 'Neue Kontaktanfrage – Philadelphia International Ministry',
        text: `Kontaktanfrage über die Philadelphia-Website\n\nName: ${name}\nE-Mail: ${email}\nWebsite-Sprache: ${language}\n\nNachricht:\n${message}`,
      }),
    });
    const data = await result.json().catch(() => null);
    if (!result.ok || typeof data?.id !== 'string' || !data.id.trim()) {
      // Do not log the visitor's message, address, or provider credentials.
      console.error('Contact email rejected by provider', result.status);
      return json(response, result.status === 429 ? 429 : 502, { error: result.status === 429 ? 'rate_limit' : 'send_failed' });
    }
    return json(response, 200, { ok: true });
  } catch {
    console.error('Contact email provider could not be reached');
    return json(response, 502, { error: 'send_failed' });
  }
};
