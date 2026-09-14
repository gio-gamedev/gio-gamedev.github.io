import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import styles from './ThemeToggle.module.css';

const themeColor = { light: '#f6f5fb', dark: '#0f0e17' };

/**
 * index.html sets data-theme before first paint (saved choice, else the system setting).
 * Both icons are rendered and CSS shows the right one, so prerendered HTML and hydration match.
 */
export function ThemeToggle() {
  const { t } = useLang();

  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor[next]);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be blocked (private mode); the choice then lasts for this visit only.
    }
  };

  return (
    <button type="button" className={styles.toggle} onClick={toggle} aria-label={t(ui.a11y.theme)}>
      <span className={styles.toLight}>
        <Icon name="sun" size={18} />
      </span>
      <span className={styles.toDark}>
        <Icon name="moon" size={18} />
      </span>
    </button>
  );
}
