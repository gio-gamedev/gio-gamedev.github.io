import { profile } from '../content/profile';
import { buildYear } from '../content/stats';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useLang();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {buildYear} {profile.name}
        </p>
        <p>{t(ui.footer.built)}</p>
      </div>
    </footer>
  );
}
