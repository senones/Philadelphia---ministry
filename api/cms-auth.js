const { getConfig, matchesHost, json, issueState } = require('../lib/cms.cjs');
module.exports = (req, res) => {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return json(res, 405, { error: 'Method not allowed' }); }
  const config = getConfig();
  if (!config) return json(res, 503, { error: 'Der Bearbeitungsbereich ist noch nicht freigeschaltet.' });
  if (!matchesHost(req, config)) return json(res, 403, { error: 'Bitte die veröffentlichte Website verwenden.' });
  const request = new URL(req.url, config.origin);
  if (request.searchParams.get('provider') && request.searchParams.get('provider') !== 'github') return json(res, 400, { error: 'Invalid provider' });
  const state = issueState(config);
  const target = new URL('https://github.com/login/oauth/authorize');
  for (const [key, value] of Object.entries({ client_id: config.clientId, redirect_uri: config.callback, scope: config.scope, state: state.state, code_challenge: state.challenge, code_challenge_method: 'S256', prompt: 'select_account' })) target.searchParams.set(key, value);
  res.statusCode = 302;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Set-Cookie', state.cookie);
  res.setHeader('Location', target.href);
  res.end();
};
