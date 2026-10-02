import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const content = 'apps/web/src/ministry/content/';
const read = async path => JSON.parse(await readFile(new URL(path, root), 'utf8'));
const structure = await read(`${content}structure.json`);
const ui = await read(`${content}ui/de.json`);
const labelNames = {
  menu: 'Menü', navigation: 'Seitennavigation', overview: 'Alle Seiten', close: 'Menü schließen', sections: 'Unterpunkte',
  language: 'Sprachauswahl', skip: 'Zum Inhalt', learn: 'Mehr erfahren', join: 'Mitmachen', contact: 'Kontakt aufnehmen',
  pending: 'Hinweis für unfertige Inhalte', pageSections: 'Abschnittsübersicht', tagline: 'Leitgedanke', footerText: 'Text im Fußbereich',
  imageAlt: 'Bildbeschreibung', originalDocument: 'Dokument öffnen', originalPdf: 'PDF öffnen', previewFirstPage: 'PDF-Vorschau',
  pageCount: 'Seitenzahl', imageDocument: 'Bilddokument', previewUnavailable: 'Vorschau fehlt', missionLetter: 'Missionsbrief: Titel',
  missionLetterAlt: 'Missionsbrief: Bildbeschreibung', fullSize: 'Bild in voller Größe', originalDocumentNote: 'Sprache der Dokumente',
  documents: 'Berichte und Dokumente', maps: 'Anfahrt öffnen', socialPending: 'Social Media: Platzhalter', emailPending: 'Kontakt: Platzhalter',
  donatePending: 'Spenden: Platzhalter', donate: 'Spenden', name: 'Name', email: 'E-Mail', message: 'Nachricht', send: 'Senden',
  sending: 'Versand läuft', formChecking: 'Formular wird geladen', formPending: 'Formular nicht verfügbar', rateLimit: 'Zu viele Versuche',
  sent: 'Versand erfolgreich', error: 'Versand fehlgeschlagen', notFound: 'Seite nicht gefunden', backHome: 'Zur Startseite',
};
const field = (name, label, widget = 'string', extra = {}) => ({ name, label, widget, ...extra });
const image = (name, label, optional = false) => field(name, label, 'image', {
  required: !optional, choose_url: false,
  hint: `JPG, PNG oder WebP hochladen. Das Bild wird nach der Veröffentlichung auf der Website verwendet.${optional ? ' Das Feld darf leer bleiben, um dieses Bild auszublenden.' : ''}`,
});
const url = (name, label, optional = false) => field(name, label, 'string', {
  required: !optional, pattern: [optional ? '^(https://[^\\s]+)?$' : '^https://[^\\s]+$', 'Bitte einen vollständigen HTTPS-Link eintragen.'],
});
const locales = { de: 'Deutsch', en: 'Englisch', el: 'Griechisch', ar: 'Arabisch' };
const translatedOptional = (name, label, hint) => field(name, label, 'object', {
  collapsed: true, required: false, hint,
  default: Object.fromEntries(Object.keys(locales).map(locale => [locale, ''])),
  fields: Object.entries(locales).map(([locale, label]) => field(locale, label, 'text', { required: false, default: '' })),
});
const collections = [];
const automatic = () => field('syncTranslations', 'Änderungen in alle Sprachen übersetzen', 'boolean', {
  default: true, required: false,
  hint: 'Beim Veröffentlichen werden geänderte Texte automatisch übersetzt. Ausschalten, um nur diese Sprachfassung zu korrigieren. Neue Abschnitte, ihre Position und Bilder werden immer für alle Sprachen angelegt.',
});
const markdown = (name = 'body', label = 'Text', extra = {}) => field(name, label, 'markdown', {
  buttons: ['bold', 'italic', 'link', 'bulleted-list', 'numbered-list', 'quote'],
  editor_components: [], modes: ['rich_text', 'raw'],
  hint: 'Hier den Text schreiben. Fett, Listen und Links sind möglich.',
  ...extra,
});
for (const [locale, label] of Object.entries(locales)) {
  const files = [];
  for (const page of structure.pages) {
    const german = await read(`${content}pages/${page.id}.de.json`);
    files.push({
      name: `${page.id}_${locale}`, label: german.title,
      file: `${content}pages/${page.id}.${locale}.json`,
      preview_path: `${locale}${page.path === '/' ? '' : page.path}`,
      fields: [
        automatic(),
        field('title', 'Name im Menü'),
        field('heading', 'Große Überschrift'),
        field('intro', 'Einleitung', 'text'),
        field('sections', 'Abschnitte', 'object', {
          fields: page.sections.map(section => field(section.id, german.sections[section.id].title, 'object', {
            collapsed: true,
            fields: [
              field('title', 'Überschrift'),
              markdown(),
              field('pending', 'Noch nicht fertig', 'boolean', { default: false, hint: 'Ausschalten, sobald dieser Text freigegeben ist. Der Hinweis „Inhalte folgen“ verschwindet dann in dieser Sprache.' }),
            ],
          })),
        }),
        field('extraSections', 'Neue Abschnitte', 'list', {
          required: false, default: [], collapsed: true, label_singular: 'Abschnitt',
          summary: '{{fields.title}}', allow_add: true, allow_remove: true, allow_reorder: true,
          hint: 'Abschnitt hinzufügen, Überschrift und Text schreiben und veröffentlichen. Mit „Position“ bestimmen Sie die Stelle auf der Seite. Abschnitte an derselben Stelle lassen sich durch Ziehen sortieren. Entfernen löscht diesen neuen Abschnitt in allen Sprachen.',
          fields: [
            field('id', 'Abschnitt-ID', 'hidden', { required: false, default: '' }),
            field('untranslated', 'Übersetzung fehlt', 'hidden', { required: false, default: false }),
            field('after', 'Position auf der Seite', 'select', {
              default: page.sections.at(-1).id,
              options: [{ label: 'Vor dem ersten Abschnitt', value: 'start' }, ...page.sections.map(section => ({ label: `Nach: ${german.sections[section.id].title}`, value: section.id }))],
            }),
            field('title', 'Überschrift', 'string', { required: false, hint: 'Neue Abschnitte brauchen eine Überschrift und einen Text. Noch fehlende Sprachfassungen können später ausgefüllt werden.' }), markdown('body', 'Text', { required: false }),
            field('pending', 'Noch nicht fertig', 'boolean', { default: false }),
            field('images', 'Bilder im neuen Abschnitt', 'list', {
              required: false, default: [], collapsed: true, label_singular: 'Bild', summary: '{{fields.caption}}',
              fields: [
                field('id', 'Bild-ID', 'hidden', { required: false, default: '' }),
                image('src', 'Bilddatei'),
                field('caption', 'Bildunterschrift', 'string', { required: false, default: '' }),
                field('alt', 'Bildbeschreibung', 'string', { required: false, default: '', hint: 'Kurz beschreiben, was auf dem Bild zu sehen ist. Wird ebenfalls automatisch übersetzt.' }),
              ],
            }),
          ],
        }),
      ],
    });
  }
  files.push({
    name: `labels_${locale}`, label: 'Beschriftungen & Hinweise', file: `${content}ui/${locale}.json`,
    editor: { preview: false },
    fields: [automatic(), ...Object.keys(ui).filter(key => key !== 'syncTranslations').map(key => field(key, labelNames[key] || key, ['footerText', 'originalDocumentNote', 'sent', 'error'].includes(key) ? 'text' : 'string'))],
  });
  collections.push({ name: `pages_${locale}`, label: `Seitentexte · ${label}`, format: 'json', files, description: 'Seite auswählen, Texte bearbeiten oder neue Abschnitte hinzufügen. Bei eingeschalteter Übersetzung werden Änderungen beim Veröffentlichen in Deutsch, Englisch, Griechisch und Arabisch übernommen.' });
}
collections.push({
  name: 'settings', label: 'Kontaktdaten', format: 'json', editor: { preview: false },
  files: [{ name: 'site', label: 'Adresse, Kontakt & Links', file: `${content}site.json`, fields: [
    field('name', 'Name des Ministries'),
    field('address', 'Adresse', 'list', { min: 1, field: field('line', 'Adresszeile'), hint: 'Jede Zeile einzeln eintragen.' }),
    field('email', 'Öffentlich sichtbare E-Mail-Adresse', 'string', { required: false, pattern: ['^([^\\s@]+@[^\\s@]+\\.[^\\s@]+)?$', 'Bitte eine gültige E-Mail-Adresse eintragen.'], hint: 'Der Empfänger des Kontaktformulars bleibt separat im Server hinterlegt.' }),
    field('phone', 'Telefonnummer', 'string', { required: false, pattern: ['^[+0-9 ()/.-]*$', 'Bitte nur Ziffern und übliche Telefonzeichen verwenden.'] }),
    url('mapsUrl', 'Google Maps / Anfahrt'), url('donationUrl', 'Spendenlink', true),
    field('socialLinks', 'Social-Media-Links', 'list', { required: false, default: [], summary: '{{fields.name}}', fields: [field('name', 'Name, z. B. Instagram'), url('url', 'Link')] }),
  ] }],
});
const assets = await read(`${content}assets.json`);
const imageLabels = { logo: 'Logo', hero: 'Großes Bild auf der Startseite', bayt: 'Haus Philadelphia', camp: 'Camps', language: 'Sprachkurse', missionLetter: 'Missionsbrief „Komm und sieh!“' };
collections.push({ name: 'images', label: 'Feste Website-Bilder', format: 'json', editor: { preview: false }, files: [
  { name: 'assets', label: 'Bilder der Website', file: `${content}assets.json`, fields: Object.keys(assets).map(key => image(key, imageLabels[key], true)) },
] });
const galleryFiles = [];
for (const page of structure.pages) {
  const german = await read(`${content}pages/${page.id}.de.json`);
  galleryFiles.push({
    name: `gallery_${page.id}`, label: german.title,
    file: `${content}galleries/${page.id}.json`,
    preview_path: `de${page.path === '/' ? '' : page.path}`,
    fields: [automatic(), field('sections', 'Abschnitt auswählen', 'object', {
      fields: page.sections.map(section => field(section.id, german.sections[section.id].title, 'object', {
        collapsed: true,
        fields: [
          field('position', 'Position der zusätzlichen Bilder', 'select', {
            default: 'after', options: [{ label: 'Vor dem Text', value: 'before' }, { label: 'Am Ende des Abschnitts', value: 'after' }],
          }),
          field('layout', 'Darstellung', 'select', {
            default: 'grid', options: [{ label: 'Galerie: zwei Bilder nebeneinander', value: 'grid' }, { label: 'Große Bilder untereinander', value: 'full' }],
            hint: 'Auf dem Handy werden die Bilder immer untereinander angezeigt. Ein einzelnes Bild erscheint groß.',
          }),
          field('images', 'Bilder', 'list', {
            required: false, default: [], collapsed: true, label_singular: 'Bild', summary: '{{fields.name}}',
            allow_add: true, allow_remove: true, allow_reorder: true,
            hint: 'Bild hinzufügen, Datei hochladen oder ein vorhandenes Bild auswählen. Die Reihenfolge durch Ziehen am Griff mit den zwei Strichen ändern. Bilder werden in allen vier Sprachen angezeigt.',
            fields: [
              field('name', 'Bezeichnung im Editor', 'string', { default: 'Neues Bild', hint: 'Dient nur zur Übersicht, z. B. Teamfoto. Wird nicht auf der Website angezeigt.' }),
              image('src', 'Bilddatei'),
              translatedOptional('caption', 'Bildunterschrift je Sprache', 'Einen Sprachtext ändern: Die anderen drei werden automatisch übersetzt. Wenn mehrere Sprachtexte gleichzeitig geändert werden, bleiben sie wie eingegeben. Nur ausgefüllte Bildunterschriften erscheinen auf der Website.'),
              translatedOptional('alt', 'Bildbeschreibung je Sprache', 'Beschreibe kurz, was auf dem Bild zu sehen ist. Hilft Menschen, die einen Screenreader verwenden. Ohne Beschreibung wird die Bildunterschrift oder der allgemeine Bildtext verwendet.'),
            ],
          }),
        ],
      })),
    })],
  });
}
collections.push({
  name: 'galleries', label: 'Zusätzliche Bilder', format: 'json', files: galleryFiles,
  description: 'Seite und Abschnitt auswählen, zusätzliche Bilder hochladen, anordnen und veröffentlichen. Die Vorschau zeigt die zusätzlichen Bilder mit deutschen Bildunterschriften.',
});
const documents = await read(`${content}documents.json`);
collections.push({ name: 'documents', label: 'PDF-Dokumente', format: 'json', editor: { preview: false }, files: [
  { name: 'documents', label: 'Berichte & PDF-Vorschauen', file: `${content}documents.json`, fields: [
    ...['maluk', 'sunday', 'camp'].map(key => field(key, { maluk: 'Maluk', sunday: 'Sunday', camp: 'Sommercamp' }[key], 'object', { fields: [
      field('url', 'PDF-Datei', 'file', { media_folder: '/apps/web/public/documents', public_folder: '/documents', choose_url: false, hint: 'Hier eine PDF-Datei auswählen. Andere Dateiformate werden beim Veröffentlichen der Website zurückgewiesen.' }),
      { ...image('preview', 'Vorschau der ersten Seite', true), media_folder: '/apps/web/public/document-previews', public_folder: '/document-previews' },
      field('pages', 'Anzahl der Seiten', 'number', { value_type: 'int', min: 1, max: 10000 }),
      field('type', 'Dateityp', 'hidden', { default: 'pdf' }),
      field('sourceUrl', 'Originalquelle', 'hidden', { default: documents[key].sourceUrl }),
    ] })),
    field('letter', 'Missionsbrief', 'hidden', { default: documents.letter }),
  ] },
] });
const schema = {
  locale: 'de', logo_url: '/media/logo.png', display_url: undefined,
  load_config_file: false,
  media_folder: 'apps/web/public/media', public_folder: '/media',
  publish: true,
  slug: { encoding: 'ascii', clean_accents: true, sanitize_replacement: '-' },
  collections,
};
await writeFile(new URL('apps/web/public/admin/collections.json', root), `${JSON.stringify(schema, null, 2)}\n`);
console.log('CMS schema: four languages, 11 pages each, contact details, fixed images, section galleries and PDFs.');
