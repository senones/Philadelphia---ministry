import React, { createContext, useContext, useLayoutEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { allPages, languages } from './content';

const LocaleContext = createContext(null);
export function getSavedLanguage() {
  try {
    const saved = localStorage.getItem('philadelphia-language');
    return languages.some((item) => item.code === saved) ? saved : 'de';
  } catch { return 'de'; }
}
export function LocaleProvider({ children }) {
  const { locale: routeLocale } = useParams();
  const locale = languages.some((item) => item.code === routeLocale) ? routeLocale : 'de';
  const location = useLocation();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('philadelphia-language', locale); } catch { /* Browsing without storage still works. */ }
  }, [locale]);
  const href = (pageId, sectionId) => {
    const page = allPages.find((entry) => entry.id === pageId);
    const base = page?.path === '/' ? '' : page?.path || '';
    return `/${locale}${base}${sectionId ? `#${sectionId}` : ''}`;
  };
  const changeLanguage = (nextLocale) => {
    if (!languages.some((item) => item.code === nextLocale)) return;
    const base = location.pathname.replace(/^\/(de|en|el|ar)(?=\/|$)/, '');
    navigate(`/${nextLocale}${base === '/' ? '' : base}${location.search}${location.hash}`);
  };
  return <LocaleContext.Provider value={{ locale, t: (value) => value[locale], href, changeLanguage }}>{children}</LocaleContext.Provider>;
}
export function useLocale() { return useContext(LocaleContext); }
