import { useEffect, useState } from 'react';
import { ui } from '../content/ui';
import type { Lang } from '../content/types';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import styles from './Header.module.css';

const links = [
  ['about', ui.nav.about],
  ['projects', ui.nav.projects],
  ['experience', ui.nav.experience],
  ['samples', ui.nav.samples],
  ['expertise', ui.nav.expertise],
  ['contact', ui.nav.contact],
] as const;

const langs: Lang[] = ['pt', 'en'];

export function Header() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={styles.header} data-solid={scrolled || open || undefined}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.brandMark}>GSM</span>
          <span className={styles.brandText}>Game QA</span>
        </a>

        <nav id="site-nav" className={styles.nav} data-open={open || undefined} aria-label={t(ui.a11y.mainNav)}>
          <ul>
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)}>
                  {t(label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.lang} role="group" aria-label={t(ui.a11y.language)}>
            {langs.map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} lang={l} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
            <span className="sr-only">{t(ui.a11y.menu)}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
