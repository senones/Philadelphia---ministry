import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const project = fileURLToPath(new URL('../', import.meta.url));
const contentPath = 'apps/web/src/ministry/content';

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'philadelphia-publishing-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, contentPath, 'pages'), { recursive: true });
  await mkdir(path.join(root, contentPath, 'ui'));
  await mkdir(path.join(root, contentPath, 'galleries'));
  await mkdir(path.join(root, 'scripts'));
  await mkdir(path.join(root, 'apps/web/public/admin'), { recursive: true });
  for (const name of ['validate-content.mjs', 'generate-cms-schema.mjs']) {
    await cp(path.join(project, 'scripts', name), path.join(root, 'scripts', name));
  }
  const read = async name => JSON.parse(await readFile(path.join(root, contentPath, name), 'utf8'));
  const write = async (name, data) => writeFile(path.join(root, contentPath, name), `${JSON.stringify(data, null, 2)}\n`);
  const locales = ['de', 'en', 'el', 'ar'];
  await write('structure.json', { languages: locales.map(code => ({ code })), mainPageCount: 1,
    pages: [{ id: 'home', path: '/', sections: [{ id: 'welcome' }] }] });
  await write('site.json', { name: 'Philadelphia', address: ['Musterstraße 1'], mapsUrl: 'https://example.org/maps' });
  for (const locale of locales) {
    await write(`ui/${locale}.json`, { menu: 'Menü', syncTranslations: true });
    await write(`pages/home.${locale}.json`, { title: 'Startseite', heading: 'Willkommen', intro: 'Einleitung',
      sections: { welcome: { title: 'Über uns', body: 'Unser Text', pending: false } }, extraSections: [] });
  }
  await write('galleries/home.json', { sections: { welcome: { position: 'after', layout: 'grid', images: [] } } });
  const assets = { logo: '/media/logo.png', hero: '/media/hero.jpg', missionLetter: '/media/missionsbrief.jpg' };
  const documents = Object.fromEntries(['maluk', 'sunday', 'camp'].map(key => [key, {
    type: 'pdf', pages: 2, url: `/documents/${key}.pdf`, preview: `/document-previews/${key}.png`, sourceUrl: 'https://example.org/document.pdf',
  }]));
  documents.letter = { type: 'image', url: assets.missionLetter, preview: assets.missionLetter };
  await write('assets.json', assets);
  await write('documents.json', documents);
  for (const src of new Set([...Object.values(assets), ...Object.values(documents).flatMap(item => [item.url, item.preview])])) {
    if (typeof src !== 'string' || !src) continue;
    const file = path.join(root, 'apps/web/public', src);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, 'fixture');
  }
  const run = (name = 'validate-content.mjs') => spawnSync(process.execPath, [path.join(root, 'scripts', name)], { encoding: 'utf8' });
  return { root, read, write, run, assets, documents };
}

test('deleting a referenced image does not block a saved home-page text', async t => {
  const f = await fixture(t);
  const page = await f.read('pages/home.de.json');
  page.heading = 'Dieser neue Text muss veröffentlicht werden';
  await f.write('pages/home.de.json', page);
  await unlink(path.join(f.root, 'apps/web/public', f.assets.missionLetter));
  const result = f.run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /Bild fehlt.*\/media\/missionsbrief\.jpg/);
  assert.equal((await f.read('pages/home.de.json')).heading, page.heading);
});

test('fixed images and PDF thumbnails can be cleared in the CMS', async t => {
  const f = await fixture(t);
  f.assets.hero = '';
  f.assets.missionLetter = null;
  delete f.assets.logo;
  f.documents.maluk.preview = '';
  f.documents.sunday.preview = null;
  delete f.documents.camp.preview;
  await f.write('assets.json', f.assets);
  await f.write('documents.json', f.documents);
  const result = f.run();
  assert.equal(result.status, 0, result.stderr);
  const generated = f.run('generate-cms-schema.mjs');
  assert.equal(generated.status, 0, generated.stderr);
  const schema = JSON.parse(await readFile(path.join(f.root, 'apps/web/public/admin/collections.json'), 'utf8'));
  assert(schema.collections.find(item => item.name === 'images').files[0].fields.every(field => field.required === false));
  const pdfs = schema.collections.find(item => item.name === 'documents').files[0].fields;
  for (const pdf of pdfs.filter(field => field.widget === 'object')) {
    assert.equal(pdf.fields.find(field => field.name === 'preview').required, false);
    assert.notEqual(pdf.fields.find(field => field.name === 'url').required, false);
  }
});

test('deleted gallery images, section images and PDF thumbnails do not block publishing', async t => {
  const f = await fixture(t);
  const gallery = await f.read('galleries/home.json');
  Object.values(gallery.sections)[0].images = [{ name: 'Gelöschtes Foto', src: '/media/deleted-gallery.jpg', caption: { de: 'Bildtext' } }];
  await f.write('galleries/home.json', gallery);
  for (const locale of ['de', 'en', 'el', 'ar']) {
    const page = await f.read(`pages/home.${locale}.json`);
    page.extraSections = [{ id: 'extra-publishing-1234', after: '', title: 'Neuer Abschnitt', body: 'Neuer Inhalt', pending: false,
      images: [{ id: 'image-publishing-1234', src: '/media/deleted-section.jpg', caption: 'Bildtext', alt: '' }] }];
    await f.write(`pages/home.${locale}.json`, page);
  }
  await unlink(path.join(f.root, 'apps/web/public', f.documents.maluk.preview));
  const result = f.run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /deleted-gallery\.jpg/);
  assert.match(result.stderr, /deleted-section\.jpg/);
  assert.match(result.stderr, /Vorschau|document-previews/);
  assert.equal((result.stderr.match(/deleted-section\.jpg/g) ?? []).length, 1, 'one warning per missing image');
});

test('image paths cannot escape the public media directory', async t => {
  const f = await fixture(t);
  f.assets.hero = '/media/../../secret.jpg';
  await f.write('assets.json', f.assets);
  const result = f.run();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Ungültiger Dateipfad/);
});

test('unsupported image formats still fail validation', async t => {
  const f = await fixture(t);
  f.assets.hero = '/media/executable.js';
  await f.write('assets.json', f.assets);
  const result = f.run();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Dateiformat nicht unterstützt/);
});

test('malformed image data is not mistaken for an empty optional field', async t => {
  const f = await fixture(t);
  f.assets.hero = { src: '/media/test.jpg' };
  await f.write('assets.json', f.assets);
  const result = f.run();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Text fehlt/);
});

test('missing required page text still fails validation', async t => {
  const f = await fixture(t);
  const page = await f.read('pages/home.de.json');
  page.heading = '';
  await f.write('pages/home.de.json', page);
  const result = f.run();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /heading: Text ist leer/);
});

test('missing linked PDF documents still fail validation', async t => {
  const f = await fixture(t);
  await unlink(path.join(f.root, 'apps/web/public', f.documents.maluk.url));
  const result = f.run();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /ENOENT/);
});
