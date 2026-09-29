import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, MapPin, Heart, Mail, ArrowRight } from 'lucide-react';
import { allPages, assets, documents, pages, site, ui } from './content';
import { useLocale } from './LocaleContext';
import Header from './Header';
import ContactForm from './ContactForm';
import DocumentPreview from './DocumentPreview';

function Footer() {
  const { t, href } = useLocale();
  return <footer className="ministry-footer"><div className="footer-main content-width">
    <div><span className="eyebrow">Philadelphia</span><h2>{site.name}</h2><p>{t(ui.footerText)}</p></div>
    <nav aria-label={t(ui.navigation)}><ul>{pages.slice(1, 8).map((page) => <li key={page.id}><Link to={href(page.id)}>{t(page.title)}</Link></li>)}</ul></nav>
  </div><div className="footer-bottom content-width"><span>© {new Date().getFullYear()} {site.name}</span><div><Link to={href('imprint')}>{t(allPages.find((p) => p.id === 'imprint').title)}</Link><Link to={href('privacy')}>{t(allPages.find((p) => p.id === 'privacy').title)}</Link></div></div></footer>;
}
function PageSection({ section, index, pageId }) {
  const { t, href } = useLocale();
  const projects = [
    { title: pages[3].title, image: assets.bayt, to: href('bayt') },
    { title: pages[2].sections[4].title, image: assets.language, to: href('work', 'sprachkurse') },
    { title: pages[5].sections[2].title, image: assets.camp, to: href('news', 'sommercamps') },
  ];
  return <section id={section.id} className={`content-section section-${section.kind || 'text'} ${section.image ? 'has-image' : ''}`}>
    <div className="section-heading"><span className="section-number">{String(index + 1).padStart(2, '0')}</span><div>
      {section.pending && <span className="pending-label">{t(ui.pending)}</span>}
      <h2>{t(section.title)}</h2>
    </div></div>
    <div className="section-body">
      <p className="section-description">{t(section.body)}</p>
      {section.image && <img className="section-image" src={assets[section.image]} alt={t(ui.imageAlt)} loading="lazy" width="1000" height="620" />}
      {section.kind === 'projects' && <div className="project-grid">{projects.map((project) => <Link to={project.to} className="project-card" key={project.to}>
        <img src={project.image} alt={t(ui.imageAlt)} loading="lazy" width="600" height="440" /><div><h3>{t(project.title)}</h3><ArrowUpRight size={20} aria-hidden="true" /></div><span>{t(ui.learn)}</span>
      </Link>)}</div>}
      {section.kind === 'gallery' && <>
        <figure className="mission-letter-figure"><a href={assets.missionLetter} target="_blank" rel="noopener noreferrer" aria-label={t(ui.fullSize)}><img src={assets.missionLetter} alt={t(ui.missionLetterAlt)} loading="lazy" width="1080" height="714" /></a><figcaption><span>{t(ui.missionLetter)}</span><a href={assets.missionLetter} target="_blank" rel="noopener noreferrer">{t(ui.fullSize)}<ArrowUpRight size={15} aria-hidden="true" /></a></figcaption></figure>
        <div className="image-gallery"><img src={assets.bayt} alt={t(ui.imageAlt)} loading="lazy" width="900" height="680" /><img src={assets.camp} alt={t(ui.imageAlt)} loading="lazy" width="700" height="680" /></div>
      </>}
      {section.kind === 'cta' && <div className="cta-panel"><Heart size={30} strokeWidth={1.4} aria-hidden="true" /><p>{t(ui.tagline)}</p><div className="button-row"><Link className="button button-primary" to={href('support')}>{t(ui.join)}<ArrowUpRight size={17} aria-hidden="true" /></Link><Link className="button button-secondary" to={href('work')}>{t(ui.learn)}</Link></div></div>}
      {section.document && <DocumentPreview document={documents[section.document]} title={section.document === 'letter' ? t(ui.missionLetter) : t(section.title)} />}
      {section.target && <Link className="text-link" to={href(section.target, section.targetSection)}>{t(pageId === 'support' && section.target === 'contact' ? ui.contact : ui.learn)}<ArrowRight size={16} aria-hidden="true" /></Link>}
      {section.kind === 'contact' && <><div className="contact-details">{site.email ? <a href={`mailto:${site.email}`} dir="ltr"><Mail size={17} aria-hidden="true" />{site.email}</a> : <p>{t(ui.emailPending)}</p>}{site.phone && <a href={`tel:${site.phone.replace(/\s/g, '')}`} dir="ltr">{site.phone}</a>}</div><ContactForm /></>}
      {section.kind === 'address' && <address className="address-block" dir="ltr"><MapPin size={22} aria-hidden="true" /><div>{site.address.map((line) => <div key={line}>{line}</div>)}</div></address>}
      {section.kind === 'map' && <a href={site.mapsUrl} className="button button-secondary" target="_blank" rel="noopener noreferrer"><MapPin size={17} aria-hidden="true" />{t(ui.maps)}<ArrowUpRight size={17} aria-hidden="true" /></a>}
      {section.kind === 'social' && (site.socialLinks.length ? <div className="button-row">{site.socialLinks.map((social) => <a className="button button-secondary" key={social.url} href={social.url} target="_blank" rel="noopener noreferrer">{social.name}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</div> : <p className="muted">{t(ui.socialPending)}</p>)}
      {section.kind === 'donations' && (site.donationUrl ? <a className="button button-primary" href={site.donationUrl} target="_blank" rel="noopener noreferrer">{t(ui.donate)}<Heart size={16} aria-hidden="true" /></a> : <p className="muted">{t(ui.donatePending)}</p>)}
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
  const intro = <div className="hero-content"><span className="eyebrow">{isHome ? site.name : t(page.title)}</span><h1>{t(page.heading)}</h1><p>{t(page.intro)}</p>{isHome && <div className="button-row"><Link className="button button-primary" to={href('about')}>{t(ui.learn)}<ArrowUpRight size={17} aria-hidden="true" /></Link><Link className="button button-light" to={href('support')}>{t(ui.join)}</Link></div>}</div>;
  return <>
    <Helmet><html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} /><title>{t(page.title)} | {site.name}</title><meta name="description" content={t(page.intro)} /></Helmet>
    <a className="skip-link" href="#main-content">{t(ui.skip)}</a><Header />
    <main id="main-content">
      {isHome ? <section className="home-hero"><img className="hero-image" src={assets.hero} alt={t(ui.imageAlt)} fetchPriority="high" width="1920" height="1100" /><div className="hero-overlay" /><div className="content-width">{intro}</div><div className="hero-bottom content-width"><span>{t(ui.tagline)}</span><span>Philadelphia International Ministry</span></div></section> : <section className="page-hero content-width">{intro}<div className="page-mark" aria-hidden="true">{String(pages.findIndex((entry) => entry.id === page.id) + 1 || 9).padStart(2, '0')}</div></section>}
      <div className="content-width page-content"><nav className="section-index" aria-label={t(ui.pageSections)}><span className="eyebrow">{t(ui.pageSections)}</span><ul>{page.sections.map((section) => <li key={section.id}><Link to={href(page.id, section.id)}>{t(section.title)}</Link></li>)}</ul></nav><div className="sections">{page.sections.map((section, index) => <PageSection key={section.id} section={section} index={index} pageId={page.id} />)}</div></div>
    </main><Footer />
  </>;
}
