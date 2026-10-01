const { getConfig, matchesHost, json, readState, clearState, popup } = require('../lib/cms.cjs');
module.exports = async (req, res) => {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return json(res, 405, { error: 'Method not allowed' }); }
  const config = getConfig();
  if (!config) return json(res, 503, { error: 'Der Bearbeitungsbereich ist noch nicht freigeschaltet.' });
  if (!matchesHost(req, config)) return json(res, 403, { error: 'Invalid host' });
  const request = new URL(req.url, config.origin);
  const state = readState(req, config, request.searchParams.get('state'));
  clearState(res);
  if (!state) return popup(res, config, 403, { error: 'Die Anmeldung ist abgelaufen oder ungültig.' });
  if (request.searchParams.has('error')) return popup(res, config, 400, { error: 'Die Anmeldung wurde abgebrochen.' });
  const code = request.searchParams.get('code');
  if (!code || code.length > 1024) return popup(res, config, 400, { error: 'Der Anmeldecode fehlt.' });
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: config.clientId, client_secret: config.secret, code, redirect_uri: config.callback, code_verifier: state.verifier }),
      signal: AbortSignal.timeout(10000),
    });
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || tokenData.error || typeof tokenData.access_token !== 'string' || !tokenData.access_token || tokenData.token_type !== 'bearer') return popup(res, config, 502, { error: 'GitHub hat die Anmeldung nicht bestätigt.' });
    const headers = { Authorization: `Bearer ${tokenData.access_token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'Philadelphia-CMS' };
    const userResponse = await fetch('https://api.github.com/user', { headers, signal: AbortSignal.timeout(10000) });
    const user = await userResponse.json();
    if (!userResponse.ok || !user.login) return popup(res, config, 502, { error: 'Das GitHub-Konto konnte nicht geprüft werden.' });
    const repoResponse = await fetch(`https://api.github.com/repos/${config.repo}`, { headers, signal: AbortSignal.timeout(10000) });
    const repo = await repoResponse.json();
    if (!repoResponse.ok || repo.full_name?.toLowerCase() !== config.repo.toLowerCase() || repo.permissions?.push !== true) return popup(res, config, 403, { error: 'Für dieses Website-Projekt fehlt das Schreibrecht.' });
    return popup(res, config, 200, { token: tokenData.access_token, provider: 'github' });
  } catch { return popup(res, config, 502, { error: 'GitHub ist momentan nicht erreichbar.' }); }
};
