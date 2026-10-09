import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile, truncate, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import { buildContent } from '../apps/web/src/ministry/content-model.js';

const project = fileURLToPath(new URL('../', import.meta.url));
const base = 'apps/web/src/ministry/content';
const moduleObject = { exports: {} };
vm.runInNewContext(await readFile(path.join(project, 'apps/web/public/admin/sync.js'), 'utf8'), { module: moduleObject, AbortSignal, crypto: webcrypto });
const sync = moduleObject.exports;
const clone = value => JSON.parse(JSON.stringify(value));
const video = (fields = {}) => ({ id: 'video-example-1234', name: 'Bericht', section: 'welcome', src: '/videos/report.mp4', poster: '', caption: {}, ...fields });
const localized = (plan, locale) => Object.fromEntries(sync.locales.filter(item => item !== locale).map(target => [target, plan.texts.map(text => `${target}: ${text}`)]));

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'philadelphia-videos-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const folder of [`${base}/pages`, `${base}/ui`, `${base}/galleries`, `${base}/videos`, 'scripts', 'apps/web/public/admin', 'apps/web/public/videos', 'apps/web/public/documents']) await mkdir(path.join(root, folder), { recursive: true });
  for (const name of ['validate-content.mjs', 'generate-cms-schema.mjs']) await cp(path.join(project, 'scripts', name), path.join(root, 'scripts', name));
  const write = async (name, data) => writeFile(path.join(root, base, name), `${JSON.stringify(data, null, 2)}\n`);
  const read = async name => JSON.parse(await readFile(path.join(root, base, name), 'utf8'));
  await write('structure.json', { languages: sync.locales.map(code => ({ code })), mainPageCount: 1, pages: [{ id: 'home', path: '/', sections: [{ id: 'welcome' }] }] });
  await write('site.json', { name: 'Philadelphia', address: ['Athen'], mapsUrl: 'https://example.org/maps' });
  await write('assets.json', { logo: '', missionLetter: '' });
  for (const locale of sync.locales) {
    await write(`ui/${locale}.json`, { menu: 'Menü' });
    await write(`pages/home.${locale}.json`, { title: 'Startseite', heading: 'Willkommen', intro: 'Einleitung', sections: { welcome: { title: 'Willkommen', body: 'Text', pending: false } }, extraSections: [{ id: 'extra-example-1234', after: 'welcome', title: 'Neu', body: 'Text', pending: false, images: [] }] });
  }
  await write('galleries/home.json', { sections: { welcome: { position: 'after', layout: 'grid', images: [] } } });
  await write('documents.json', Object.fromEntries(['maluk', 'sunday', 'camp'].map(name => [name, { type: 'pdf', url: `/documents/${name}.pdf`, pages: 1, sourceUrl: 'https://example.org/document.pdf' }])));
  for (const name of ['maluk', 'sunday', 'camp']) await writeFile(path.join(root, `apps/web/public/documents/${name}.pdf`), 'fixture');
  await writeFile(path.join(root, 'apps/web/public/videos/report.mp4'), 'fixture');
  await write('videos/home.json', { syncTranslations: true, videos: [video()] });
  const run = (script = 'validate-content.mjs') => spawnSync(process.execPath, [path.join(root, 'scripts', script)], { encoding: 'utf8' });
  return { root, read, write, run };
}

test('video captions translate from Greek while the file and manual translations stay intact', () => {
  const before = { videos: [video({ caption: { de: 'Alt', en: 'Old', el: 'Παλιό', ar: 'قديم' } })] };
  const source = clone(before); source.videos[0].caption.el = 'Νέο βίντεο';
  const plan = sync.videoPlan({ before, source });
  sync.applyTranslations(plan, localized(plan, 'el'));
  assert.equal(plan.document.videos[0].caption.de, 'de: Νέο βίντεο');
  assert.equal(plan.document.videos[0].src, '/videos/report.mp4');
  source.videos[0].caption.de = 'Eigene deutsche Fassung';
  assert.equal(sync.videoPlan({ before, source }).texts.length, 0);
  assert.equal(sync.videoPlan({ before, source, automatic: false }).texts.length, 0);
});

test('reordering, replacing and removing videos preserves unchanged captions by ID', () => {
  const before = { videos: [video({ caption: { de: 'Erster Film', el: 'Χειροκίνητο' } }), video({ id: 'video-second-1234', src: '/videos/second.mp4', caption: { de: 'Zweiter Film' } })] };
  const source = clone(before); source.videos.reverse(); source.videos[1].src = '/videos/replacement.mp4';
  const plan = sync.videoPlan({ before, source });
  assert.equal(plan.texts.length, 0);
  assert.equal(plan.document.videos[1].caption.el, 'Χειροκίνητο');
  assert.equal(plan.document.videos[1].src, '/videos/replacement.mp4');
  source.videos = [];
  assert.equal(sync.videoPlan({ before, source }).document.videos.length, 0);
});

test('clearing a caption clears the other languages without a translation request', () => {
  const before = { videos: [video({ caption: { de: 'Text', en: 'Text', el: 'Κείμενο', ar: 'نص' } })] };
  const source = clone(before); source.videos[0].caption.de = '';
  const plan = sync.videoPlan({ before, source });
  assert.equal(plan.texts.length, 0);
  assert.equal(plan.document.videos[0].caption.ar, '');
});

