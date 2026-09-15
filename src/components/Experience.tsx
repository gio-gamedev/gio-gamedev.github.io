import { monthYear, present } from '../content/dates';
import { experience, type Job } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Section } from './Section';
import { SkillList } from './Skills';
import styles from './Experience.module.css';

function Period({ job }: { job: Job }) {
  const { lang, t } = useLang();
  return (
    <>
      <time dateTime={job.start}>{monthYear(job.start, lang)}</time>
      {' – '}
      {job.end ? <time dateTime={job.end}>{monthYear(job.end, lang)}</time> : t(present)}
    </>
  );
}

/** Game QA roles in full; earlier technology roles as a compact list; skills at the end. */
export function Experience({ index }: { index: string }) {
  const { t } = useLang();

  return (
    <Section id="experience" index={index} title={t(ui.sections.experience)}>
      <div className={styles.groups}>
        {experience.map((group) => (
          <div key={group.title.en}>
            <h3 className={styles.groupTitle}>{t(group.title)}</h3>
            {group.compact ? (
              <ol className={styles.compact}>
                {group.jobs.map((job) => (
                  <li key={`${job.company}-${job.start}`} className={styles.compactItem}>
                    <p className={styles.period}>
                      <Period job={job} />
                    </p>
                    <div>
                      <h4 className={styles.compactRole}>
                        {t(job.role)} <span className={styles.company}>— {job.company}</span>
                      </h4>
                      <p className={styles.compactText}>{t(job.bullets).join('; ')}</p>
                      {job.tools && <p className={styles.compactTools}>{job.tools}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <ol className={styles.timeline}>
                {group.jobs.map((job) => (
                  <li key={`${job.company}-${job.start}`} className={styles.job}>
                    <p className={styles.period}>
                      <Period job={job} />
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

                      {job.highlight && (
                        <p className={styles.highlight}>
                          <strong>{t(job.highlight.stats)}</strong>
                        </p>
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
            )}
          </div>
        ))}

        <div>
          <h3 className={styles.groupTitle}>{t(ui.experience.skills)}</h3>
          <SkillList />
        </div>
      </div>
    </Section>
  );
}
