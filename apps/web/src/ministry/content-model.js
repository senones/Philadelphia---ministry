// Fixed sections keep their special features. Extra sections are edited in the CMS.
export function orderedSections(fixed, extra = []) {
  const ids = new Set(fixed.map(section => section.id));
  const at = anchor => extra.filter(section => (ids.has(section.after) ? section.after : '') === anchor);
  return [...at(''), ...fixed.flatMap(section => [section, ...at(section.id)])];
}
export function buildContent({ structure, translations, labels, settings, media, documentData, galleries = {} }) {
  const locales = structure.languages.map(language => language.code);
  const translated = getValue => Object.fromEntries(locales.map(locale => [locale, getValue(locale)]));
  const allPages = structure.pages.map(page => {
    const extras = new Map();
    for (const locale of locales) for (const section of translations[`${page.id}.${locale}`].extraSections ?? []) {
      if (!extras.has(section.id)) extras.set(section.id, section);
    }
    const extraIn = (id, locale) => translations[`${page.id}.${locale}`].extraSections?.find(section => section.id === id);
    const additional = [...extras.values()].map(section => ({
      id: section.id, after: section.after,
      available: translated(locale => Boolean(extraIn(section.id, locale)) && extraIn(section.id, locale).untranslated !== true),
      ...Object.fromEntries(['title', 'body', 'pending'].map(key => [key, translated(locale => extraIn(section.id, locale)?.[key] ?? (key === 'pending' ? true : ''))])),
      gallery: {
        position: 'after', layout: 'grid',
        images: (section.images ?? []).map(image => ({
          ...image,
          ...Object.fromEntries(['caption', 'alt'].map(key => [key, translated(locale => extraIn(section.id, locale)?.images?.find(item => item.id === image.id)?.[key] ?? '')])),
        })),
      },
    }));
    return {
    ...page,
    ...Object.fromEntries(['title', 'heading', 'intro'].map(key => [key, translated(locale => translations[`${page.id}.${locale}`][key])])),
    sections: orderedSections(page.sections.map(section => ({
      ...section,
      ...Object.fromEntries(['title', 'body', 'pending'].map(key => [key, translated(locale => translations[`${page.id}.${locale}`].sections[section.id][key])])),
      gallery: {
        position: galleries[page.id]?.sections?.[section.id]?.position ?? 'after',
        layout: galleries[page.id]?.sections?.[section.id]?.layout ?? 'grid',
        images: (galleries[page.id]?.sections?.[section.id]?.images ?? []).map(image => ({
          ...image,
          alt: translated(locale => image.alt?.[locale] ?? ''),
          caption: translated(locale => image.caption?.[locale] ?? ''),
        })),
      },
    })), additional),
  };
  });
  return {
    languages: structure.languages,
    allPages,
    pages: allPages.slice(0, structure.mainPageCount),
    legalPages: allPages.slice(structure.mainPageCount),
    ui: Object.fromEntries(Object.keys(labels.de).filter(key => key !== 'syncTranslations').map(key => [key, translated(locale => labels[locale][key])])),
    site: { ...settings, email: settings.email ?? '', phone: settings.phone ?? '', donationUrl: settings.donationUrl ?? '', socialLinks: settings.socialLinks ?? [] },
    assets: media,
    documents: {
      ...documentData,
      // The mission letter and its home-page image share the same image field.
      letter: { ...documentData.letter, url: media.missionLetter, preview: media.missionLetter },
    },
  };
}
