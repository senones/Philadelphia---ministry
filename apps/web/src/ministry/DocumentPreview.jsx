import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import { ui } from './content';
import { useLocale } from './LocaleContext';
import ContentImage from './ContentImage';

export default function DocumentPreview({ document, title }) {
  const { t } = useLocale();
  const pdf = document.type === 'pdf';
  const label = t(pdf ? ui.originalPdf : ui.originalDocument);
  return <ContentImage src={document.preview} alt={`${pdf ? t(ui.previewFirstPage) : t(ui.missionLetterAlt)}: ${title}`} loading="lazy" width={pdf ? 495 : 1080} height={pdf ? 700 : 714}>
    {picture => (pdf || picture) && <div className="document-preview-wrapper">
    <article className={`document-preview-card ${pdf ? 'is-pdf' : 'is-image'}`}>
      <a className="document-thumbnail" href={document.url} target="_blank" rel="noopener noreferrer" aria-label={`${label}: ${title}`}>
        {picture || <div className="document-preview-fallback"><FileText size={42} strokeWidth={1.2} aria-hidden="true" /><span>{t(ui.previewUnavailable)}</span></div>}
      </a>
      <div className="document-card-details">
        <span className="eyebrow">{pdf ? t(ui.previewFirstPage) : t(ui.imageDocument)}</span>
        <h3>{title}</h3>
        {pdf && <p className="document-page-count">PDF · {document.pages} {t(ui.pageCount)}</p>}
        <a className="button button-secondary" href={document.url} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </article>
    <p className="document-language-note">{t(ui.originalDocumentNote)}</p>
  </div>}
  </ContentImage>;
}