test('unsafe paths, wrong formats and duplicate video IDs are rejected before saving', () => {
  for (const src of ['/videos/../../secret.mp4', '/videos/file.mov', 'https://example.org/movie.mp4', '/videos/film.mp4?x=1']) assert.throws(() => sync.videoPlan({ before: { videos: [] }, source: { videos: [video({ src })] } }), /MP4/);
  assert.throws(() => sync.videoPlan({ before: { videos: [] }, source: { videos: [video(), video()] } }), /eindeutige ID/);
});

test('saving video captions uses one commit with the original uploaded assets and catches concurrent edits', async () => {
  const filename = `${base}/videos/home.json`;
  let saved = { videos: [] }, calls = 0;
  const backend = { getEntry: async () => ({ file: { path: filename }, data: JSON.stringify(saved) }), getToken: async () => 'test-token', persistEntry: async entry => { calls++; assert.equal(entry.assets, assets); assert.equal(entry.dataFiles.length, 1); saved = JSON.parse(entry.dataFiles[0].raw); return { saved: true }; } };
  const assets = [{ path: 'apps/web/public/videos/report.mp4', fileObj: {} }];
  sync.wrapBackend(backend, { request: async ({ plan, locale }) => localized(plan, locale) });
  await backend.getEntry(filename);
  await backend.persistEntry({ dataFiles: [{ path: filename, raw: JSON.stringify({ videos: [video({ caption: { de: 'Film in Athen' } })], syncTranslations: true }) }], assets }, { useWorkflow: false });
  assert.equal(calls, 1); assert.equal(saved.videos[0].caption.ar, 'ar: Film in Athen');
  await backend.getEntry(filename); saved.videos[0].name = 'Zwischenzeitlich geändert';
  await assert.rejects(backend.persistEntry({ dataFiles: [{ path: filename, raw: JSON.stringify({ videos: [], syncTranslations: false }) }], assets }, { useWorkflow: false }), /inzwischen geändert/);
  assert.equal(calls, 1);
});

test('the content model attaches shared videos to fixed and new sections in all four languages', () => {
  const structure = { languages: sync.locales.map(code => ({ code })), mainPageCount: 1, pages: [{ id: 'home', sections: [{ id: 'welcome' }] }] };
  const translations = Object.fromEntries(sync.locales.map(locale => [`home.${locale}`, { title: locale, heading: locale, intro: locale, sections: { welcome: { title: locale, body: locale, pending: false } }, extraSections: [{ id: 'extra-example-1234', after: 'welcome', title: locale, body: locale, pending: false }] }]));
  const content = buildContent({ structure, translations, labels: Object.fromEntries(sync.locales.map(locale => [locale, { menu: locale }])), settings: {}, media: {}, documentData: { letter: {} }, videoData: { home: { videos: [video({ caption: { de: 'Beschreibung', el: 'Περιγραφή' } }), video({ id: 'video-second-1234', section: 'extra-example-1234' }), video({ id: 'video-orphan-1234', section: 'removed' })] } } });
  assert.equal(content.pages[0].sections[0].videos.length, 1);
  assert.equal(content.pages[0].sections[0].videos[0].caption.el, 'Περιγραφή');
  assert.equal(content.pages[0].sections[1].videos[0].id, 'video-second-1234');
  assert.equal(content.pages[0].sections.flatMap(section => section.videos).length, 2);
});

test('the CMS offers MP4 uploads with a size limit and includes newly created section choices', async t => {
  const f = await fixture(t);
  const result = f.run('generate-cms-schema.mjs'); assert.equal(result.status, 0, result.stderr);
  const schema = JSON.parse(await readFile(path.join(f.root, 'apps/web/public/admin/collections.json'), 'utf8'));
  const fields = schema.collections.find(item => item.name === 'videos').files[0].fields.find(item => item.name === 'videos').fields;
  const file = fields.find(item => item.name === 'src');
  assert.equal(file.media_folder, '/apps/web/public/videos'); assert.equal(file.public_folder, '/videos');
  assert.equal(file.media_library.config.max_file_size, 50 * 1024 * 1024);
  assert(new RegExp(file.pattern[0]).test('example.MP4'));
  assert(!new RegExp(file.pattern[0]).test('example.mov'));
  assert.equal(file.media_library.allow_multiple, false);
  assert(fields.find(item => item.name === 'section').options.some(item => item.value === 'extra-example-1234'));
});

test('deleting a referenced video or its section does not block saved text changes', async t => {
  const f = await fixture(t);
  await unlink(path.join(f.root, 'apps/web/public/videos/report.mp4'));
  await f.write('videos/home.json', { videos: [video({ section: 'extra-removed-1234' })] });
  const page = await f.read('pages/home.de.json'); page.heading = 'Ein neuer Text'; await f.write('pages/home.de.json', page);
  const result = f.run(); assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /Videodatei fehlt/); assert.match(result.stderr, /entfernten Abschnitt/);
});

test('wrong video paths and files exceeding the configured upload size fail validation', async t => {
  const f = await fixture(t);
  await f.write('videos/home.json', { videos: [video({ src: '/videos/../../secret.mp4' })] });
  assert.match(f.run().stderr, /Ungültiger Dateipfad/);
  await f.write('videos/home.json', { videos: [video()] });
  await truncate(path.join(f.root, 'apps/web/public/videos/report.mp4'), 50 * 1024 * 1024 + 1);
  assert.match(f.run().stderr, /größer als 50 MiB/);
});

