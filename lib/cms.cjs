const crypto = require('node:crypto');
const schema = require('../apps/web/public/admin/collections.json');
const COOKIE = '__Host-philadelphia-cms';

function getConfig() {
  const { CMS_SITE_URL, CMS_GITHUB_REPO, CMS_GITHUB_CLIENT_ID, CMS_GITHUB_CLIENT_SECRET } = process.env;
  if (!CMS_SITE_URL || !CMS_GITHUB_REPO || !CMS_GITHUB_CLIENT_ID || !CMS_GITHUB_CLIENT_SECRET) return null;
  try {
    const site = new URL(CMS_SITE_URL);
    if (site.protocol !== 'https:' || site.username || site.password || site.pathname !== '/' || site.search || site.hash) return null;
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(CMS_GITHUB_REPO) || CMS_GITHUB_REPO.includes('..')) return null;
    const scope = process.env.CMS_GITHUB_SCOPE || 'repo';
    if (!['repo', 'public_repo'].includes(scope)) return null;
    return {
      origin: site.origin, host: site.host,
      repo: CMS_GITHUB_REPO, branch: process.env.CMS_GITHUB_BRANCH || 'main', scope,
      clientId: CMS_GITHUB_CLIENT_ID, secret: CMS_GITHUB_CLIENT_SECRET,
      callback: `${site.origin}/api/cms-callback`,
    };
  } catch { return null; }
}
const matchesHost = (req, config) => String(req.headers?.host || '').toLowerCase() === config.host.toLowerCase();
function publicConfig(config) {
  return { ...schema, site_url: config.origin, display_url: config.origin, backend: {
    name: 'github', repo: config.repo, branch: config.branch,
    base_url: config.origin, auth_endpoint: 'api/cms-auth', auth_scope: config.scope, site_domain: config.host,
    commit_messages: { update: 'Inhalt geändert: {{collection}} / {{slug}}', uploadMedia: 'Bild oder Dokument hochgeladen: {{path}}', deleteMedia: 'Mediendatei entfernt: {{path}}' },
  } };
}
function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(body));
}
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const aa = Buffer.from(a); const bb = Buffer.from(b);
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}
const sign = (value, secret) => crypto.createHmac('sha256', secret).update(`philadelphia-cms:${value}`).digest('base64url');
function issueState(config, now = Date.now()) {
  const state = crypto.randomBytes(32).toString('base64url');
  const verifier = crypto.randomBytes(48).toString('base64url');
  const value = Buffer.from(JSON.stringify({ state, verifier, expires: now + 600000 })).toString('base64url');
  return { state, challenge: crypto.createHash('sha256').update(verifier).digest('base64url'), cookie: `${COOKIE}=${value}.${sign(value, config.secret)}; Path=/; Max-Age=600; Secure; HttpOnly; SameSite=Lax` };
}
function readState(req, config, state, now = Date.now()) {
  const cookie = String(req.headers?.cookie || '').split(';').map(item => item.trim()).find(item => item.startsWith(`${COOKIE}=`));
  if (!cookie || cookie.length > 2000) return null;
  const [value, signature, extra] = cookie.slice(COOKIE.length + 1).split('.');
  if (extra || !signature || !safeEqual(signature, sign(value, config.secret))) return null;
  try {
    const data = JSON.parse(Buffer.from(value, 'base64url').toString());
    if (!safeEqual(data.state, state) || !/^[\w-]{64}$/.test(data.verifier) || !Number.isFinite(data.expires) || data.expires < now || data.expires > now + 600000) return null;
    return data;
  } catch { return null; }
}
function clearState(res) { res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Lax`); }
const jsString = value => JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
function popup(res, config, status, result) {
  const nonce = crypto.randomBytes(18).toString('base64');
  const success = Boolean(result.token);
  const message = `authorization:github:${success ? 'success' : 'error'}:${JSON.stringify(result)}`;
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'nonce-${nonce}'; base-uri 'none'; frame-ancestors 'none'`);
  res.end(`<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Philadelphia · Anmeldung</title><style nonce="${nonce}">body{font:16px/1.6 system-ui;max-width:500px;margin:15vh auto;padding:24px;color:#29251f}h1{font-size:24px}</style><h1>${success ? 'Anmeldung erfolgreich' : 'Anmeldung nicht abgeschlossen'}</h1><p>${success ? 'Dieses Fenster kann geschlossen werden. Sie kehren zum Bearbeitungsbereich zurück.' : 'Bitte schließen Sie dieses Fenster und versuchen Sie die Anmeldung erneut. Bei fehlendem Zugriff wenden Sie sich an den Verantwortlichen der Website.'}</p><script nonce="${nonce}">
    const origin = ${jsString(config.origin)};
    const message = ${jsString(message)};
    const opener = window.opener;
    if (opener) {
      const receive = event => {
        if (event.origin !== origin || event.source !== opener || event.data !== 'authorizing:github') return;
        window.removeEventListener('message', receive);
        opener.postMessage(message, origin);
        window.setTimeout(() => window.close(), 100);
      };
      window.addEventListener('message', receive);
      opener.postMessage('authorizing:github', origin);
    }
  </script></html>`);
}
module.exports = { COOKIE, getConfig, matchesHost, publicConfig, json, issueState, readState, clearState, popup };
