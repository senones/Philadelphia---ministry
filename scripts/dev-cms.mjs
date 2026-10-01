import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const children = new Set();
let stopping = false;

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  process.exitCode = code;
  for (const child of children) child.kill('SIGTERM');
  const forceStop = setTimeout(() => {
    for (const child of children) child.kill('SIGKILL');
  }, 2000);
  forceStop.unref();
}

function start(args, cwd, env) {
  const child = spawn(process.execPath, args, { cwd, env: { ...process.env, ...env }, stdio: 'inherit' });
  children.add(child);
  child.on('error', () => {
    console.error('Der lokale Server konnte nicht gestartet werden. Bitte npm ci ausführen und erneut starten.');
    stop(1);
  });
  child.on('exit', code => {
    children.delete(child);
    if (!stopping) {
      console.error('Ein lokaler Server wurde beendet. Website und Editor werden gemeinsam gestoppt.');
      stop(code || 1);
    }
  });
}

function port(name, fallback) {
  const value = process.env[name] || String(fallback);
  if (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 65535) {
    throw new Error(`${name} muss eine Portnummer zwischen 1 und 65535 enthalten.`);
  }
  return Number(value);
}

function checkPort(value) {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.once('error', error => reject(new Error(error.code === 'EADDRINUSE'
      ? `Port ${value} ist bereits belegt. Beende die bisherige lokale Vorschau in ihrem Terminal mit Ctrl+C und starte danach erneut.`
      : `Port ${value} ist nicht verfügbar (${error.code}).`)));
    probe.listen(value, '127.0.0.1', () => probe.close(resolve));
  });
}

async function waitFor(url, options, ready) {
  const deadline = Date.now() + 30000;
  while (!stopping && Date.now() < deadline) {
    try {
      const response = await fetch(url, { ...options, signal: AbortSignal.timeout(1000) });
      if (response.ok && ready(await response.json())) return;
    } catch { /* Retry while the server starts. */ }
    await delay(200);
  }
  if (!stopping) throw new Error('Der lokale Editor ist nicht rechtzeitig gestartet. Prüfe die Servermeldung oben und versuche npm ci und anschließend npm run dev:cms.');
}

async function main() {
  if (!existsSync(`${root}apps/web/package.json`)) {
    throw new Error('Dieser Ordner enthält nur die Korrektur oder ein unvollständiges Projekt. Öffne den vollständigen Website-Ordner mit apps/web/package.json und package-lock.json.');
  }
  if (!existsSync(`${root}package-lock.json`)) {
    throw new Error('package-lock.json fehlt. Verwende den vollständigen Website-Ordner aus dem Komplettpaket, damit npm ci die passenden Pakete installieren kann.');
  }
  const [major, minor] = process.versions.node.split('.').map(Number);
  if (major < 22 || (major === 22 && minor < 12)) {
    throw new Error(`Node.js 22.12 oder neuer wird benötigt. Installiert ist ${process.versions.node}.`);
  }
  const proxyScript = `${root}node_modules/decap-server/dist/index.js`;
  const viteScript = `${root}node_modules/vite/bin/vite.js`;
  if (!existsSync(proxyScript) || !existsSync(viteScript)) {
    throw new Error('Die benötigten Pakete fehlen. Führe im Website-Ordner zuerst npm ci und danach npm run dev:cms aus.');
  }
  const schema = spawnSync(process.execPath, ['scripts/generate-cms-schema.mjs'], { cwd: root, stdio: 'inherit' });
  if (schema.status !== 0) throw new Error('Die Editor-Konfiguration konnte nicht aus den Inhaltsdateien erzeugt werden.');
  const proxyPort = port('CMS_PROXY_PORT', 8081);
  const devPort = port('CMS_DEV_PORT', 5173);
  if (proxyPort === devPort) throw new Error('Website und Editor-Dienst benötigen unterschiedliche Ports.');
  await Promise.all([checkPort(proxyPort), checkPort(devPort)]);
  if (stopping) return;
  console.log('Philadelphia: Website und lokalen Editor starten …');
  start([proxyScript], root, {
    BIND_HOST: '127.0.0.1', PORT: String(proxyPort), LOG_LEVEL: 'warn', MODE: 'fs',
  });
  await waitFor(`http://127.0.0.1:${proxyPort}/api/v1`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'info', params: {} }),
  }, result => result.type === 'local_fs');
  if (stopping) return;
  start([viteScript, '--config', 'vite.standalone.config.js', '--host', '127.0.0.1', '--port', String(devPort), '--strictPort'], `${root}apps/web`, {
    CMS_LOCAL: 'true', CMS_PROXY_PORT: String(proxyPort),
  });
  const origin = `http://127.0.0.1:${devPort}`;
  await waitFor(`${origin}/api/cms-config`, {}, result => result.enabled === true && Boolean(result.config?.local_backend));
  if (stopping) return;
  console.log(`\nWebsite: ${origin}/\nSeiten bearbeiten: ${origin}/admin/\n\nDieses Terminal offen lassen. Mit Ctrl+C Website und Editor beenden.\n`);
  if (process.argv.includes('--open')) {
    const command = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'explorer.exe' : 'xdg-open';
    const browser = spawn(command, [`${origin}/admin/`], { stdio: 'ignore' });
    browser.on('error', () => console.log(`Bitte den Editor im Browser öffnen: ${origin}/admin/`));
  }
}

process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
main().catch(error => {
  if (!stopping) {
    console.error(`\nEditor konnte nicht gestartet werden: ${error.message}\n`);
    stop(1);
  }
});
