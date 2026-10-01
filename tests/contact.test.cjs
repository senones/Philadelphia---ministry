const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { Readable } = require('node:stream');
const { randomUUID } = require('node:crypto');

const originalFetch = global.fetch;
const originalError = console.error;
const originalSettings = { apiKey: process.env.RESEND_API_KEY, from: process.env.CONTACT_FROM_EMAIL };
let handler;
let calls;
const payload = () => ({ name: 'Test Person', email: 'visitor@example.com', message: 'Eine kurze Kontaktanfrage.', locale: 'de', website: '', requestId: randomUUID() });

beforeEach(() => {
  delete require.cache[require.resolve('../api/contact.js')];
  handler = require('../api/contact.js');
  process.env.RESEND_API_KEY = 're_local_test_key';
  process.env.CONTACT_FROM_EMAIL = 'Philadelphia <kontakt@example.com>';
  calls = [];
  console.error = () => {};
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    return new Response(JSON.stringify({ id: 'test-email-id' }), { status: 200 });
  };
});

afterEach(() => {
  global.fetch = originalFetch;
  console.error = originalError;
  for (const [key, value] of [['RESEND_API_KEY', originalSettings.apiKey], ['CONTACT_FROM_EMAIL', originalSettings.from]]) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
});

async function invoke(options = {}) {
  const request = Object.assign(Readable.from(options.chunks || []), {
    method: options.method || 'POST',
    headers: { host: 'philadelphia.test', origin: 'https://philadelphia.test', 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.10', ...options.headers },
  });
  if (!options.chunks) request.body = options.body === undefined ? payload() : options.body;
  if (options.bodyGetter) Object.defineProperty(request, 'body', { get: options.bodyGetter });
  const response = { headers: {}, setHeader(name, value) { this.headers[name.toLowerCase()] = value; }, end(value) { this.body = JSON.parse(value); } };
  await handler(request, response);
  return response;
}

test('configuration endpoint exposes only readiness and never mail credentials', async () => {
  const response = await invoke({ method: 'GET' });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { enabled: true });
  assert.equal(response.headers['cache-control'], 'no-store');
  assert.equal(calls.length, 0);
});

test('missing or malformed sender configuration disables sending', async () => {
  for (const from of ['', 'not-an-email', 'contact@example.com\r\nBcc: other@example.com']) {
    process.env.CONTACT_FROM_EMAIL = from;
    assert.deepEqual((await invoke({ method: 'GET' })).body, { enabled: false });
    assert.equal((await invoke()).statusCode, 503);
  }
  process.env.CONTACT_FROM_EMAIL = 'contact@example.com';
  delete process.env.RESEND_API_KEY;
  assert.equal((await invoke()).statusCode, 503);
  assert.equal(calls.length, 0);
});

test('successful submission always targets the fixed recipient and uses visitor Reply-To', async () => {
  const body = { ...payload(), name: '  Ελληνικά العربية  ', message: '<b>Nachricht</b>\nZweite Zeile', to: 'other@example.com', from: 'other@example.com', bcc: 'other@example.com' };
  const response = await invoke({ body });
  assert.deepEqual(response.body, { ok: true });
  assert.equal(response.statusCode, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.resend.com/emails');
  const email = JSON.parse(calls[0].options.body);
  assert.deepEqual(email.to, ['tsorakis@hotmail.de']);
  assert.equal(email.from, 'Philadelphia <kontakt@example.com>');
  assert.equal(email.reply_to, 'visitor@example.com');
  assert.equal(email.html, undefined);
  assert.equal(email.bcc, undefined);
  assert.match(email.text, /Ελληνικά العربية/);
  assert.match(email.text, /<b>Nachricht<\/b>/);
  assert.equal(calls[0].options.headers['Idempotency-Key'], `philadelphia-contact/${body.requestId}`);
});

test('streamed JSON works as well as Vercel parsed request bodies', async () => {
  const body = JSON.stringify(payload());
  const response = await invoke({ chunks: [body.slice(0, 20), body.slice(20)] });
  assert.equal(response.statusCode, 200);
  assert.equal(calls.length, 1);
});

test('cross-origin, missing origin, unsupported method and content type cannot send email', async () => {
  assert.equal((await invoke({ headers: { origin: 'https://another.test' } })).statusCode, 403);
  assert.equal((await invoke({ headers: { origin: undefined } })).statusCode, 403);
  assert.equal((await invoke({ headers: { origin: 'null' } })).statusCode, 403);
  assert.equal((await invoke({ headers: { 'content-type': 'application/x-www-form-urlencoded' } })).statusCode, 415);
  const response = await invoke({ method: 'DELETE' });
  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.allow, 'GET, POST');
  assert.equal(calls.length, 0);
});

test('malformed and excessive payloads are rejected without reaching Resend', async () => {
  assert.equal((await invoke({ body: '{invalid' })).statusCode, 400);
  assert.equal((await invoke({ bodyGetter: () => { throw new SyntaxError('malformed JSON'); } })).statusCode, 400);
  assert.equal((await invoke({ chunks: ['a'.repeat(32769)] })).statusCode, 413);
  assert.equal((await invoke({ headers: { 'content-length': '32769' } })).statusCode, 413);
  assert.equal(calls.length, 0);
});

for (const [label, change] of Object.entries({
  'honeypot': { website: 'bot.example' },
  'empty name': { name: '   ' },
  'header injection': { name: 'Name\r\nBcc: other@example.com' },
  'long name': { name: 'n'.repeat(121) },
  'invalid email': { email: 'invalid' },
  'multiple Reply-To addresses': { email: 'a@example.com,b@example.com' },
  'empty message': { message: '  ' },
  'long message': { message: 'm'.repeat(5001) },
  'null byte': { message: 'Hello\u0000World' },
  'non-string field': { email: ['visitor@example.com'] },
  'invalid request ID': { requestId: 'not-a-uuid' },
})) test(`input validation rejects ${label}`, async () => {
  assert.equal((await invoke({ body: { ...payload(), ...change } })).statusCode, 400);
  assert.equal(calls.length, 0);
});

test('provider rejection, malformed success and connection failures never report success', async () => {
  for (const [status, result] of [[403, { message: 'Unverified domain' }], [200, {}], [200, { id: 123 }], [200, { id: ' ' }]]) {
    global.fetch = async () => new Response(JSON.stringify(result), { status });
    const response = await invoke();
    assert.equal(response.statusCode, 502);
    assert.deepEqual(response.body, { error: 'send_failed' });
  }
  global.fetch = async () => { throw new Error('Network failure'); };
  assert.equal((await invoke()).statusCode, 502);
});

test('provider rate limit has a distinct error response', async () => {
  global.fetch = async () => new Response('{}', { status: 429 });
  assert.deepEqual((await invoke()).body, { error: 'rate_limit' });
});

test('sixth attempt within a warm instance is limited and other client IP remains usable', async () => {
  for (let i = 0; i < 5; i++) assert.equal((await invoke()).statusCode, 200);
  const response = await invoke();
  assert.equal(response.statusCode, 429);
  assert.equal(response.headers['retry-after'], '60');
  assert.equal(calls.length, 5);
  assert.equal((await invoke({ headers: { 'x-forwarded-for': '192.0.2.11' } })).statusCode, 200);
});
