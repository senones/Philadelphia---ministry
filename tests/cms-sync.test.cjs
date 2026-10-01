const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const moduleObject = { exports: {} };
vm.runInNewContext(fs.readFileSync(require.resolve('../apps/web/public/admin/sync.js'), 'utf8'), { module: moduleObject, AbortSignal, crypto: require('node:crypto').webcrypto });
const sync = moduleObject.exports;
const clone = value => JSON.parse(JSON.stringify(value));
const normalize = value => JSON.parse(JSON.stringify(value));
const pagePath = locale => `apps/web/src/ministry/content/pages/about.${locale}.json`;
function documents() {
  return Object.fromEntries(sync.locales.map(locale => [locale, {
    title: `${locale} Menü`, heading: `${locale} Überschrift`, intro: `${locale} Einleitung`,
    sections: { geschichte: { title: `${locale} Geschichte`, body: `${locale} Geschichte-Text`, pending: false }, vision: { title: `${locale} Vision`, body: `${locale} Vision-Text`, pending: false } },
  }]));
}
function extra(id, title, after = 'geschichte') {
  return { id: `extra-${id}`, title, body: `Text: ${title}`, after, pending: false, images: [] };
}
function translated(plan, locale = 'de') {
  return Object.fromEntries(sync.locales.filter(target => target !== locale).map(target => [target, plan.texts.map(text => `${target}: ${text}`)]));
}
function mockBackend(docs = documents()) {
  const files = new Map(sync.locales.map(locale => [pagePath(locale), clone(docs[locale])]));
  const calls = [];
  const backend = {
    getEntry: async path => ({ file: { path }, data: JSON.stringify(files.get(path)) }),
    entriesByFiles: async paths => Promise.all(paths.map(file => backend.getEntry(file.path))),
    getToken: async () => 'test-editor-token',
    persistEntry: async (entry, options) => { calls.push({ entry, options }); for (const file of entry.dataFiles) files.set(file.path, JSON.parse(file.raw)); return { saved: true }; },
  };
  return { backend, files, calls };
}
test('German changes update only changed fields; existing manual translations survive', () => {
  const docs = documents(), before = clone(docs.de), source = clone(before);
  source.heading = 'Wir helfen gemeinsam';
  docs.el.sections.vision.body = 'Manuell korrigierte griechische Vision';
  const plan = sync.pagePlan({ locale: 'de', before, source, translations: docs });
  assert.deepEqual(normalize(plan.texts), [source.heading]);
  sync.applyTranslations(plan, translated(plan));
  assert.equal(plan.documents.de.heading, source.heading);
  for (const target of ['en', 'el', 'ar']) assert.equal(plan.documents[target].heading, `${target}: ${source.heading}`);
  assert.equal(plan.documents.el.sections.vision.body, docs.el.sections.vision.body);
  assert.equal(plan.documents.en.intro, docs.en.intro);
});
test('Greek is also a source language and updates German, English and Arabic', () => {
  const docs = documents(), before = clone(docs.el), source = clone(before);
  source.sections.geschichte.body = 'Βοηθάμε τις οικογένειες στην Αθήνα.';
  const plan = sync.pagePlan({ locale: 'el', before, source, translations: docs });
  sync.applyTranslations(plan, translated(plan, 'el'));
  for (const target of ['de', 'en', 'ar']) assert.equal(plan.documents[target].sections.geschichte.body, `${target}: ${source.sections.geschichte.body}`);
  assert.equal(plan.documents.de.sections.vision.body, docs.de.sections.vision.body);
});
test('unchanged source content does not retranslate other languages', () => {
  const docs = documents();
  const plan = sync.pagePlan({ locale: 'de', before: docs.de, source: docs.de, translations: docs });
  assert.equal(plan.texts.length, 0);
  assert.deepEqual(normalize(plan.documents), docs);
});
test('new sections, positions, images and translated captions are created in all languages', () => {
  const docs = documents(), source = clone(docs.de);
  source.extraSections = [extra('first-1234', 'Familientreffen'), extra('second-1234', 'Gemeinschaft')];
  source.extraSections[0].images = [{ id: 'image-first-1234', src: '/media/team.jpg', caption: 'Familien im Garten', alt: 'Gemeinsames Treffen' }];
  const plan = sync.pagePlan({ locale: 'de', before: docs.de, source, translations: docs });
  sync.applyTranslations(plan, translated(plan));
  for (const locale of sync.locales) {
    const sections = plan.documents[locale].extraSections;
    assert.equal(sections.length, 2);
    assert.equal(sections[0].id, source.extraSections[0].id);
    assert.equal(sections[0].after, 'geschichte');
    assert.equal(sections[0].images[0].src, '/media/team.jpg');
    assert.equal(sections[0].untranslated, false);
    if (locale !== 'de') assert.equal(sections[0].images[0].caption, `${locale}: Familien im Garten`);
  }
});
test('reordering preserves localized text and image captions by ID; removals affect every locale', () => {
  const docs = documents();
  for (const locale of sync.locales) {
    docs[locale].extraSections = [extra('first-1234', `${locale} Erstens`), extra('second-1234', `${locale} Zweitens`), extra('third-1234', `${locale} Drittens`)];
    docs[locale].extraSections[1].images = [
      { id: 'image-first-1234', src: '/media/a.jpg', caption: `${locale} A`, alt: '' },
      { id: 'image-second-1234', src: '/media/b.jpg', caption: `${locale} B`, alt: '' },
    ];
  }
  const source = clone(docs.de);
  source.extraSections = [source.extraSections[1], source.extraSections[0]];
  source.extraSections[0].after = 'vision';
  source.extraSections[0].images.reverse();
  const plan = sync.pagePlan({ locale: 'de', before: docs.de, source, translations: docs });
  assert.equal(plan.texts.length, 0);
  assert.equal(plan.documents.el.extraSections[0].title, 'el Zweitens');
  assert.equal(plan.documents.el.extraSections[0].after, 'vision');
  assert.equal(plan.documents.el.extraSections[0].images[0].caption, 'el B');
  for (const locale of sync.locales) assert(!plan.documents[locale].extraSections.some(section => section.id === 'extra-third-1234'));
});
test('manual mode keeps other language text and creates empty, hidden translation entries', () => {
  const docs = documents(), source = clone(docs.el);
  source.heading = 'Χειροκίνητη διόρθωση'; source.syncTranslations = false;
  source.extraSections = [extra('first-1234', 'Νέα συνάντηση')];
  const plan = sync.pagePlan({ locale: 'el', before: docs.el, source, translations: docs, automatic: false });
  assert.equal(plan.texts.length, 0);
  for (const target of ['de', 'en', 'ar']) {
    assert.equal(plan.documents[target].heading, docs[target].heading);
    assert.equal(plan.documents[target].extraSections[0].untranslated, true);
    assert.equal(plan.documents[target].extraSections[0].title, '');
    assert.equal(plan.documents[target].extraSections[0].body, '');
  }
  assert.equal(plan.documents.el.extraSections[0].untranslated, false);
});
test('enabling automatic mode later fills missing section translations without changing old fields', () => {
  const docs = documents(), source = clone(docs.de);
  source.extraSections = [extra('first-1234', 'Familientreffen')];
  const manual = sync.pagePlan({ locale: 'de', before: docs.de, source, translations: docs, automatic: false });
  const plan = sync.pagePlan({ locale: 'de', before: source, source, translations: manual.documents });
  sync.applyTranslations(plan, translated(plan));
  assert.equal(plan.documents.el.extraSections[0].untranslated, false);
  assert.equal(plan.documents.el.heading, docs.el.heading);
});
test('untranslated sections do not block other page edits or replace existing text with blanks', () => {
  const docs = documents(), original = clone(docs.de);
  original.extraSections = [extra('first-1234', 'Familientreffen')];
  const manual = sync.pagePlan({ locale: 'de', before: docs.de, source: original, translations: docs, automatic: false });
  const source = clone(manual.documents.el); source.heading = 'Νέα επικεφαλίδα';
  const plan = sync.pagePlan({ locale: 'el', before: manual.documents.el, source, translations: manual.documents });
  sync.applyTranslations(plan, translated(plan, 'el'));
  assert.equal(plan.documents.de.heading, 'de: Νέα επικεφαλίδα');
  assert.equal(plan.documents.de.extraSections[0].title, 'Familientreffen');
  assert.equal(plan.documents.el.extraSections[0].untranslated, true);
  assert.equal(plan.documents.el.extraSections[0].body, '');
});
test('clearing optional image text propagates an empty value without calling the service', () => {
  const docs = documents();
  for (const locale of sync.locales) {
    docs[locale].extraSections = [extra('first-1234', 'Titel')];
    docs[locale].extraSections[0].images = [{ id: 'image-first-1234', src: '/media/a.jpg', caption: `${locale} Untertitel`, alt: '' }];
  }
  const source = clone(docs.de); source.extraSections[0].images[0].caption = '';
  const plan = sync.pagePlan({ locale: 'de', before: docs.de, source, translations: docs });
  assert.equal(plan.texts.length, 0);
  assert.equal(plan.documents.ar.extraSections[0].images[0].caption, '');
});
test('invalid or duplicate section IDs are rejected', () => {
  const docs = documents(), source = clone(docs.de);
  source.extraSections = [extra('first-1234', 'Titel'), extra('first-1234', 'Doppelt')];
  assert.throws(() => sync.pagePlan({ locale: 'de', before: docs.de, source, translations: docs }), /eindeutige ID/);
});
test('label translations skip the switch and preserve unchanged messages', () => {
  const docs = Object.fromEntries(sync.locales.map(locale => [locale, { menu: `${locale} Menü`, footerText: `${locale} Footer` }]));
  const source = { ...docs.el, footerText: 'Νέο κείμενο', syncTranslations: true };
  const plan = sync.labelsPlan({ locale: 'el', before: docs.el, source, translations: docs });
  sync.applyTranslations(plan, translated(plan, 'el'));
  assert.equal(plan.documents.de.footerText, 'de: Νέο κείμενο');
  assert.equal(plan.documents.de.menu, docs.de.menu);
  assert(!Object.hasOwn(plan.documents.de, 'syncTranslations'));
});
test('gallery captions use the one edited language; explicit edits in several languages take precedence', () => {
  const before = { sections: { team: { images: [{ src: '/media/a.jpg', caption: { de: 'Alt', en: 'Old', el: 'Παλιό', ar: 'قديم' }, alt: {} }] } } };
  const source = clone(before); source.sections.team.images[0].caption.el = 'Νέο';
  const plan = sync.galleryPlan({ before, source });
  assert.equal(plan.changes.length, 3);
  assert(plan.changes.every(change => change.sourceLocale === 'el'));
  sync.applyTranslations(plan, translated(plan, 'el'));
  assert.equal(plan.document.sections.team.images[0].caption.de, 'de: Νέο');
  source.sections.team.images[0].caption.de = 'Eigene Übersetzung';
  assert.equal(sync.galleryPlan({ before, source }).texts.length, 0);
});
test('one backend call saves all translated files together with the original assets', async () => {
  const { backend, calls, files } = mockBackend(), source = clone(files.get(pagePath('el')));
  source.heading = 'Νέος τίτλος';
  sync.wrapBackend(backend, { request: async ({ plan, locale }) => translated(plan, locale) });
  await backend.getEntry(pagePath('el'));
  const assets = [{ path: 'apps/web/public/media/new.jpg', fileObj: { test: true } }];
  const result = await backend.persistEntry({ dataFiles: [{ path: pagePath('el'), slug: 'about_el', raw: JSON.stringify(source) }], assets }, { useWorkflow: false });
  assert.equal(result.saved, true); assert.equal(calls.length, 1);
  assert.equal(calls[0].entry.dataFiles.length, 4); assert.equal(calls[0].entry.assets, assets);
  assert.equal(files.get(pagePath('de')).heading, 'de: Νέος τίτλος');
});
test('translation failures never reach the file-writing backend', async () => {
  const { backend, calls, files } = mockBackend(), source = clone(files.get(pagePath('de')));
  source.heading = 'Neue Überschrift';
  sync.wrapBackend(backend, { request: async () => { throw new Error('Kontingent aufgebraucht'); } });
  await assert.rejects(backend.persistEntry({ dataFiles: [{ path: pagePath('de'), raw: JSON.stringify(source) }], assets: [] }, {}), /Kontingent/);
  assert.equal(calls.length, 0); assert.equal(files.get(pagePath('de')).heading, 'de Überschrift');
});
test('editing a stale source is blocked before spending translation calls', async () => {
  const { backend, calls, files } = mockBackend(); let requests = 0;
  sync.wrapBackend(backend, { request: async () => { requests++; } });
  const entry = await backend.getEntry(pagePath('de')), source = JSON.parse(entry.data);
  source.heading = 'Mein neuer Text'; files.get(pagePath('de')).heading = 'Neuere fremde Änderung';
  await assert.rejects(backend.persistEntry({ dataFiles: [{ path: pagePath('de'), raw: JSON.stringify(source) }], assets: [] }, {}), /inzwischen geändert/);
  assert.equal(requests, 0); assert.equal(calls.length, 0);
});
test('concurrent changes in another language during translation are preserved', async () => {
  const { backend, calls, files } = mockBackend(), source = clone(files.get(pagePath('de')));
  source.heading = 'Neue Überschrift';
  sync.wrapBackend(backend, { request: async ({ plan, locale }) => { files.get(pagePath('el')).intro = 'Späterer Text'; return translated(plan, locale); } });
  await assert.rejects(backend.persistEntry({ dataFiles: [{ path: pagePath('de'), raw: JSON.stringify(source) }], assets: [] }, {}), /Während der Übersetzung/);
  assert.equal(calls.length, 0); assert.equal(files.get(pagePath('el')).intro, 'Späterer Text');
});
test('manual corrections to existing text save only the selected language', async () => {
  const { backend, calls, files } = mockBackend(), source = clone(files.get(pagePath('de')));
  source.heading = 'Manuell'; source.syncTranslations = false;
  sync.wrapBackend(backend, { request: async () => { throw new Error('Must not translate'); } });
  await backend.persistEntry({ dataFiles: [{ path: pagePath('de'), raw: JSON.stringify(source) }], assets: [] }, {});
  assert.equal(calls[0].entry.dataFiles.length, 1);
  assert.equal(files.get(pagePath('el')).heading, 'el Überschrift');
});
test('mixed-source gallery fields are sent to the service with their own source language', async () => {
  const path = 'apps/web/src/ministry/content/galleries/about.json';
  let data = { sections: { team: { images: [{ src: '/media/a.jpg', caption: { de: 'Vorher', en: 'Before', el: 'Πριν', ar: 'قبل' }, alt: { de: 'Bild', en: 'Image', el: 'Εικόνα', ar: 'صورة' } }] } } };
  const source = clone(data); source.sections.team.images[0].caption.el = 'Νέα λεζάντα'; source.sections.team.images[0].alt.de = 'Neues Bild';
  const requests = [];
  const backend = sync.wrapBackend({ getEntry: async () => ({ file: { path }, data: JSON.stringify(data) }), getToken: async () => '', persistEntry: async entry => { data = JSON.parse(entry.dataFiles[0].raw); } }, {
    request: async ({ plan, locale }) => { requests.push({ locale, texts: normalize(plan.texts) }); return translated(plan, locale); },
  });
  await backend.persistEntry({ dataFiles: [{ path, raw: JSON.stringify(source) }], assets: [] }, {});
  assert.deepEqual(requests, [{ locale: 'de', texts: ['Neues Bild'] }, { locale: 'el', texts: ['Νέα λεζάντα'] }]);
  assert.equal(data.sections.team.images[0].caption.de, 'de: Νέα λεζάντα');
  assert.equal(data.sections.team.images[0].alt.el, 'el: Neues Bild');
});
test('translation batching respects service limits and keeps the result order', async () => {
  const texts = Array.from({ length: 45 }, (_, index) => `Text ${index}`), batches = [];
  const result = await sync.requestTranslations({ locale: 'de', token: 'test-token', plan: { texts }, fetch: async (url, options) => {
    const body = JSON.parse(options.body); batches.push(body.texts.length);
    assert.equal(options.headers.Authorization, 'Bearer test-token');
    return Response.json({ translations: Object.fromEntries(body.targets.map(target => [target, body.texts.map(text => `${target} ${text}`)])) });
  } });
  assert.deepEqual(batches, [40, 5]); assert.equal(result.el[44], 'el Text 44');
});
