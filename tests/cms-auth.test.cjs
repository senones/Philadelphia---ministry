const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { getConfig, issueState, readState } = require('../lib/cms.cjs');
const configHandler = require('../api/cms-config.js');
const authHandler = require('../api/cms-auth.js');
const callbackHandler = require('../api/cms-callback.js');
const originalFetch = global.fetch;
const envNames = ['CMS_SITE_URL', 'CMS_GITHUB_REPO', 'CMS_GITHUB_BRANCH', 'CMS_GITHUB_SCOPE', 'CMS_GITHUB_CLIENT_ID', 'CMS_GITHUB_CLIENT_SECRET'];
const originalEnv = Object.fromEntries(envNames.map(name => [name, process.env[name]]));
let fetches;

beforeEach(() => {
  Object.assign(process.env, { CMS_SITE_URL: 'https://website.example.test', CMS_GITHUB_REPO: 'ministry/website', CMS_GITHUB_CLIENT_ID: 'test-client-id', CMS_GITHUB_CLIENT_SECRET: 'test-only-client-secret' });
  delete process.env.CMS_GITHUB_BRANCH; delete process.env.CMS_GITHUB_SCOPE;
  fetches = [];
  global.fetch = async (url, options) => {
    fetches.push({ url, options });
    if (url === 'https://github.com/login/oauth/access_token') return Response.json({ access_token: 'test-only-editor-token', token_type: 'bearer' });
    if (url === 'https://api.github.com/user') return Response.json({ login: 'test-editor' });
    if (url === 'https://api.github.com/repos/ministry/website') return Response.json({ full_name: 'ministry/website', permissions: { push: true } });
    throw new Error('Unexpected provider URL');
  };
});
after(() => {
  global.fetch = originalFetch;
  for (const [name, value] of Object.entries(originalEnv)) { if (value === undefined) delete process.env[name]; else process.env[name] = value; }
});
async function call(handler, { url = '/', method = 'GET', host = 'website.example.test', cookie = '' } = {}) {
  const headers = {};
  const res = { statusCode: 200, setHeader(name, value) { headers[name.toLowerCase()] = value; }, end(body = '') { this.body = body; } };
  await handler({ url, method, headers: { host, cookie } }, res);
  return { status: res.statusCode, headers, body: res.body };
}
function loginRequest(extra = '') {
  const state = issueState(getConfig());
  return { url: `/api/cms-callback?code=test-code&state=${state.state}${extra}`, cookie: state.cookie.split(';')[0], state };
}

