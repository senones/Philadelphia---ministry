import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, MapPin, Heart, Mail, ArrowRight } from 'lucide-react';
import { allPages, assets, documents, pages, site, ui } from './content';
import { useLocale } from './LocaleContext';
import Header from './Header';
import ContactForm from './ContactForm';
import DocumentPreview from './DocumentPreview';
import ContentImage from './ContentImage';

const markdownComponents = { img: ContentImage };

function Footer() {
  const { t, href } = useLocale();
  return <footer className="ministry-footer"><div className="footer-main content-width">
    <div><span className="eyebrow">Philadelphia</span><h2>{site.name}</h2><p>{t(ui.footerText)}</p></div>
    <nav aria-label={t(ui.navigation)}><ul>{pages.slice(1, 8).map((page) => <li key={page.id}><Link to={href(page.id)}>{t(page.title)}</Link></li>)}</ul></nav>
  </div><div className="footer-bottom content-width"><span>© {new Date().getFullYear()} {site.name}</span><div><Link to={href('imprint')}>{t(allPages.find((p) => p.id === 'imprint').title)}</Link><Link to={href('privacy')}>{t(allPages.find((p) => p.id === 'privacy').title)}</Link></div></div></footer>;
}
function AdditionalImages({ gallery }) {
  const { t } = useLocale();
  if (!gallery.images.length) return null;
  return <div className={`additional-gallery gallery-${gallery.layout} ${gallery.images.length === 1 ? 'is-single' : ''}`}>
    {gallery.images.map((image, index) => {
      const caption = t(image.caption);
      const description = t(image.alt) || caption || t(ui.imageAlt);
      return <ContentImage key={`${image.src}-${index}`} src={image.src} alt={description} loading="lazy" decoding="async">
        {picture => picture && <figure>
          <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`${t(ui.fullSize)}: ${description}`}>{picture}</a>
          {caption && <figcaption>{caption}</figcaption>}
        </figure>}
      </ContentImage>;
    })}
  </div>;
}
function PageSection({ section, pageId }) {
  const { t, href } = useLocale();
  const projects = [
    { title: pages.find(page => page.id === 'bayt').title, image: assets.bayt, to: href('bayt') },
    { title: pages.find(page => page.id === 'work').sections.find(section => section.id === 'sprachkurse').title, image: assets.language, to: href('work', 'sprachkurse') },
    { title: pages.find(page => page.id === 'news').sections.find(section => section.id === 'sommercamps').title, image: assets.camp, to: href('news', 'sommercamps') },
  ];
  return <section id={section.id} className={`content-section section-${section.kind || 'text'} ${section.image ? 'has-image' : ''}`}>
    <div className="section-heading"><div>
      {t(section.pending) && <span className="pending-label">{t(ui.pending)}</span>}
      <h2>{t(section.title)}</h2>
    </div></div>
    <div className="section-body">
      {section.gallery.position === 'before' && <AdditionalImages gallery={section.gallery} />}
      <div className="section-description"><ReactMarkdown skipHtml components={markdownComponents}>{t(section.body)}</ReactMarkdown></div>
      {section.image && <ContentImage className="section-image" src={assets[section.image]} alt={t(ui.imageAlt)} loading="lazy" width="1000" height="620" />}
      {section.kind === 'projects' && <div className="project-grid">{projects.map((project) => <ContentImage key={project.to} src={project.image} alt={t(ui.imageAlt)} loading="lazy" width="600" height="440">
        {picture => <Link to={project.to} className={`project-card${picture ? '' : ' is-text-only'}`}>
          {picture}<div><h3>{t(project.title)}</h3><ArrowUpRight size={20} aria-hidden="true" /></div><span>{t(ui.learn)}</span>
        </Link>}
      </ContentImage>)}</div>}
      {section.kind === 'gallery' && <>
        <ContentImage src={assets.missionLetter} alt={t(ui.missionLetterAlt)} loading="lazy" width="1080" height="714">
          {picture => picture && <figure className="mission-letter-figure"><a href={assets.missionLetter} target="_blank" rel="noopener noreferrer" aria-label={t(ui.fullSize)}>{picture}</a><figcaption><span>{t(ui.missionLetter)}</span><a href={assets.missionLetter} target="_blank" rel="noopener noreferrer">{t(ui.fullSize)}<ArrowUpRight size={15} aria-hidden="true" /></a></figcaption></figure>}
        </ContentImage>
        <div className="image-gallery"><ContentImage src={assets.bayt} alt={t(ui.imageAlt)} loading="lazy" width="900" height="680" /><ContentImage src={assets.camp} alt={t(ui.imageAlt)} loading="lazy" width="700" height="680" /></div>
      </>}
      {section.kind === 'cta' && <div className="cta-panel"><Heart size={30} strokeWidth={1.4} aria-hidden="true" /><p>{t(ui.tagline)}</p><div className="button-row"><Link className="button button-primary" to={href('support')}>{t(ui.join)}<ArrowUpRight size={17} aria-hidden="true" /></Link><Link className="button button-secondary" to={href('work')}>{t(ui.learn)}</Link></div></div>}
      {section.document && <DocumentPreview document={documents[section.document]} title={section.document === 'letter' ? t(ui.missionLetter) : t(section.title)} />}
      {section.target && <Link className="text-link" to={href(section.target, section.targetSection)}>{t(pageId === 'support' && section.target === 'contact' ? ui.contact : ui.learn)}<ArrowRight size={16} aria-hidden="true" /></Link>}
      {section.kind === 'contact' && <><div className="contact-details">{site.email ? <a href={`mailto:${site.email}`} dir="ltr"><Mail size={17} aria-hidden="true" />{site.email}</a> : <p>{t(ui.emailPending)}</p>}{site.phone && <a href={`tel:${site.phone.replace(/\s/g, '')}`} dir="ltr">{site.phone}</a>}</div><ContactForm /></>}
      {section.kind === 'address' && <address className="address-block" dir="ltr"><MapPin size={22} aria-hidden="true" /><div>{site.address.map((line) => <div key={line}>{line}</div>)}</div></address>}
      {section.kind === 'map' && <a href={site.mapsUrl} className="button button-secondary" target="_blank" rel="noopener noreferrer"><MapPin size={17} aria-hidden="true" />{t(ui.maps)}<ArrowUpRight size={17} aria-hidden="true" /></a>}
      {section.kind === 'social' && (site.socialLinks.length ? <div className="button-row">{site.socialLinks.map((social) => <a className="button button-secondary" key={social.url} href={social.url} target="_blank" rel="noopener noreferrer">{social.name}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</div> : <p className="muted">{t(ui.socialPending)}</p>)}
      {section.kind === 'donations' && (site.donationUrl ? <a className="button button-primary" href={site.donationUrl} target="_blank" rel="noopener noreferrer">{t(ui.donate)}<Heart size={16} aria-hidden="true" /></a> : <p className="muted">{t(ui.donatePending)}</p>)}
      {section.gallery.position === 'after' && <AdditionalImages gallery={section.gallery} />}
    </div>
  </section>;
}
export default function MinistryPage() {
  const { t, locale, href } = useLocale();
  const { pathname } = useLocation();
  const base = pathname.replace(/^\/(de|en|el|ar)(?=\/|$)/, '').replace(/\/$/, '') || '/';
  const page = allPages.find((entry) => entry.path === base);
  if (!page) return <><Helmet><html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} /><title>{t(ui.notFound)} | Philadelphia</title><meta name="robots" content="noindex" /></Helmet><Header /><main id="main-content" className="not-found content-width"><span className="eyebrow">404</span><h1>{t(ui.notFound)}</h1><Link className="button button-primary" to={href('home')}>{t(ui.backHome)}</Link></main><Footer /></>;
  const isHome = page.id === 'home';
  const visibleSections = page.sections.filter(section => section.available?.[locale] !== false);
  const intro = <div className="hero-content"><span className="eyebrow">{isHome ? site.name : t(page.title)}</span><h1>{t(page.heading)}</h1><p>{t(page.intro)}</p>{isHome && <div className="button-row"><Link className="button button-primary" to={href('about')}>{t(ui.learn)}<ArrowUpRight size={17} aria-hidden="true" /></Link><Link className="button button-light" to={href('support')}>{t(ui.join)}</Link></div>}</div>;
  return <>
    <Helmet><html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} /><title>{t(page.title)} | {site.name}</title><meta name="description" content={t(page.intro)} /></Helmet>
    <a className="skip-link" href="#main-content">{t(ui.skip)}</a><Header />
    <main id="main-content">
      {isHome ? <section className="home-hero"><ContentImage className="hero-image" src={assets.hero} alt={t(ui.imageAlt)} fetchPriority="high" width="1920" height="1100" /><div className="hero-overlay" /><div className="content-width">{intro}</div><div className="hero-bottom content-width"><span>{t(ui.tagline)}</span><span>Philadelphia International Ministry</span></div></section> : <section className="page-hero content-width">{intro}</section>}
      <div className="content-width page-content"><nav className="section-index" aria-label={t(ui.pageSections)}><span className="eyebrow">{t(ui.pageSections)}</span><ul>{visibleSections.map((section) => <li key={section.id}><Link to={href(page.id, section.id)}>{t(section.title)}</Link></li>)}</ul></nav><div className="sections">{visibleSections.map((section) => <PageSection key={section.id} section={section} pageId={page.id} />)}</div></div>
    </main><Footer />
  </>;
}
