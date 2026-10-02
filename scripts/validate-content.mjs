import { readFile, readdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = path.join(root, 'apps/web/src/ministry/content');
const read = async filename => JSON.parse(await readFile(path.join(base, filename), 'utf8'));
const missingImages = new Set();
function nonempty(value, label) { assert.equal(typeof value, 'string', `${label}: Text fehlt.`); assert(value.trim(), `${label}: Text ist leer.`); }
function https(value, label, optional = false) {
  if (optional && value === '') return;
  const url = new URL(value);
  assert(url.protocol === 'https:' && !url.username && !url.password, `${label}: Bitte einen HTTPS-Link ohne Zugangsdaten verwenden.`);
}
async function localFile(value, label, extensions, allowMissing = false) {
  nonempty(value, label);
  assert(/^\/(media|documents|document-previews)\//.test(value) && !value.includes('..') && !/[?#\\]/.test(value), `${label}: Ungültiger Dateipfad.`);
  assert(extensions.test(value), `${label}: Dateiformat nicht unterstützt.`);
  try {
    await access(path.join(root, 'apps/web/public', value));
  } catch (error) {
    if (!allowMissing || error.code !== 'ENOENT') throw error;
    missingImages.add(value);
  }
}
async function localImage(value, label, { optional = false, extensions = /\.(jpe?g|png|webp|gif)$/i } = {}) {
  if (optional && (value === undefined || value === null || value === '')) return;
  await localFile(value, label, extensions, true);
}
try {
  const structure = await read('structure.json');
  const defaultLabels = await read('ui/de.json');
  const pageIds = new Set(structure.pages.map(page => page.id));
  const extraStructure = new Map();
  const labelKeys = value => Object.keys(value).filter(key => key !== 'syncTranslations').sort();
  assert.equal(pageIds.size, structure.pages.length);
  let count = 0;
  for (const { code } of structure.languages) {
    const labels = await read(`ui/${code}.json`);
    assert.deepEqual(labelKeys(labels), labelKeys(defaultLabels), `${code}: Beschriftungen sind unvollständig.`);
    for (const [key, value] of Object.entries(labels)) {
      if (key === 'syncTranslations') assert.equal(typeof value, 'boolean', `${code}: Übersetzungsschalter ist ungültig.`);
      else nonempty(value, `${code}/${key}`);
    }
    for (const page of structure.pages) {
      const data = await read(`pages/${page.id}.${code}.json`);
      if (data.syncTranslations !== undefined) assert.equal(typeof data.syncTranslations, 'boolean', `${code}/${page.id}: Übersetzungsschalter ist ungültig.`);
      for (const key of ['title', 'heading', 'intro']) nonempty(data[key], `${code}/${page.id}/${key}`);
      assert.deepEqual(Object.keys(data.sections).sort(), page.sections.map(section => section.id).sort(), `${code}/${page.id}: Abschnitte sind unvollständig.`);
      for (const section of page.sections) {
        const entry = data.sections[section.id];
        nonempty(entry.title, `${code}/${page.id}/${section.id}/title`);
        nonempty(entry.body, `${code}/${page.id}/${section.id}/body`);
        assert.equal(typeof entry.pending, 'boolean', `${code}/${page.id}/${section.id}: Fertigstellungsstatus fehlt.`);
        if (section.target) assert(pageIds.has(section.target), `Ungültiges Linkziel: ${section.target}`);
        if (section.targetSection) assert(structure.pages.find(item => item.id === section.target).sections.some(item => item.id === section.targetSection));
      }
      assert(data.extraSections === undefined || Array.isArray(data.extraSections), `${code}/${page.id}: Neue Abschnitte sind ungültig.`);
      const usedIds = new Set(page.sections.map(section => section.id));
      for (const section of data.extraSections ?? []) {
        const label = `${code}/${page.id}/${section.id}`;
        assert(/^extra-[a-z0-9-]{8,80}$/.test(section.id || '') && !usedIds.has(section.id), `${label}: Abschnitt-ID ist ungültig oder doppelt.`);
        usedIds.add(section.id);
        assert(['', 'start'].includes(section.after) || page.sections.some(item => item.id === section.after), `${label}: Abschnittsposition ist ungültig.`);
        assert(section.untranslated === undefined || typeof section.untranslated === 'boolean', `${label}: Übersetzungsstatus ist ungültig.`);
        if (section.untranslated === true) {
          assert(typeof section.title === 'string' && typeof section.body === 'string', `${label}: Sprachfelder fehlen.`);
        } else {
          nonempty(section.title, `${label}/title`); nonempty(section.body, `${label}/body`);
        }
        assert.equal(typeof section.pending, 'boolean', `${label}: Fertigstellungsstatus fehlt.`);
        assert(section.images === undefined || Array.isArray(section.images), `${label}: Bilderliste ist ungültig.`);
        const imageIds = new Set();
        for (const image of section.images ?? []) {
          assert(/^image-[a-z0-9-]{8,80}$/.test(image.id || '') && !imageIds.has(image.id), `${label}: Bild-ID ist ungültig oder doppelt.`);
          imageIds.add(image.id);
          assert(image.src?.startsWith('/media/'), `${label}: Bild muss aus der Mediensammlung stammen.`);
          await localImage(image.src, `${label}: Bilddatei`);
          for (const field of ['caption', 'alt']) assert(image[field] === undefined || typeof image[field] === 'string', `${label}/${field}: Bildtext ist ungültig.`);
        }
      }
      const shared = (data.extraSections ?? []).map(section => ({ id: section.id, after: section.after, images: (section.images ?? []).map(image => ({ id: image.id, src: image.src })) }));
      if (!extraStructure.has(page.id)) extraStructure.set(page.id, shared);
      else assert.deepEqual(shared, extraStructure.get(page.id), `${code}/${page.id}: Neue Abschnitte, Bilddateien oder ihre Reihenfolge stimmen nicht mit den anderen Sprachen überein.`);
      count++;
    }
  }
  assert.equal((await readdir(path.join(base, 'pages'))).filter(file => file.endsWith('.json')).length, count);
  const site = await read('site.json');
  site.email ??= ''; site.phone ??= ''; site.donationUrl ??= ''; site.socialLinks ??= [];
  nonempty(site.name, 'Name des Ministries');
  assert(Array.isArray(site.address) && site.address.length > 0, 'Adresse fehlt.');
  site.address.forEach(line => nonempty(line, 'Adresszeile'));
  assert(typeof site.email === 'string' && (!site.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email)), 'Öffentliche E-Mail-Adresse ist ungültig.');
  assert(typeof site.phone === 'string' && /^[+0-9 ()/.-]*$/.test(site.phone), 'Telefonnummer ist ungültig.');
  https(site.mapsUrl, 'Google Maps');
  https(site.donationUrl, 'Spendenlink', true);
  assert(Array.isArray(site.socialLinks), 'Social-Media-Liste fehlt.');
  for (const social of site.socialLinks) { nonempty(social.name, 'Social-Media-Name'); https(social.url, 'Social-Media-Link'); }
  const assets = await read('assets.json');
  for (const [name, value] of Object.entries(assets)) await localImage(value, name, { optional: true });
  const documents = await read('documents.json');
  for (const key of ['maluk', 'sunday', 'camp']) {
    const document = documents[key];
    assert(document?.type === 'pdf', `${key}: PDF-Typ fehlt.`);
    assert(Number.isInteger(document.pages) && document.pages >= 1 && document.pages <= 10000, `${key}: Seitenzahl ist ungültig.`);
    await localFile(document.url, `${key}: PDF`, /\.pdf$/i);
    await localImage(document.preview, `${key}: Vorschau`, { optional: true, extensions: /\.(jpe?g|png|webp)$/i });
  }
  let extraImages = 0;
  const locales = new Set(structure.languages.map(language => language.code));
  for (const page of structure.pages) {
    const gallery = await read(`galleries/${page.id}.json`);
    assert.deepEqual(Object.keys(gallery.sections).sort(), page.sections.map(section => section.id).sort(), `${page.id}: Bildabschnitte sind unvollständig.`);
    for (const section of page.sections) {
      const entry = gallery.sections[section.id];
      const label = `${page.id}/${section.id}`;
      assert(['before', 'after'].includes(entry.position), `${label}: Bildposition ist ungültig.`);
      assert(['grid', 'full'].includes(entry.layout), `${label}: Bilddarstellung ist ungültig.`);
      assert(entry.images === undefined || Array.isArray(entry.images), `${label}: Bilderliste ist ungültig.`);
      for (const image of entry.images ?? []) {
        nonempty(image.name, `${label}: Bildbezeichnung`);
        assert(typeof image.src === 'string' && image.src.startsWith('/media/'), `${label}: Bild muss aus der Mediensammlung stammen.`);
        await localImage(image.src, `${label}: Bilddatei`);
        for (const field of ['caption', 'alt']) {
          const translated = image[field];
          if (translated === undefined) continue;
          assert(translated && typeof translated === 'object' && !Array.isArray(translated), `${label}/${field}: Sprachtexte sind ungültig.`);
          for (const [locale, value] of Object.entries(translated)) {
            assert(locales.has(locale) && typeof value === 'string', `${label}/${field}/${locale}: Bildtext ist ungültig.`);
          }
        }
        extraImages++;
      }
    }
  }
  for (const image of missingImages) console.warn(`Bild fehlt und wird auf der Website ausgeblendet: ${image}. Textänderungen können veröffentlicht werden.`);
  console.log(`Content checked: ${count} language pages, labels, contact details, images, ${extraImages} additional images and PDF previews.`);
} catch (error) {
  console.error(`Inhalte konnten nicht veröffentlicht werden: ${error.message}`);
  process.exitCode = 1;
}
