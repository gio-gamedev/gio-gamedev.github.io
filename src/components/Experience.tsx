import { earlierExperience, experience } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Section } from './Section';
import styles from './Experience.module.css';

export function Experience() {
  const { t } = useLang();

  return (
    <Section id="experience" index="03" title={t(ui.sections.experience)}>
      <div className={styles.groups}>
        {experience.map((group, gi) => (
          <div key={gi}>
            <h3 className={styles.groupTitle}>{t(group.title)}</h3>
            <ol className={styles.timeline}>
              {group.jobs.map((job) => (
                <li key={job.company} className={styles.job}>
                  <p className={styles.period}>{t(job.period)}</p>
                  <div className={styles.card}>
                    <h4 className={styles.role}>
                      {t(job.role)} <span className={styles.company}>— {job.company}</span>
                    </h4>
                    <ul className={styles.bullets}>
                      {t(job.bullets).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>

                    {job.highlight && (
                      <div className={styles.highlight}>
                        <strong>{t(job.highlight.stats)}</strong>
                        <span>{t(job.highlight.note)}</span>
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

        <details className={`disclosure ${styles.earlier}`}>
          <summary>{t(earlierExperience.title)}</summary>
          <p className="disclosure-body">{t(earlierExperience.text)}</p>
        </details>
      </div>
    </Section>
  );
}
