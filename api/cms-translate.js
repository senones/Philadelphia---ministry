const { getConfig } = require('../lib/cms.cjs');
const { createTranslationHandler, authorizeGithub } = require('../lib/cms-translation.cjs');

module.exports = createTranslationHandler({
  authorize: (req, request) => authorizeGithub(req, request, getConfig()),
});
