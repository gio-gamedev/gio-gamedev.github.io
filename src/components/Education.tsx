import { certifications, education, gameDev, languages } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Section } from './Section';
import { Tag } from './Tag';
import styles from './Education.module.css';

export function Education({ index }: { index: string }) {
  const { t } = useLang();

  return (
    <Section id="education" index={index} title={t(ui.sections.education)}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{t(ui.labels.education)}</h3>
          <ul className={styles.degrees}>
            {education.map((item) => (
              <li key={item.period} className={styles.degree}>
                <span className={styles.period}>{item.period}</span>
                <span className={styles.degreeTitle}>{t(item.title)}</span>
              </li>
            ))}
          </ul>

          <h3 className={`${styles.cardTitle} ${styles.spaced}`}>{t(ui.labels.languages)}</h3>
          <p className={styles.languages}>{t(languages)}</p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{t(ui.labels.certifications)}</h3>
          <ul className={styles.certs}>
            {t(certifications).map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <details className={`disclosure ${styles.gamedev}`}>
        <summary>{t(gameDev.title)}</summary>
        <div className="disclosure-body">
          <p>{t(gameDev.intro)}</p>
          {gameDev.groups.map((group) => (
            <div key={group.label.en} className={styles.gdGroup}>
              <p className={styles.gdLabel}>{t(group.label)}</p>
              <ul className={styles.gdItems}>
                {t(group.items).map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </Section>
  );
}
