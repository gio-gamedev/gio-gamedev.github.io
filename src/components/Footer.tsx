import { monthYear } from '../content/dates';
import { profile } from '../content/profile';
import { buildYear } from '../content/stats';
import type { Lang } from '../content/types';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import styles from './Footer.module.css';

const buildDay = __BUILD_DATE__.slice(0, 10);

/** Formatted by hand, not with Intl, so the prerendered HTML and the browser always agree. */
function dayLabel(lang: Lang) {
  const [year, month, day] = buildDay.split('-');
  if (lang === 'pt') return `${day}/${month}/${year}`;
  return monthYear(`${year}-${month}`, 'en').replace(' ', ` ${Number(day)}, `);
}

export function Footer() {
  const { lang, t } = useLang();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {buildYear} {profile.name}
        </p>
        <p>
          <time dateTime={buildDay}>{t(ui.footer.updated)(dayLabel(lang))}</time> · {t(ui.footer.built)}
        </p>
      </div>
    </footer>
  );
}
