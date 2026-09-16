import { useEffect, useRef, useState } from 'react';
import { profile } from '../content/profile';
import type { Lang } from '../content/types';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../i18n/routes';
import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';
import styles from './Header.module.css';

// A short bar: the four sections recruiters jump to, plus the resume, the language and the theme.
// Recognition and education follow in the page, one scroll below.
const links = [
  ['projects', ui.nav.projects],
  ['experience', ui.nav.experience],
  ['skills', ui.nav.skills],
  ['contact', ui.nav.contact],
] as const;

// The visible code ("PT") stays in the accessible name so voice control can target it.
const langs: { code: Lang; hrefLang: string; label: string }[] = [
  { code: 'pt', hrefLang: 'pt-BR', label: 'PT – Português' },
  { code: 'en', hrefLang: 'en', label: 'EN – English' },
];

export function Header() {
  const { lang, page, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // The language links carry the current search, filter and section (?p=…&q=…#…), so switching
  // language keeps the reader's place. Empty in the prerendered HTML; filled after hydration.
  const [suffix, setSuffix] = useState('');
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // On other pages the section links lead back to the home page.
  const home = pagePath(lang, 'home');
  const anchor = (id: string) => (page === 'home' ? `#${id}` : `${home}#${id}`);

  // "urlchange" is sent by the catalog when its filters change the URL.
  useEffect(() => {
    const update = () => setSuffix(`${location.search}${location.hash}`);
    update();
    const events = ['hashchange', 'popstate', 'urlchange'];
    events.forEach((name) => window.addEventListener(name, update));
    return () => events.forEach((name) => window.removeEventListener(name, update));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mark the nav link of the section crossing the middle of the viewport.
  useEffect(() => {
    if (page !== 'home') return;
    const targets = ['top', ...links.map(([id]) => id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [page]);

  // Mobile menu: focus moves into it on open; Escape returns focus to the button; a tap outside closes it.
  useEffect(() => {
    if (!open) return;
    navRef.current?.querySelector('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  const current = (id: string) =>
    (page === 'home' && active === id) || (page === 'projects' && id === 'projects') ? 'location' : undefined;

  return (
    <header ref={headerRef} className={styles.header} data-solid={scrolled || open || undefined}>
      <div className={`container ${styles.inner}`}>
        {/* The name first: a recruiter should know whose portfolio this is without scrolling. */}
        <a href={page === 'home' ? '#top' : home} className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.brandName}>{profile.shortName}</span>
          <span className={styles.brandText}>Game QA</span>
        </a>

        <nav
          id="site-nav"
          ref={navRef}
          className={styles.nav}
          data-open={open || undefined}
          aria-label={t(ui.a11y.mainNav)}
        >
          <ul>
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={anchor(id)} aria-current={current(id)} onClick={() => setOpen(false)}>
                  {t(label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <nav className={styles.lang} aria-label={t(ui.a11y.language)}>
            {langs.map((l) => (
              <a
                key={l.code}
                href={`${pagePath(l.code, page)}${suffix}`}
                hrefLang={l.hrefLang}
                lang={l.hrefLang}
                aria-label={l.label}
                aria-current={lang === l.code ? 'page' : undefined}
              >
                {l.code.toUpperCase()}
              </a>
            ))}
          </nav>
          <ThemeToggle />
          <a
            className={styles.resume}
            href={t(profile.cv)}
            download={t(profile.cv).split('/').pop()}
            aria-label={t(ui.header.resumeLabel)}
          >
            <Icon name="download" size={16} />
            <span className={styles.resumeText}>{t(ui.header.resume)}</span>
          </a>
          <button
            ref={menuButtonRef}
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
