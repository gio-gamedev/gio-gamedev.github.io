import { monthYear, present } from '../content/dates';
import { experience } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Section } from './Section';
import styles from './Experience.module.css';

export function Experience({ index }: { index: string }) {
  const { lang, t } = useLang();

  return (
    <Section id="experience" index={index} title={t(ui.sections.experience)}>
      <div className={styles.groups}>
        {experience.map((group) => (
          <div key={group.title.en}>
            <h3 className={styles.groupTitle}>{t(group.title)}</h3>
            <ol className={styles.timeline}>
              {group.jobs.map((job) => (
                <li key={`${job.company}-${job.start}`} className={styles.job}>
                  <p className={styles.period}>
                    <time dateTime={job.start}>{monthYear(job.start, lang)}</time>
                    {' – '}
                    {job.end ? <time dateTime={job.end}>{monthYear(job.end, lang)}</time> : t(present)}
                  </p>
                  <div className={styles.card}>
                    <h4 className={styles.role}>
                      {t(job.role)} <span className={styles.company}>— {job.company}</span>
                    </h4>
                    <ul className={styles.bullets}>
                      {t(job.bullets).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>

                    {job.more && (
                      <details className={`disclosure ${styles.more}`}>
                        <summary>{t(ui.experience.more)(t(job.more).length)}</summary>
                        <ul className={`${styles.bullets} ${styles.moreList}`}>
                          {t(job.more).map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </details>
                    )}

                    {job.highlight && (
                      <div className={styles.highlight}>
                        <strong>{t(job.highlight.stats)}</strong>
                        {job.highlight.note && <span>{t(job.highlight.note)}</span>}
                      </div>
                    )}

                    {(job.platforms || job.tools) && (
                      <dl className={styles.meta}>
                        {job.platforms && (
                          <div>
                            <dt>{t(ui.labels.platforms)}</dt>
                            <dd>{job.platforms}</dd>
                          </div>
                        )}
                        {job.tools && (
                          <div>
                            <dt>{t(ui.labels.tools)}</dt>
                            <dd>{job.tools}</dd>
                          </div>
                        )}
                      </dl>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  );
}
