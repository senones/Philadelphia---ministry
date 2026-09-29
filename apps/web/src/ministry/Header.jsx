import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Globe2, Menu, X } from 'lucide-react';
import { assets, languages, pages, site, ui } from './content';
import { useLocale } from './LocaleContext';

export default function Header() {
  const { t, locale, href, changeLanguage } = useLocale();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState('');
  const container = useRef(null);
  const trigger = useRef(null);
  const leaveTimer = useRef(null);
  const current = pages.find((page) => href(page.id) === location.pathname)?.id;
  const close = () => { clearTimeout(leaveTimer.current); setOpen(false); };

  useEffect(() => { setOpen(false); setExpanded(''); }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return undefined;
    const outside = (event) => { if (!container.current?.contains(event.target)) setOpen(false); };
    const keyboard = (event) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', keyboard);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', keyboard); };
  }, [open]);
  useEffect(() => () => clearTimeout(leaveTimer.current), []);
  const show = () => {
    clearTimeout(leaveTimer.current);
    setOpen(true);
    setExpanded((value) => value || current || 'home');
  };
  const delayedClose = () => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      if (!container.current?.contains(document.activeElement)) setOpen(false);
    }, 170);
  };
  return <header className="ministry-header">
    <div className="header-inner">
      <div ref={container} className="left-navigation"
        onPointerEnter={(event) => { if (event.pointerType === 'mouse') show(); }}
        onPointerLeave={(event) => { if (event.pointerType === 'mouse') delayedClose(); }}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }}>
        <button ref={trigger} type="button" className={`menu-trigger ${open ? 'is-open' : ''}`}
          aria-expanded={open} aria-controls="main-navigation"
          onClick={() => { if (open) close(); else show(); }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault(); show();
              requestAnimationFrame(() => container.current?.querySelector('.nav-main-link')?.focus());
            }
          }}>
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          <span>{t(ui.menu)}</span><ChevronDown size={15} className="trigger-chevron" aria-hidden="true" />
        </button>
        <nav id="main-navigation" className="navigation-panel" aria-label={t(ui.navigation)} hidden={!open}>
          <div className="navigation-heading"><span>{t(ui.overview)}</span><span>01 — 09</span></div>
          <ul className="navigation-list">
            {pages.map((page, index) => <li key={page.id} className={`nav-group ${expanded === page.id ? 'is-expanded' : ''}`}
              onPointerEnter={(event) => { if (event.pointerType === 'mouse') setExpanded(page.id); }}>
              <div className="nav-main-row">
                <Link className="nav-main-link" to={href(page.id)} onClick={close} aria-current={current === page.id ? 'page' : undefined}>
                  <span className="nav-number">{String(index + 1).padStart(2, '0')}</span><span>{t(page.title)}</span>
                </Link>
                <button type="button" className="nav-expand" aria-label={`${t(ui.sections)}: ${t(page.title)}`}
                  aria-expanded={expanded === page.id} aria-controls={`nav-${page.id}`}
                  onClick={() => setExpanded((value) => value === page.id ? '' : page.id)}>
                  <ChevronDown size={17} aria-hidden="true" />
                </button>
              </div>
              <ul className="nav-subsections" id={`nav-${page.id}`} hidden={expanded !== page.id}>
                {page.sections.map((section) => <li key={section.id}>
                  <Link to={href(section.target && page.id === 'legal' ? section.target : page.id, page.id === 'legal' ? undefined : section.id)} onClick={close}>
                    {t(section.title)}
                  </Link>
                </li>)}
              </ul>
            </li>)}
          </ul>
        </nav>
      </div>
      <Link className="ministry-brand" to={href('home')} aria-label={site.name}>
        <img src={assets.logo} alt="" width="44" height="50" /><span className="brand-wordmark"><strong>Philadelphia</strong><span>International Ministry</span></span>
      </Link>
      <div className="language-control"><Globe2 size={17} aria-hidden="true" />
        <label className="sr-only" htmlFor="site-language">{t(ui.language)}</label>
        <select id="site-language" value={locale} onChange={(event) => changeLanguage(event.target.value)}>
          {languages.map((language) => <option key={language.code} value={language.code} lang={language.code}>{language.label}</option>)}
        </select>
      </div>
    </div>
  </header>;
}
