import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { profile } from '../content/profile';
import type { Lang } from '../content/types';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { langPath } from '../i18n/routes';
import { Icon } from './Icon';
import styles from './Header.module.css';

const links = [
  ['projects', ui.nav.projects],
  ['samples', ui.nav.samples],
  ['experience', ui.nav.experience],
  ['approach', ui.nav.approach],
  ['expertise', ui.nav.expertise],
  ['contact', ui.nav.contact],
] as const;

// The visible code ("PT") stays in the accessible name so voice control can target it.
const langs: { code: Lang; hrefLang: string; label: string }[] = [
  { code: 'pt', hrefLang: 'pt-BR', label: 'PT – Português' },
  { code: 'en', hrefLang: 'en', label: 'EN – English' },
];

// Keep the reader's place when switching language.
function keepHash(e: MouseEvent<HTMLAnchorElement>) {
  if (!location.hash) return;
  e.preventDefault();
  location.href = `${e.currentTarget.getAttribute('href')}${location.hash}`;
}

export function Header() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mark the nav link of the section crossing the middle of the viewport.
  useEffect(() => {
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
  }, []);

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

  return (
    <header ref={headerRef} className={styles.header} data-solid={scrolled || open || undefined}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.brandMark}>GSM</span>
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
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                >
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
                href={langPath[l.code]}
                hrefLang={l.hrefLang}
                lang={l.hrefLang}
                aria-label={l.label}
                aria-current={lang === l.code ? 'page' : undefined}
                onClick={keepHash}
              >
                {l.code.toUpperCase()}
              </a>
            ))}
          </nav>
          <a
            className={styles.resume}
            href={profile.resume}
            download="Giovanni-S-Mariano-Resume.pdf"
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
