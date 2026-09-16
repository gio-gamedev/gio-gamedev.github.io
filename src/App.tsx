import { useEffect, type ReactNode } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ui } from './content/ui';
import { useLang } from './i18n/LanguageContext';

/** The shell every page shares: skip link, header, the page itself and the footer. */
export function App({ children }: { children: ReactNode }) {
  const { t } = useLang();

  // Printing (or "Save as PDF") expands every collapsed section, then restores it.
  useEffect(() => {
    let expanded: HTMLDetailsElement[] = [];
    const expand = () => {
      expanded = [...document.querySelectorAll<HTMLDetailsElement>('details:not([open])')];
      expanded.forEach((d) => (d.open = true));
    };
    const restore = () => expanded.forEach((d) => (d.open = false));
    window.addEventListener('beforeprint', expand);
    window.addEventListener('afterprint', restore);
    return () => {
      window.removeEventListener('beforeprint', expand);
      window.removeEventListener('afterprint', restore);
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        {t(ui.a11y.skip)}
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