test('the unconfigured editor stays disabled', async () => {
  delete process.env.CMS_GITHUB_CLIENT_SECRET;
  assert.deepEqual(JSON.parse((await call(configHandler)).body), { enabled: false });
  assert.equal((await call(authHandler)).status, 503);
});
test('public configuration contains no credentials or local backend', async () => {
  const response = await call(configHandler);
  const data = JSON.parse(response.body);
  assert.equal(data.enabled, true);
  assert.equal(data.config.backend.repo, 'ministry/website');
  assert.equal(data.config.backend.auth_endpoint, 'api/cms-auth');
  assert.equal(data.config.local_backend, undefined);
  assert(!response.body.includes('test-only-client-secret'));
  assert(!response.body.includes('test-client-id'));
  assert.equal(response.headers['cache-control'], 'no-store');
});
test('preview and attacker hosts cannot enable authentication', async () => {
  assert.equal(JSON.parse((await call(configHandler, { host: 'attacker.example.test' })).body).enabled, false);
  assert.equal((await call(authHandler, { host: 'attacker.example.test' })).status, 403);
  assert.equal((await call(callbackHandler, { host: 'attacker.example.test' })).status, 403);
});
test('all CMS endpoints reject non-GET methods', async () => {
  for (const handler of [configHandler, authHandler, callbackHandler]) {
    const response = await call(handler, { method: 'POST' });
    assert.equal(response.status, 405); assert.equal(response.headers.allow, 'GET');
  }
});
test('invalid CMS site URL and repository fail closed', () => {
  for (const bad of ['http://website.example.test', 'https://user:password@website.example.test', 'https://website.example.test/other', 'https://website.example.test/?x=1']) {
    process.env.CMS_SITE_URL = bad; assert.equal(getConfig(), null);
  }
  process.env.CMS_SITE_URL = 'https://website.example.test';
  process.env.CMS_GITHUB_REPO = 'owner/../secret'; assert.equal(getConfig(), null);
});
test('authorization fixes the callback, scope and provider and uses PKCE', async () => {
  const response = await call(authHandler, { url: '/api/cms-auth?provider=github&scope=admin:org&redirect_uri=https://attacker.example.test' });
  assert.equal(response.status, 302);
  const redirect = new URL(response.headers.location);
  assert.equal(redirect.origin, 'https://github.com');
  assert.equal(redirect.searchParams.get('scope'), 'repo');
  assert.equal(redirect.searchParams.get('redirect_uri'), 'https://website.example.test/api/cms-callback');
  assert.equal(redirect.searchParams.get('code_challenge_method'), 'S256');
  assert.match(redirect.searchParams.get('state'), /^[\w-]{43}$/);
  const cookie = response.headers['set-cookie'];
  for (const flag of ['Secure', 'HttpOnly', 'SameSite=Lax', 'Path=/']) assert(cookie.includes(flag));
  const state = readState({ headers: { cookie: cookie.split(';')[0] } }, getConfig(), redirect.searchParams.get('state'));
  assert.equal(redirect.searchParams.get('code_challenge'), crypto.createHash('sha256').update(state.verifier).digest('base64url'));
});
test('public repositories can use public_repo instead of private scope', async () => {
  process.env.CMS_GITHUB_SCOPE = 'public_repo';
  assert.equal(new URL((await call(authHandler)).headers.location).searchParams.get('scope'), 'public_repo');
});
test('an arbitrary provider is rejected', async () => {
  assert.equal((await call(authHandler, { url: '/api/cms-auth?provider=other' })).status, 400);
});
test('missing state cookie never calls GitHub', async () => {
  assert.equal((await call(callbackHandler, { url: '/api/cms-callback?code=test&state=test' })).status, 403);
  assert.equal(fetches.length, 0);
});
test('wrong state and tampered cookie never call GitHub', async () => {
  const request = loginRequest();
  assert.equal((await call(callbackHandler, { ...request, url: '/api/cms-callback?code=test&state=wrong' })).status, 403);
  assert.equal((await call(callbackHandler, { ...request, cookie: request.cookie + 'x' })).status, 403);
  assert.equal(fetches.length, 0);
});
test('an expired signed state is rejected', async () => {
  const state = issueState(getConfig(), Date.now() - 610000);
  const response = await call(callbackHandler, { url: `/api/cms-callback?code=test&state=${state.state}`, cookie: state.cookie.split(';')[0] });
  assert.equal(response.status, 403); assert.equal(fetches.length, 0);
});
test('cancelling authentication clears state and returns an honest error', async () => {
  const response = await call(callbackHandler, loginRequest('&error=access_denied'));
  assert.equal(response.status, 400); assert.equal(fetches.length, 0);
  assert(response.headers['set-cookie'].includes('Max-Age=0'));
  assert(!response.body.includes('authorization:github:success'));
});
test('a missing authorization code is rejected', async () => {
  const request = loginRequest();
  request.url = request.url.replace('code=test-code&', '');
  assert.equal((await call(callbackHandler, request)).status, 400);
  assert.equal(fetches.length, 0);
});
test('successful authentication checks identity and repository write permission', async () => {
  const response = await call(callbackHandler, loginRequest());
  assert.equal(response.status, 200);
  assert.equal(fetches.length, 3);
  assert.equal(fetches[0].options.body.get('client_secret'), 'test-only-client-secret');
  assert.match(fetches[0].options.body.get('code_verifier'), /^[\w-]{64}$/);
  assert.equal(fetches[2].options.headers.Authorization, 'Bearer test-only-editor-token');
  assert(response.body.includes('authorization:github:success'));
  assert(response.body.includes("event.origin !== origin || event.source !== opener"));
  assert(response.body.includes("event.data !== 'authorizing:github'"));
  assert(!response.body.includes("postMessage(message, '*')"));
  assert.equal(response.headers['cache-control'], 'no-store');
  assert.equal(response.headers['referrer-policy'], 'no-referrer');
  assert(response.headers['content-security-policy'].includes("default-src 'none'"));
  assert(!response.body.includes('test-only-client-secret'));
});
test('users without repository write access never receive the token', async () => {
  const previous = global.fetch;
  global.fetch = (url, options) => url.includes('/repos/') ? Response.json({ full_name: 'ministry/website', permissions: { push: false } }) : previous(url, options);
  const response = await call(callbackHandler, loginRequest());
  assert.equal(response.status, 403); assert(!response.body.includes('test-only-editor-token'));
});
test('a different repository response fails closed', async () => {
  const previous = global.fetch;
  global.fetch = (url, options) => url.includes('/repos/') ? Response.json({ full_name: 'other/repository', permissions: { push: true } }) : previous(url, options);
  assert.equal((await call(callbackHandler, loginRequest())).status, 403);
});
test('provider errors and network failures never report success', async () => {
  for (const provider of [() => Response.json({ error: 'bad_verification_code' }), () => Response.json({}, { status: 500 }), () => { throw new Error('offline'); }]) {
    global.fetch = provider;
    const response = await call(callbackHandler, loginRequest());
    assert.equal(response.status, 502); assert(!response.body.includes('authorization:github:success'));
  }
});
test('provider strings are safely escaped in the authentication popup', async () => {
  const previous = global.fetch;
  global.fetch = (url, options) => url.includes('/access_token') ? Response.json({ access_token: '</script><script>alert(1)</script>', token_type: 'bearer' }) : previous(url, options);
  const response = await call(callbackHandler, loginRequest());
  assert.equal(response.status, 200);
  assert(!response.body.includes('</script><script>alert(1)</script>'));
});
