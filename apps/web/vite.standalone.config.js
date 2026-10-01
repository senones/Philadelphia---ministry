import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const translation = createRequire(import.meta.url)('../../lib/cms-translation.cjs');
const { translationStatus, createTranslationHandler, TranslationError } = translation;

function localCmsConfig() {
 let serverEnv;
 return {
  name: 'local-cms-config',
  configResolved(config) {
   serverEnv = { ...loadEnv(config.mode, fileURLToPath(new URL('../../', import.meta.url)), ''), ...process.env };
  },
  configureServer(server) {
   const local = request => process.env.CMS_LOCAL === 'true' && /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(request.headers.host || '');
   const translate = createTranslationHandler({ env: serverEnv, authorize: async request => {
    if (!local(request) || request.headers.origin !== `http://${request.headers.host}`) throw new TranslationError(403, 'Diese Anfrage stammt nicht vom lokalen Bearbeitungsbereich.');
    return 'local-editor';
   } });
   server.middlewares.use((request, response, next) => {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/admin' || url.pathname === '/admin/') request.url = `/admin/index.html${url.search}`;
    next();
   });
   server.middlewares.use('/api/cms-config', (request, response) => {
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('Cache-Control', 'no-store');
    if (request.method !== 'GET') { response.statusCode = 405; response.end('{}'); return; }
    if (!local(request)) { response.end(JSON.stringify({ enabled: false })); return; }
    const schema = JSON.parse(readFileSync(new URL('./public/admin/collections.json', import.meta.url), 'utf8'));
    const origin = `http://${request.headers.host}`;
    response.end(JSON.stringify({ enabled: true, translation: translationStatus(serverEnv), config: {
     ...schema, site_url: origin, display_url: origin,
     backend: { name: 'github', repo: 'local/philadelphia', branch: 'main' },
     local_backend: { url: `http://127.0.0.1:${process.env.CMS_PROXY_PORT || '8081'}/api/v1`, allowed_hosts: ['localhost', '127.0.0.1'] },
    } }));
   });
   server.middlewares.use('/api/cms-translate', translate);
  },
 };
}
export default defineConfig({
 plugins: [react(), localCmsConfig()],
 resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
 build: { outDir: '../../dist/static', emptyOutDir: true },
});
