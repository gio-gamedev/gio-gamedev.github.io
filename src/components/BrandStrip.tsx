import { brands } from '../content/projects';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import styles from './BrandStrip.module.css';

/** Licensed brands and IPs from the project list, as plain text (no third-party logos). */
export function BrandStrip() {
  const { t } = useLang();

  return (
    <div className={styles.strip}>
      <h3 className={styles.title}>{t(ui.projects.brands)}</h3>
      <ul className={styles.list}>
        {brands.map((brand) => (
          <li key={brand}>{brand}</li>
        ))}
      </ul>
    </div>
  );
}
