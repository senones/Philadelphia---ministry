import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  useLayoutEffect(() => {
    // Wait for the destination page and the language direction to be committed.
    const frame = requestAnimationFrame(() => {
      let anchor = hash.slice(1);
      try { anchor = decodeURIComponent(anchor); } catch { /* Leave malformed hashes untouched. */ }
      const target = anchor && document.getElementById(anchor);
      if (target) {
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  return null;
}
export { ScrollToTop };
