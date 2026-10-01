import structure from './content/structure.json';
import settings from './content/site.json';
import media from './content/assets.json';
import documentData from './content/documents.json';
import { buildContent } from './content-model';

const pageFiles = import.meta.glob('./content/pages/*.json', { eager: true, import: 'default' });
const labelFiles = import.meta.glob('./content/ui/*.json', { eager: true, import: 'default' });
const galleryFiles = import.meta.glob('./content/galleries/*.json', { eager: true, import: 'default' });
const keyedFiles = files => Object.fromEntries(Object.entries(files).map(([path, data]) => [path.split('/').pop().replace(/\.json$/, ''), data]));

export const text = (de, en, el, ar) => ({ de, en, el, ar });
export const { languages, allPages, pages, legalPages, ui, site, assets, documents } = buildContent({
  structure,
  translations: keyedFiles(pageFiles),
  labels: keyedFiles(labelFiles),
  settings,
  media,
  documentData,
  galleries: keyedFiles(galleryFiles),
});
