/* Shared with the tests; no keys or translation credentials belong in this file. */
(function expose(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PhiladelphiaSync = api;
})(typeof window === 'object' ? window : globalThis, function createSync() {
  'use strict';
  const locales = ['de', 'en', 'el', 'ar'];
  const base = 'apps/web/src/ministry/content/';
  const clone = value => JSON.parse(JSON.stringify(value));
  const canonical = value => {
    if (Array.isArray(value)) return value.map(canonical);
    if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])]));
    return value;
  };
  const equal = (a, b) => JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));
  function put(object, path, value) {
    let node = object;
    for (const key of path.slice(0, -1)) node = node[key];
    node[path.at(-1)] = value;
  }
  function planner() {
    const texts = [], changes = [], indexes = new Map();
    return {
      texts, changes,
      add(document, target, path, value, sourceLocale) {
        if (typeof value !== 'string') throw new Error('Ein zu übersetzender Text fehlt. Bitte die Eingabefelder prüfen.');
        if (!value.trim()) { put(document, path, value); return; }
        if (!indexes.has(value)) { indexes.set(value, texts.length); texts.push(value); }
        changes.push({ document, target, path, index: indexes.get(value), sourceLocale });
      },
    };
  }
  function validateExtras(source) {
    const seen = new Set(Object.keys(source.sections || {}));
    if (source.extraSections !== undefined && !Array.isArray(source.extraSections)) throw new Error('Die Liste der neuen Abschnitte ist ungültig.');
    for (const section of source.extraSections || []) {
      if (!/^extra-[a-z0-9-]{8,80}$/.test(section.id || '') || seen.has(section.id)) throw new Error('Ein neuer Abschnitt hat keine eindeutige ID. Bitte den Editor neu laden.');
      seen.add(section.id);
      if (!['', 'start'].includes(section.after) && !Object.hasOwn(source.sections, section.after)) throw new Error('Die Position eines neuen Abschnitts ist ungültig.');
      if ((!section.title?.trim() || !section.body?.trim()) && section.untranslated !== true) throw new Error('Neue Abschnitte brauchen eine Überschrift und einen Text.');
      const images = new Set();
      for (const image of section.images || []) {
        if (!/^image-[a-z0-9-]{8,80}$/.test(image.id || '') || images.has(image.id)) throw new Error('Ein Bild hat keine eindeutige ID. Bitte den Editor neu laden.');
        if (!/^\/media\/[^?#\\]+\.(jpe?g|png|webp|gif)$/i.test(image.src || '') || image.src.includes('..')) throw new Error('Bitte eine Bilddatei aus der Mediensammlung auswählen.');
        images.add(image.id);
      }
    }
  }
  function pagePlan({ locale, before, source, translations, automatic = true }) {
    source = clone(source);
    for (const section of source.extraSections || []) { section.title ??= ''; section.body ??= ''; }
    validateExtras(source);
    for (const section of source.extraSections || []) section.untranslated = !(section.title.trim() && section.body.trim());
    const documents = { [locale]: source }, plan = planner();
    for (const target of locales.filter(item => item !== locale)) {
      const document = clone(translations[target]);
      documents[target] = document;
      if (automatic) {
        for (const key of ['title', 'heading', 'intro']) {
          if (source[key] !== before[key]) plan.add(document, target, [key], source[key]);
        }
        for (const [id, section] of Object.entries(source.sections)) {
          if (!document.sections?.[id] || !before.sections?.[id]) throw new Error('Die vorhandenen Sprachfassungen haben unterschiedliche feste Abschnitte. Bitte die Inhaltsdateien prüfen.');
          for (const key of ['title', 'body']) {
            if (section[key] !== before.sections[id][key]) plan.add(document, target, ['sections', id, key], section[key]);
          }
          if (section.pending !== before.sections[id].pending) document.sections[id].pending = section.pending;
        }
      }
      const oldById = new Map((before.extraSections || []).map(section => [section.id, section]));
      const targetById = new Map((document.extraSections || []).map(section => [section.id, section]));
      const extra = (source.extraSections || []).map(section => {
        const old = oldById.get(section.id);
        const previous = targetById.get(section.id);
        const missing = !previous || previous.untranslated === true;
        const value = previous ? clone(previous) : { id: section.id, title: '', body: '', pending: true, untranslated: true, images: [] };
        value.after = section.after;
        if (automatic && !section.untranslated && (!old || missing || section.pending !== old.pending)) value.pending = Boolean(section.pending);
        const previousImages = new Map((value.images || []).map(image => [image.id, image]));
        value.images = (section.images || []).map(image => ({
          ...(previousImages.get(image.id) || { caption: '', alt: '' }), id: image.id, src: image.src,
        }));
        return value;
      });
      // Adding, positioning, reordering and removing sections/images is shared even in manual mode.
      if (source.extraSections !== undefined || document.extraSections !== undefined) document.extraSections = extra;
      if (automatic) (source.extraSections || []).forEach((section, index) => {
        if (section.untranslated) return;
        const old = oldById.get(section.id), previous = targetById.get(section.id);
        const missing = !previous || previous.untranslated === true;
        for (const key of ['title', 'body']) {
          if (missing || !old || section[key] !== old[key]) plan.add(document, target, ['extraSections', index, key], section[key]);
        }
        const oldImages = new Map((old?.images || []).map(image => [image.id, image]));
        const targetImages = new Set((previous?.images || []).map(image => image.id));
        (section.images || []).forEach((image, imageIndex) => {
          for (const key of ['caption', 'alt']) {
            if (missing || !targetImages.has(image.id) || (image[key] || '') !== (oldImages.get(image.id)?.[key] || '')) {
              plan.add(document, target, ['extraSections', index, 'images', imageIndex, key], image[key] || '');
            }
          }
        });
        document.extraSections[index].untranslated = false;
      });
    }
    return { ...plan, documents };
  }
  function labelsPlan({ locale, before, source, translations, automatic = true }) {
    const documents = { [locale]: clone(source) }, plan = planner();
    for (const target of locales.filter(item => item !== locale)) {
      const document = clone(translations[target]);
      documents[target] = document;
      if (automatic) for (const [key, value] of Object.entries(source)) {
        if (key !== 'syncTranslations' && value !== before[key]) plan.add(document, target, [key], value);
      }
    }
    return { ...plan, documents };
  }
  function galleryPlan({ before, source, automatic = true }) {
    const document = clone(source), plan = planner();
    if (automatic) for (const [id, section] of Object.entries(source.sections)) {
      (section.images || []).forEach((image, index) => {
        // A path identifies existing gallery images; new section images use explicit IDs.
        const previous = before.sections?.[id]?.images?.find(item => item.src === image.src);
        for (const key of ['caption', 'alt']) {
          const changed = locales.filter(locale => (image[key]?.[locale] || '') !== (previous?.[key]?.[locale] || ''));
          if (changed.length !== 1) continue; // Explicit edits in several languages take precedence.
          const locale = changed[0];
          document.sections[id].images[index][key] ??= {};
          for (const target of locales.filter(item => item !== locale)) {
            plan.add(document, target, ['sections', id, 'images', index, key, target], image[key]?.[locale] || '', locale);
          }
        }
      });
    }
    return { ...plan, document };
  }
  function applyTranslations(plan, translated) {
    for (const { document, target, path, index } of plan.changes) {
      const value = translated[target]?.[index];
      if (typeof value !== 'string' || !value.trim()) throw new Error('Die Übersetzung ist unvollständig. Es wurde nichts gespeichert.');
      put(document, path, value);
    }
    return plan;
  }
  function identify(path) {
    if (!path?.startsWith(base)) return null;
    const relative = path.slice(base.length);
    const page = /^pages\/([a-z0-9-]+)\.(de|en|el|ar)\.json$/.exec(relative);
    if (page) return { type: 'page', locale: page[2], pathFor: locale => `${base}pages/${page[1]}.${locale}.json` };
    const label = /^ui\/(de|en|el|ar)\.json$/.exec(relative);
    if (label) return { type: 'labels', locale: label[1], pathFor: locale => `${base}ui/${locale}.json` };
    if (/^galleries\/[a-z0-9-]+\.json$/.test(relative)) return { type: 'gallery' };
    return null;
  }
  function readJSON(raw) {
    if (typeof raw !== 'string' || !raw.trim()) throw new Error('Eine Sprachfassung konnte nicht geladen werden. Bitte neu laden und erneut versuchen.');
    try { return JSON.parse(raw); } catch { throw new Error('Eine Inhaltsdatei ist ungültig. Es wurde nichts gespeichert.'); }
  }
  async function requestTranslations({ plan, locale, token, fetch: request = globalThis.fetch }) {
    const result = Object.fromEntries(locales.filter(item => item !== locale).map(item => [item, []]));
    let offset = 0;
    while (offset < plan.texts.length) {
      const texts = []; let size = 0;
      while (offset + texts.length < plan.texts.length && texts.length < 40) {
        const text = plan.texts[offset + texts.length];
        if (text.length > 12000) throw new Error('Ein geänderter Text ist zu lang. Bitte in mehrere Abschnitte mit jeweils weniger als 12.000 Zeichen aufteilen.');
        if (size + text.length > 12000 && texts.length) break;
        texts.push(text); size += text.length;
      }
      const response = await request('/api/cms-translate', {
        method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ source: locale, targets: locales.filter(item => item !== locale), texts }),
        signal: AbortSignal.timeout(90000),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Die automatische Übersetzung ist momentan nicht verfügbar.');
      for (const target of Object.keys(result)) {
        if (!Array.isArray(data.translations?.[target]) || data.translations[target].length !== texts.length) throw new Error('Die Übersetzung ist unvollständig. Es wurde nichts gespeichert.');
        result[target].push(...data.translations[target]);
      }
      offset += texts.length;
    }
    return result;
  }
  function wrapBackend(backend, { onStatus = () => {}, onSaved = () => {}, request = requestTranslations, defaultAutomatic = true } = {}) {
    if (backend.philadelphiaSync) return backend;
    backend.philadelphiaSync = true;
    const snapshots = new Map();
    const originalGet = backend.getEntry.bind(backend), originalPersist = backend.persistEntry.bind(backend);
    const remember = entry => { if (entry?.file?.path && identify(entry.file.path) && typeof entry.data === 'string') snapshots.set(entry.file.path, readJSON(entry.data)); return entry; };
    backend.getEntry = async path => remember(await originalGet(path));
    if (backend.entriesByFiles) {
      const originalEntries = backend.entriesByFiles.bind(backend);
      backend.entriesByFiles = async (...args) => { const entries = await originalEntries(...args); entries.forEach(remember); return entries; };
    }
    backend.persistEntry = async (entry, options) => {
      const file = entry.dataFiles?.find(item => identify(item.path));
      if (!file) return originalPersist(entry, options);
      if (entry.dataFiles.length !== 1 || options.useWorkflow) throw new Error('Die gemeinsame Übersetzung benötigt die direkte Veröffentlichung einer einzelnen Seite.');
      const info = identify(file.path), source = readJSON(file.raw), automatic = source.syncTranslations === true || (source.syncTranslations !== false && defaultAutomatic);
      source.syncTranslations = automatic;
      try {
        onStatus('busy', automatic ? 'Änderungen werden übersetzt und gemeinsam gespeichert …' : 'Änderungen werden gespeichert …');
        const paths = info.type === 'gallery' ? [file.path] : locales.map(info.pathFor);
        const records = await Promise.all(paths.map(async path => ({ path, data: readJSON((await originalGet(path)).data) })));
        const before = records.find(record => record.path === file.path).data;
        if (snapshots.has(file.path) && !equal(before, snapshots.get(file.path))) throw new Error('Diese Seite wurde inzwischen geändert. Bitte neu laden, damit keine neueren Inhalte überschrieben werden.');
        const translations = info.type === 'gallery' ? null : Object.fromEntries(locales.map(locale => [locale, records.find(record => record.path === info.pathFor(locale)).data]));
        let plan;
        if (info.type === 'page') plan = pagePlan({ locale: info.locale, before, source, translations, automatic });
        else if (info.type === 'labels') plan = labelsPlan({ locale: info.locale, before, source, translations, automatic });
        else plan = galleryPlan({ before, source, automatic });
        if (plan.texts.length) {
          const token = await backend.getToken();
          if (info.type !== 'gallery') applyTranslations(plan, await request({ plan, locale: info.locale, token }));
          else {
            // Caption/alt fields may each have a different source language.
            for (const locale of locales) {
              const changes = plan.changes.filter(change => change.sourceLocale === locale);
              const indexes = [...new Set(changes.map(change => change.index))];
              const group = { texts: indexes.map(index => plan.texts[index]), changes: changes.map(change => ({ ...change, index: indexes.indexOf(change.index) })) };
              if (changes.length) applyTranslations(group, await request({ plan: group, locale, token }));
            }
          }
        }
        // Recheck all participating files after the network calls, before writing any of them.
        const current = await Promise.all(records.map(async record => readJSON((await originalGet(record.path)).data)));
        if (records.some((record, index) => !equal(record.data, current[index]))) throw new Error('Während der Übersetzung wurden Inhalte geändert. Bitte neu laden und erneut veröffentlichen.');
        const documents = info.type === 'gallery' ? { [file.path]: plan.document } : Object.fromEntries(locales.map(locale => [info.pathFor(locale), plan.documents[locale]]));
        const dataFiles = Object.entries(documents).filter(([path, value]) => path === file.path || !equal(value, records.find(record => record.path === path).data))
          .map(([path, value]) => ({ ...file, path, raw: `${JSON.stringify(value, null, 2)}\n` }));
        const result = await originalPersist({ ...entry, dataFiles }, options);
        for (const saved of dataFiles) snapshots.set(saved.path, readJSON(saved.raw));
        onSaved(dataFiles.map(item => item.path), file.path);
        onStatus('saved', automatic ? 'Gespeichert. Alle betroffenen Sprachen sind aktualisiert.' : 'Gespeichert. Sprachtexte wurden manuell gepflegt.');
        return result;
      } catch (error) {
        const message = error.name === 'TimeoutError' ? 'Die Übersetzung hat zu lange gedauert. Bitte erneut versuchen.' : error.message;
        onStatus('error', message);
        throw new Error(message);
      }
    };
    return backend;
  }
  function install(CMS, options = {}) {
    for (const name of ['github', 'proxy']) {
      const registration = CMS.getBackend(name);
      if (!registration?.init) throw new Error('Das CMS-Speichermodul ist nicht verfügbar.');
      const original = registration.init;
      registration.init = (...args) => wrapBackend(original(...args), options);
    }
    CMS.registerEventListener({ name: 'preSave', handler({ entry }) {
      let data = entry.get('data');
      if (identify(entry.get('path'))) data = data.set('syncTranslations', data.get('syncTranslations', options.defaultAutomatic !== false) === true);
      const extras = data.get('extraSections');
      if (extras) data = data.set('extraSections', extras.map(section => {
        if (!section.get('id')) section = section.set('id', `extra-${crypto.randomUUID()}`);
        if (section.get('title', '').trim() && section.get('body', '').trim()) section = section.set('untranslated', false);
        if (section.get('images')) section = section.set('images', section.get('images').map(image => image.get('id') ? image : image.set('id', `image-${crypto.randomUUID()}`)));
        return section;
      }));
      return data;
    } });
  }
  return { locales, pagePlan, labelsPlan, galleryPlan, applyTranslations, identify, equal, requestTranslations, wrapBackend, install };
});
