import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { languages } from '@/ministry/content';
import { getSavedLanguage, LocaleProvider } from '@/ministry/LocaleContext';
import MinistryPage from '@/ministry/MinistryPage';
import ScrollToTop from '@/components/ScrollToTop';
import '@/ministry/ministry.css';

function LegacyRedirect() {
  const location = useLocation();
  const first = location.pathname.split('/')[1];
  const locale = getSavedLanguage();
  if (languages.some((language) => language.code === first)) return <LocaleProvider><MinistryPage /></LocaleProvider>;
  const path = location.pathname === '/' ? '' : location.pathname;
  return <Navigate to={`/${locale}${path}${location.search}${location.hash}`} replace />;
}
export default function App() {
  return <BrowserRouter><ScrollToTop /><Routes>
    <Route path="/:locale/*" element={<LegacyRedirect />} />
    <Route path="/" element={<LegacyRedirect />} />
  </Routes></BrowserRouter>;
}
