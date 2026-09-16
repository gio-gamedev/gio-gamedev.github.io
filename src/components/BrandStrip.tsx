import { brandGroups } from '../content/projects';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Section } from './Section';
import styles from './BrandStrip.module.css';

/** The first brands shown before "View more" (see the comment on brandGroups[0].items). */
const VISIBLE = 7;

/**
 * Brands and IPs present in the products tested, listed apart from the platforms and channels those
 * games were published through. Plain text, no third-party logos. Only the brand group is trimmed —
 * the platform group is short enough to show in full.
 */
export function BrandStrip() {
  const { t } = useLang();

  return (
    <Section id="brands" title={t(ui.projects.brands)}>
      {brandGroups.map((group, i) => {
        const rest = i === 0 ? group.items.slice(VISIBLE) : [];
        return (
          <div key={group.title.en} className={styles.group}>
            <p className={styles.groupTitle}>{t(group.title)}</p>
            <ul className={styles.list}>
              {(i === 0 ? group.items.slice(0, VISIBLE) : group.items).map((brand) => (
                <li key={brand}>{brand}</li>
              ))}
            </ul>
            {rest.length > 0 && (
              <details className={`disclosure ${styles.more}`}>
                <summary>{t(ui.projects.moreBrands)(rest.length)}</summary>
                <ul className={styles.list}>
                  {rest.map((brand) => (
                    <li key={brand}>{brand}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        );
      })}
    </Section>
  );
}
