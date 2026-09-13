import { expertise } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Section } from './Section';
import { Tag } from './Tag';
import styles from './Expertise.module.css';

export function Expertise() {
  const { t } = useLang();

  return (
    <Section id="expertise" index="05" title={t(ui.sections.expertise)}>
      <ul className={styles.grid}>
        {expertise.map((group, i) => (
          <li key={i} className={styles.card}>
            <p className={styles.num} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className={styles.title}>{t(group.title)}</h3>
            <ul className={styles.items}>
              {t(group.items).map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
