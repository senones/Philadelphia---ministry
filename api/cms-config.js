const { getConfig, matchesHost, publicConfig, json } = require('../lib/cms.cjs');
const { translationStatus } = require('../lib/cms-translation.cjs');
module.exports = (req, res) => {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return json(res, 405, { error: 'Method not allowed' }); }
  const config = getConfig();
  if (!config || !matchesHost(req, config)) return json(res, 200, { enabled: false });
  return json(res, 200, { enabled: true, config: publicConfig(config), translation: translationStatus() });
};
