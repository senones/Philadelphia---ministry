import { readFile, writeFile, copyFile, mkdir, readdir, access, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const source = fileURLToPath(new URL('../', import.meta.url));
const files = [
  'package.json', 'package-lock.json', 'vercel.json', '.env.example',
  'CMS-STARTEN.command', 'AKTUALISIEREN.command', 'START-HIER.md', 'AKTUALISIERUNG.md', 'EDITOR-EINRICHTEN.md', 'UEBERSETZUNG-EINRICHTEN.md',
  'scripts/dev-cms.mjs', 'scripts/generate-cms-schema.mjs', 'scripts/validate-content.mjs', 'scripts/update-project.mjs',
  'api/cms-config.js', 'api/cms-auth.js', 'api/cms-callback.js', 'api/cms-translate.js', 'lib/cms.cjs', 'lib/cms-translation.cjs',
  'apps/web/vite.standalone.config.js', 'apps/web/src/ministry/Header.jsx', 'apps/web/src/ministry/MinistryPage.jsx',
  'apps/web/src/ministry/content-model.js', 'apps/web/src/ministry/ministry.css',
  'apps/web/public/admin/index.html', 'apps/web/public/admin/editor.js', 'apps/web/public/admin/editor.css',
  'apps/web/public/admin/preview.css', 'apps/web/public/admin/sync.js', 'apps/web/public/admin/uebersetzung.html',
  'tests/cms-auth.test.cjs', 'tests/contact.test.cjs', 'tests/cms-sync.test.cjs', 'tests/cms-translation.test.cjs', 'tests/content-model.test.mjs',
];
const exists = async filename => { try { await access(filename); return true; } catch { return false; } };
async function vendorFiles(directory = 'apps/web/public/admin/vendor') {
  const found = [];
  for (const entry of await readdir(path.join(source, directory), { withFileTypes: true })) {
    const relative = `${directory}/${entry.name}`;
    if (entry.isDirectory()) found.push(...await vendorFiles(relative));
    else if (entry.isFile()) found.push(relative);
  }
  return found;
}
async function main() {
  let input = process.argv[2];
  if (!input) {
    const readline = createInterface({ input: stdin, output: stdout });
    input = await readline.question('Bestehenden vollständigen Website-Ordner hierher ziehen und Enter drücken: ');
    readline.close();
  }
  if (!input?.trim()) throw new Error('Kein Ordner angegeben. Es wurde nichts geändert.');
  // Finder drag-and-drop may shell-escape spaces. This is a path, never a shell command.
  input = input.trim().replace(/^(['"])(.*)\1$/, '$2').replace(/\\([ ()'"&])/g, '$1');
  const target = path.resolve(input);
  if (target === path.resolve(source)) { console.log('Dieser Ordner enthält bereits die neue Version. Mit npm ci und npm run dev:cms starten.'); return; }
  for (const required of ['package.json', 'package-lock.json', 'apps/web/package.json', 'apps/web/src/ministry/content/structure.json']) {
    if (!await exists(path.join(target, required))) throw new Error(`Im gewählten Ordner fehlt ${required}. Bitte den vollständigen bisherigen Website-Ordner wählen.`);
  }
  const list = [...files, ...await vendorFiles()];
  for (const filename of list) if (!await exists(path.join(source, filename))) throw new Error(`Das neue Paket ist unvollständig: ${filename} fehlt.`);
  const backup = path.join(target, `philadelphia-code-backup-${new Date().toISOString().replace(/[:.]/g, '-')}`);
  await mkdir(backup);
  const changed = [], created = [];
  const schema = 'apps/web/public/admin/collections.json';
  const saveBackup = async filename => {
    const existing = path.join(target, filename);
    if (await exists(existing)) { await mkdir(path.dirname(path.join(backup, filename)), { recursive: true }); await copyFile(existing, path.join(backup, filename)); changed.push(filename); }
    else created.push(filename);
  };
  try {
    await saveBackup(schema);
    const ignored = path.join(target, '.gitignore');
    const rules = await exists(ignored) ? await readFile(ignored, 'utf8') : '';
    if (!rules.split(/\r?\n/).includes('philadelphia-code-backup-*/')) {
      await saveBackup('.gitignore');
      await writeFile(ignored, `${rules}${rules.endsWith('\n') || !rules ? '' : '\n'}philadelphia-code-backup-*/\n`);
    }
    for (const filename of list) {
      const destination = path.join(target, filename), original = path.join(source, filename);
      if (await exists(destination) && (await readFile(destination)).equals(await readFile(original))) continue;
      await saveBackup(filename);
      await mkdir(path.dirname(destination), { recursive: true });
      await copyFile(original, destination);
    }
    const generated = spawnSync(process.execPath, ['scripts/generate-cms-schema.mjs'], { cwd: target, stdio: 'inherit' });
    if (generated.status !== 0) throw new Error('Die Editor-Konfiguration konnte aus den vorhandenen Inhalten nicht erzeugt werden.');
    await writeFile(path.join(backup, 'WIEDERHERSTELLEN.json'), `${JSON.stringify({ replaced: changed, added: created }, null, 2)}\n`);
    await writeFile(path.join(backup, 'README.md'), 'Sicherung der ersetzten Programmdateien. Die ursprünglichen Pfade sind erhalten. Zum Zurücksetzen diese Dateien in den Website-Ordner zurückkopieren; WIEDERHERSTELLEN.json nennt zusätzlich neu angelegte Dateien. Seiteninhalte, Fotos, .env und .vercel wurden nicht verändert.\n');
    console.log(`\nAktualisierung abgeschlossen. Eigene Texte, Fotos und Zugangsdaten sind erhalten.\nSicherung der vorherigen Programmdateien: ${backup}\n\nIm bisherigen Website-Ordner starten:\nnpm ci\nnpm run dev:cms\n\nFür automatische Übersetzungen UEBERSETZUNG-EINRICHTEN.md lesen.\n`);
  } catch (error) {
    for (const filename of changed) await copyFile(path.join(backup, filename), path.join(target, filename));
    for (const filename of created) await rm(path.join(target, filename), { force: true });
    throw new Error(`Die Aktualisierung wurde zurückgesetzt: ${error.message}`);
  }
}
main().catch(error => { console.error(`\n${error.message}\n`); process.exitCode = 1; });
