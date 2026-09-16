import { brandGroups } from '../content/projects';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import styles from './BrandStrip.module.css';

/**
 * IPs and brands that appear in the titles tested, listed apart from the partners those games were
 * published through. Plain text (no third-party logos), and a line saying what the list means, so
 * nothing reads as a direct contract with each company.
 */
export function BrandStrip() {
  const { t } = useLang();

  return (
    <section className={styles.strip} aria-labelledby="brands-title">
      <h3 id="brands-title" className={styles.title}>
        {t(ui.projects.brands)}
      </h3>
      <p className={styles.note}>{t(ui.projects.brandsNote)}</p>

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
