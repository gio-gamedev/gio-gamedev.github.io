import { monthYear, present } from '../content/dates';
import { experience, experienceIntro, type Job } from '../content/profile';
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

/** "2014–2021" for a group of past jobs. */
const yearRange = (jobs: Job[]) => {
  const years = jobs.flatMap((job) => [job.start, job.end ?? job.start]).map((iso) => iso.slice(0, 4)).sort();
  return `${years[0]}–${years[years.length - 1]}`;
};

/** Game QA roles in full, then the essential skills; earlier technology roles stay collapsed. */
export function Experience({ index }: { index: string }) {
  const { t } = useLang();
  const main = experience.filter((group) => !group.compact);
  const earlier = experience.filter((group) => group.compact);

  return (
    <Section id="experience" index={index} title={t(ui.sections.experience)} subtitle={t(experienceIntro)}>
      <div className={styles.groups}>
        {main.map((group) => (
          <div key={group.title.en}>
            <h3 className={styles.groupTitle}>{t(group.title)}</h3>
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
                    {job.note && <p className={styles.note}>{t(job.note)}</p>}

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

            {earlier.map((past) => (
              <details key={past.title.en} className={`disclosure ${styles.earlier}`}>
                <summary>{t(ui.experience.earlier)(yearRange(past.jobs))}</summary>
                <ol className={styles.compact}>
                  {past.jobs.map((job) => (
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
              </details>
            ))}
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
