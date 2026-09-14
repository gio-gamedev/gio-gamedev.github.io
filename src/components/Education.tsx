import { certifications, education, gameDev, languages, type GameDevItem } from '../content/profile';
import type { L } from '../content/types';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Section } from './Section';
import styles from './Education.module.css';

const itemKey = (item: GameDevItem) => (typeof item.name === 'string' ? item.name : item.name.en);

export function Education({ index }: { index: string }) {
  const { t } = useLang();
  const text = (value: string | L) => (typeof value === 'string' ? value : t(value));

  return (
    <Section id="education" index={index} title={t(ui.sections.education)}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{t(ui.labels.education)}</h3>
          <ul className={styles.degrees}>
            {education.map((item) => (
              <li key={item.institution} className={styles.degree}>
                <span className={styles.period}>
                  <time dateTime={item.start}>{item.start}</time>–<time dateTime={item.end}>{item.end}</time>
                </span>
                <span className={styles.degreeTitle}>
                  {t(item.degree)} — {item.institution}
                </span>
              </li>
            ))}
          </ul>

          <h3 className={`${styles.cardTitle} ${styles.spaced}`}>{t(ui.labels.languages)}</h3>
          <p className={styles.languages}>{t(languages)}</p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{t(ui.labels.certifications)}</h3>
          <ul className={styles.certs}>
            {certifications.map((c) => (
              <li key={c.name.en}>{[t(c.name), c.issuer, c.year].filter(Boolean).join(' — ')}</li>
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
              <ul className={styles.gdList}>
                {group.items.map((item) => (
                  <li key={itemKey(item)}>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer">
                        {text(item.name)}
                      </a>
                    ) : (
                      <span className={styles.gdName}>{text(item.name)}</span>
                    )}
                    {item.note && <span className={styles.gdNote}> — {t(item.note)}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className={styles.gdLinks}>
            {gameDev.links.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                  <Icon name="external" size={13} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </Section>
  );
}
