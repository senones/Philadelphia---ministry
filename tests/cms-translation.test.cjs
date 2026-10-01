const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Readable } = require('node:stream');
const { translationStatus, protectText, restoreText, translateTexts, readBody, createTranslationHandler, authorizeGithub } = require('../lib/cms-translation.cjs');
const key = 'test-only-key:fx';
const env = { CMS_TRANSLATION_PROVIDER: 'deepl', DEEPL_API_KEY: key };
function call(handler, request = {}) {
  const headers = {}; let resolve;
  const done = new Promise(result => { resolve = result; });
  const req = { method: 'POST', headers: { host: 'website.example', origin: 'https://website.example', 'content-type': 'application/json', authorization: 'Bearer test-editor-token', ...request.headers }, body: { source: 'el', targets: ['de', 'en', 'ar'], texts: ['Γεια σας'] }, ...request };
  req.headers = { host: 'website.example', origin: 'https://website.example', 'content-type': 'application/json', authorization: 'Bearer test-editor-token', ...request.headers };
  handler(req, { setHeader: (name, value) => { headers[name.toLowerCase()] = value; }, end(value) { resolve({ status: this.statusCode, headers, body: JSON.parse(value) }); } });
  return done;
}
const config = { origin: 'https://website.example', host: 'website.example', repo: 'ministry/website' };
function authorizedFetch(calls = []) {
  return async (url, options) => {
    calls.push({ url, options });
    if (url.startsWith('https://api.github.com/')) return Response.json({ full_name: config.repo, permissions: { push: true } });
    const body = JSON.parse(options.body);
    return Response.json({ translations: body.text.map(text => ({ text: text.replace('Γεια σας', body.target_lang === 'DE' ? 'Hallo' : body.target_lang === 'AR' ? 'مرحبا' : 'Hello') })) });
  };
}
test('public status contains availability and provider, never the key', () => {
  assert.deepEqual(translationStatus(env), { enabled: true, provider: 'deepl' });
  assert(!JSON.stringify(translationStatus(env)).includes(key));
  assert.equal(translationStatus({ DEEPL_API_KEY: 'replace_with_your_deepl_api_key' }).enabled, false);
});
test('Markdown, links, numbers, code and brand names survive both translation adapters', () => {
  const original = '# Willkommen\n\nWir helfen **Familien**: [Kontakt](https://example.org/de?x=1&y=2).\n- Philadelphia International Ministry, 2026\n`const a = 7;`';
  const protectedText = protectText(original);
  const xml = protectedText.xml.replace('Willkommen', 'Welcome').replace('Wir helfen', 'We help').replace('Familien', 'families').replace('Kontakt', 'Contact');
  const plain = protectedText.plain.replace('Willkommen', 'Welcome').replace('Wir helfen', 'We help').replace('Familien', 'families').replace('Kontakt', 'Contact');
  const expected = '# Welcome\n\nWe help **families**: [Contact](https://example.org/de?x=1&y=2).\n- Philadelphia International Ministry, 2026\n`const a = 7;`';
  assert.equal(restoreText(xml, protectedText, 'deepl'), expected);
  assert.equal(restoreText(plain, protectedText, 'openai'), expected);
});
test('a lost or duplicated protected element is rejected instead of changing a link', () => {
  const protectedText = protectText('Mehr unter https://example.org und **danke**.');
  assert.throws(() => restoreText('<text>More at https://different.example</text>', protectedText, 'deepl'), /Formatierungen/);
  assert.throws(() => restoreText(protectedText.plain.replace(/PHL_KEEP_\w+_0_END/, ''), protectedText, 'openai'), /Formatierungen/);
  assert.throws(() => restoreText(protectedText.plain + protectedText.plain, protectedText, 'openai'), /Formatierungen/);
});
test('Greek translates into all other languages using the Free endpoint and server-only auth', async () => {
  const calls = [], translations = await translateTexts({ source: 'el', targets: ['de', 'en', 'ar'], texts: ['Γεια σας'] }, { env, fetch: authorizedFetch(calls) });
  assert.deepEqual(translations, { de: ['Hallo'], en: ['Hello'], ar: ['مرحبا'] });
  assert.equal(calls.length, 3);
  for (const call of calls) {
    assert.equal(call.url, 'https://api-free.deepl.com/v2/translate');
    assert.equal(call.options.headers.Authorization, `DeepL-Auth-Key ${key}`);
    const body = JSON.parse(call.options.body); assert.equal(body.source_lang, 'EL'); assert.deepEqual(body.ignore_tags, ['keep']);
  }
});
test('Pro keys use the Pro endpoint', async () => {
  let actual;
  await translateTexts({ source: 'de', targets: ['el'], texts: ['Hallo'] }, { env: { DEEPL_API_KEY: 'test-pro-key' }, fetch: async (url, options) => { actual = url; return Response.json({ translations: JSON.parse(options.body).text.map(text => ({ text })) }); } });
  assert.equal(actual, 'https://api.deepl.com/v2/translate');
});
test('OpenAI uses the Responses API with strict output and restores protected Markdown', async () => {
  let request;
  const result = await translateTexts({ source: 'de', targets: ['el'], texts: ['Hallo **Freunde**.'] }, { env: { CMS_TRANSLATION_PROVIDER: 'openai', OPENAI_API_KEY: 'test-openai-key' }, fetch: async (url, options) => {
    request = { url, ...options }; const body = JSON.parse(options.body);
    return Response.json({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify({ translations: JSON.parse(body.input).map(text => text.replace('Hallo', 'Γεια σας').replace('Freunde', 'φίλοι')) }) }] }] });
  } });
  assert.deepEqual(result, { el: ['Γεια σας **φίλοι**.'] });
  assert.equal(request.url, 'https://api.openai.com/v1/responses');
  const body = JSON.parse(request.body);
  assert.equal(body.text.format.strict, true); assert.equal(body.store, false); assert.equal(body.model, 'gpt-4.1-mini');
  assert.equal(request.headers.Authorization, 'Bearer test-openai-key');
});
test('missing credentials make no external requests', async () => {
  let calls = 0;
  await assert.rejects(translateTexts({ source: 'de', targets: ['el'], texts: ['Hallo'] }, { env: {}, fetch: async () => { calls++; } }), /DEEPL_API_KEY/);
  assert.equal(calls, 0);
});
test('quota, auth, network and malformed responses fail with safe errors', async () => {
  for (const response of [Response.json({}, { status: 456 }), Response.json({ message: key }, { status: 403 }), Response.json({ translations: [] }), Response.json({ translations: [{ text: '<text>wrong <keep id="99">x</keep></text>' }] })]) {
    await assert.rejects(translateTexts({ source: 'de', targets: ['el'], texts: ['Hallo https://example.org'] }, { env, fetch: async () => response }), error => error.status >= 500 && !error.message.includes(key));
  }
  await assert.rejects(translateTexts({ source: 'de', targets: ['el'], texts: ['Hallo'] }, { env, fetch: async () => { throw new Error(key); } }), error => error.status === 502 && !error.message.includes(key));
});
test('incomplete OpenAI output never produces a translation', async () => {
  await assert.rejects(translateTexts({ source: 'de', targets: ['el'], texts: ['Hallo'] }, { env: { CMS_TRANSLATION_PROVIDER: 'openai', OPENAI_API_KEY: 'test-openai-key' }, fetch: async () => Response.json({ status: 'incomplete', output: [] }) }), /OpenAI/);
});
test('bad languages, oversized text and duplicate targets are rejected before contacting a provider', async () => {
  for (const data of [
    { source: '__proto__', targets: ['de'], texts: ['Hallo'] },
    { source: 'de', targets: ['de'], texts: ['Hallo'] },
    { source: 'de', targets: ['el', 'el'], texts: ['Hallo'] },
    { source: 'de', targets: ['el'], texts: ['x'.repeat(12001)] },
    { source: 'de', targets: ['el'], texts: [''] },
  ]) {
    await assert.rejects(translateTexts(data, { env, fetch: async () => { throw new Error('Must not fetch'); } }), error => error.status === 400);
  }
});
test('streamed Greek and Arabic remain intact across single-byte chunk boundaries', async () => {
  const original = { source: 'el', targets: ['ar'], texts: ['Ελληνικά · العربية'] };
  const raw = Buffer.from(JSON.stringify(original));
  const request = Readable.from([...raw].map(byte => Buffer.from([byte]))); request.headers = { 'content-type': 'application/json' };
  assert.deepEqual(await readBody(request), original);
});
test('translation HTTP endpoint verifies repository write permission and keeps credentials private', async () => {
  const calls = [], request = authorizedFetch(calls);
  const handler = createTranslationHandler({ env, fetch: request, authorize: (req, fetch) => authorizeGithub(req, fetch, config) });
  const response = await call(handler);
  assert.equal(response.status, 200); assert.equal(response.headers['cache-control'], 'no-store');
  assert.deepEqual(response.body.translations.de, ['Hallo']);
  assert.equal(calls[0].url, 'https://api.github.com/repos/ministry/website');
  assert.equal(calls[0].options.headers.Authorization, 'Bearer test-editor-token');
  assert(!JSON.stringify(response).includes(key)); assert(!JSON.stringify(response).includes('test-editor-token'));
});
test('wrong origins, hosts, missing auth and read-only accounts cannot spend translation quota', async () => {
  for (const headers of [{ origin: 'https://other.example' }, { host: 'other.example' }, { authorization: '' }]) {
    const calls = []; const handler = createTranslationHandler({ env, fetch: authorizedFetch(calls), authorize: (req, fetch) => authorizeGithub(req, fetch, config) });
    const response = await call(handler, { headers });
    assert([401, 403].includes(response.status)); assert.equal(calls.length, 0);
  }
  let calls = 0;
  const handler = createTranslationHandler({ env, fetch: async () => { calls++; return Response.json({ full_name: config.repo, permissions: { push: false } }); }, authorize: (req, fetch) => authorizeGithub(req, fetch, config) });
  assert.equal((await call(handler)).status, 403); assert.equal(calls, 1);
});
test('a different repository response is rejected even when it reports write permission', async () => {
  const handler = createTranslationHandler({ env, fetch: async () => Response.json({ full_name: 'other/website', permissions: { push: true } }), authorize: (req, fetch) => authorizeGithub(req, fetch, config) });
  assert.equal((await call(handler)).status, 403);
});
test('HTTP method, content type and body size are enforced', async () => {
  const handler = createTranslationHandler({ env, fetch: authorizedFetch(), authorize: async () => 'editor' });
  const get = await call(handler, { method: 'GET' }); assert.equal(get.status, 405); assert.equal(get.headers.allow, 'POST');
  assert.equal((await call(handler, { headers: { 'content-type': 'text/plain' } })).status, 415);
  assert.equal((await call(handler, { headers: { 'content-length': '180001' } })).status, 413);
  assert.equal((await call(handler, { body: '{broken' })).status, 400);
});
