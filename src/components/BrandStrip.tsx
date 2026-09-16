import { brandGroups } from '../content/projects';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import styles from './BrandStrip.module.css';

/**
 * Brands and IPs present in the products tested, listed apart from the platforms and channels those
 * games were published through. Plain text, no third-party logos.
 */
export function BrandStrip() {
  const { t } = useLang();

  return (
    <section className={styles.strip} aria-labelledby="brands-title">
      <h3 id="brands-title" className={styles.title}>
        {t(ui.projects.brands)}
      </h3>

      {brandGroups.map((group) => (
        <div key={group.title.en} className={styles.group}>
          <p className={styles.groupTitle}>{t(group.title)}</p>
          <ul className={styles.list}>
            {group.items.map((brand) => (
              <li key={brand}>{brand}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
