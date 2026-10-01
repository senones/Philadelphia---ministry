/* Decap CMS 3.16.3 is served locally, including its lazy-loaded editor widgets. */
(async function startEditor() {
  const status = document.getElementById('editor-status');
  const message = document.getElementById('editor-message');
  try {
    const response = await fetch('/api/cms-config', { cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error('Configuration unavailable');
    const result = await response.json();
    if (!result.enabled) {
      message.textContent = 'Der Bearbeitungsbereich ist noch nicht freigeschaltet. Bitte wenden Sie sich an den Verantwortlichen der Website.';
      return;
    }
    if (!window.CMS || !window.h || !window.PhiladelphiaSync) throw new Error('Editor unavailable');
    const h = window.h;
    const notice = document.getElementById('translation-status');
    const noticeText = document.getElementById('translation-message');
    const showNotice = (state, text) => { notice.hidden = false; notice.dataset.state = state; noticeText.textContent = text; };
    document.getElementById('close-translation-status').onclick = () => { notice.hidden = true; };
    showNotice('ready', result.translation?.enabled
      ? `Automatische Übersetzung mit ${result.translation.provider === 'openai' ? 'OpenAI' : 'DeepL'} ist verfügbar. Die Sprache, in der Sie bearbeiten, ist die Ausgangssprache.`
      : 'Automatische Übersetzung noch nicht eingerichtet. Texte können einzeln bearbeitet werden; die Automatik ist zunächst ausgeschaltet.');
    if (!result.translation?.enabled) for (const collection of result.config.collections) for (const file of collection.files || []) {
      const toggle = file.fields.find(field => field.name === 'syncTranslations');
      if (toggle) toggle.default = false;
    }
    const refreshCollections = new Set();
    window.addEventListener('hashchange', () => {
      const collection = /\/collections\/([^/]+)/.exec(window.location.hash)?.[1];
      if (refreshCollections.has(collection)) window.location.reload();
    });
    window.PhiladelphiaSync.install(window.CMS, {
      defaultAutomatic: Boolean(result.translation?.enabled),
      onStatus: showNotice,
      onSaved(paths, source) {
        const sourceLocale = window.PhiladelphiaSync.identify(source)?.locale;
        for (const path of paths) {
          const locale = window.PhiladelphiaSync.identify(path)?.locale;
          if (locale && locale !== sourceLocale) refreshCollections.add(`pages_${locale}`);
        }
      },
    });
    const pendingLabels = { de: 'Inhalte folgen', en: 'Content coming soon', el: 'Το περιεχόμενο θα προστεθεί σύντομα', ar: 'سيُضاف المحتوى قريبًا' };
    window.CMS.registerPreviewStyle('/admin/preview.css');
    for (const collection of result.config.collections.filter(item => item.name.startsWith('pages_'))) {
      const locale = collection.name.slice('pages_'.length);
      for (const file of collection.files.filter(item => !item.name.startsWith('labels_'))) {
        window.CMS.registerPreviewTemplate(file.name, function PagePreview({ entry, fields, widgetFor, getAsset }) {
          const data = entry.get('data').toJS();
          const sectionFields = fields.find(field => field.get('name') === 'sections').get('fields');
          const extraFields = fields.find(field => field.get('name') === 'extraSections').get('fields');
          const extras = (data.extraSections || []).map((section, index) => ({ ...section, index }));
          const at = anchor => extras.filter(section => (section.after === 'start' ? '' : section.after || '') === anchor).map(section => h('section', { key: section.id || `extra-${section.index}` },
            section.pending && h('p', { className: 'pending-label' }, pendingLabels[locale]),
            h('h2', {}, section.title || 'Neuer Abschnitt'),
            h('div', { className: 'preview-body' }, widgetFor('body', extraFields, entry.getIn(['data', 'extraSections', section.index]))),
            h('div', { className: `preview-gallery gallery-grid ${(section.images || []).length === 1 ? 'is-single' : ''}` }, ...(section.images || []).map((image, index) => h('figure', { key: image.id || index },
              image.src && h('img', { src: getAsset(image.src).toString(), alt: image.alt || image.caption || '' }),
              image.caption && h('figcaption', { dir: 'auto' }, image.caption),
            ))),
          ));
          return h('article', { className: 'page-preview', dir: locale === 'ar' ? 'rtl' : 'ltr', lang: locale },
            h('header', {}, h('p', { className: 'eyebrow' }, data.title), h('h1', {}, data.heading), h('p', { className: 'intro' }, data.intro)),
            ...at(''),
            ...Object.entries(data.sections || {}).flatMap(([key, section]) => [h('section', { key },
              section.pending && h('p', { className: 'pending-label' }, pendingLabels[locale]),
              h('h2', {}, section.title),
              h('div', { className: 'preview-body' }, widgetFor('body', sectionFields.find(field => field.get('name') === key).get('fields'), entry.getIn(['data', 'sections', key]))),
            ), ...at(key)]),
          );
        });
      }
    }
    const galleries = result.config.collections.find(item => item.name === 'galleries');
    for (const file of galleries?.files || []) {
      const sections = file.fields.find(field => field.name === 'sections').fields;
      window.CMS.registerPreviewTemplate(file.name, function GalleryPreview({ entry, getAsset }) {
        const data = entry.get('data').toJS();
        const populated = sections.filter(section => data.sections?.[section.name]?.images?.length);
        return h('article', { className: 'page-preview', lang: 'de', dir: 'ltr' },
          h('header', {}, h('p', { className: 'eyebrow' }, 'Zusätzliche Bilder'), h('h1', {}, file.label), h('p', { className: 'intro' }, 'Diese Bilder erscheinen in allen vier Sprachen. Die Vorschau zeigt die deutschen Bildunterschriften.')),
          ...populated.map(section => {
            const gallery = data.sections[section.name];
            return h('section', { key: section.name },
              h('h2', {}, section.label),
              h('p', { className: 'gallery-position' }, gallery.position === 'before' ? 'Vor dem Text' : 'Am Ende des Abschnitts'),
              h('div', { className: `preview-gallery gallery-${gallery.layout || 'grid'} ${gallery.images.length === 1 ? 'is-single' : ''}` },
                ...gallery.images.map((image, index) => h('figure', { key: index },
                  image.src ? h('img', { src: getAsset(image.src).toString(), alt: image.alt?.de || image.caption?.de || image.name || '' }) : h('p', {}, 'Bilddatei auswählen'),
                  image.caption?.de && h('figcaption', { dir: 'auto' }, image.caption.de),
                )),
              ),
            );
          }),
          !populated.length && h('p', { className: 'intro' }, 'Links einen Abschnitt öffnen und „Bild hinzufügen“ anklicken.'),
        );
      });
    }
    window.CMS.init({ config: result.config });
    status.hidden = true;
    // Language is detected from the text itself; the editor controls remain German.
    const direction = () => document.querySelectorAll('input[type="text"], textarea, [contenteditable="true"]').forEach(element => {
      if (element.getAttribute('dir') !== 'auto') element.setAttribute('dir', 'auto');
    });
    new MutationObserver(direction).observe(document.body, { childList: true, subtree: true });
    direction();
  } catch {
    status.hidden = false;
    message.textContent = 'Der Bearbeitungsbereich konnte nicht geladen werden. Bitte laden Sie die Seite neu oder versuchen Sie es später erneut.';
  }
})();
