import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildContent, orderedSections } from '../apps/web/src/ministry/content-model.js';

test('extra sections are placed before or after fixed sections in their chosen order', () => {
  const fixed = [{ id: 'first' }, { id: 'second' }];
  const extra = [{ id: 'a', after: 'first' }, { id: 'b', after: '' }, { id: 'c', after: 'first' }, { id: 'd', after: 'second' }];
  assert.deepEqual(orderedSections(fixed, extra).map(section => section.id), ['b', 'first', 'a', 'c', 'second', 'd']);
});
test('dynamic content has localized text, captions, visibility and a stable menu anchor', () => {
  const locales = ['de', 'en', 'el', 'ar'];
  const structure = { languages: locales.map(code => ({ code })), mainPageCount: 1, pages: [{ id: 'home', path: '/', sections: [{ id: 'fixed', kind: 'cta' }] }] };
  const translations = Object.fromEntries(locales.map(locale => [`home.${locale}`, { title: locale, heading: locale, intro: locale, sections: { fixed: { title: locale, body: locale, pending: false } }, extraSections: [{
    id: 'extra-first-1234', after: 'fixed', title: `${locale} Neu`, body: `${locale} Text`, pending: false, untranslated: locale === 'ar',
    images: [{ id: 'image-first-1234', src: '/media/test.jpg', caption: `${locale} Untertitel`, alt: `${locale} Beschreibung` }],
  }] }]));
  const labels = Object.fromEntries(locales.map(locale => [locale, { menu: locale, syncTranslations: true }]));
  const content = buildContent({ structure, translations, labels, settings: {}, media: { missionLetter: '/media/letter.jpg' }, documentData: { letter: {} } });
  const sections = content.pages[0].sections;
  assert.equal(sections[0].kind, 'cta'); assert.equal(sections[1].id, 'extra-first-1234');
  assert.equal(sections[1].body.el, 'el Text'); assert.equal(sections[1].gallery.images[0].caption.de, 'de Untertitel');
  assert.equal(sections[1].available.ar, false); assert.equal(sections[1].available.el, true);
  assert(!Object.hasOwn(content.ui, 'syncTranslations'));
});
