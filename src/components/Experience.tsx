import { monthYear, present } from '../content/dates';
import { experience, experienceIntro, type Job } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Rich } from './Rich';
import { Section } from './Section';
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

/**
 * The Game QA roles, each one with its dates, company and bullets that open with what they are
 * about, so the list can be scanned. Earlier technology roles stay collapsed underneath; the tools
 * and skills have their own section right after this one.
 */
export function Experience() {
  const { t } = useLang();
  const main = experience.filter((group) => !group.compact);
  const earlier = experience.filter((group) => group.compact);

  return (
    <Section id="experience" title={t(ui.sections.experience)} subtitle={t(experienceIntro)}>
      <div className={styles.layout}>
        <div>
          {main.map((group) => (
            <div key={group.title.en}>
              <ol className={styles.timeline}>
                {group.jobs.map((job) => (
                  <li key={`${job.company}-${job.start}`} className={styles.job}>
                    <p className={styles.period}>
                      <Period job={job} />
                    </p>
                    <h3 className={styles.role}>
                      {t(job.role)} <span className={styles.company}>— {job.company}</span>
                    </h3>
                    {job.scope && <p className={styles.scope}>{t(job.scope)}</p>}
                    <ul className={styles.bullets}>
                      {t(job.bullets).map((b) => (
                        <li key={b}>
                          <Rich text={b} />
                        </li>
                      ))}
                    </ul>
                    {job.note && <p className={styles.note}>{t(job.note)}</p>}

                    {/* Platforms only: the tools of these roles are listed once, in the QA toolkit. */}
                    {job.platforms && (
                      <p className={styles.meta}>
                        <span className={styles.metaLabel}>{t(ui.labels.platforms)}</span>
                        {job.platforms}
                      </p>
                    )}
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
                          <h3 className={styles.compactRole}>
                            {t(job.role)} <span className={styles.company}>— {job.company}</span>
                          </h3>
                          <p className={styles.compactText}>{t(job.bullets).join('; ').replace(/\*\*/g, '')}</p>
                          {job.tools && <p className={styles.compactTools}>{job.tools}</p>}
                        </div>
                      </li>
                    ))}
                  </ol>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
