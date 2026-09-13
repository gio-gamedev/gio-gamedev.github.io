import { profile } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useLang();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{t(ui.footer.built)}</p>
      </div>
    </footer>
  );
}
