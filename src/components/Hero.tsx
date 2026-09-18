import { heroFacts, heroSpecialties, profile } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Abbr } from './Abbr';
import { Icon } from './Icon';
import styles from './Hero.module.css';

/**
 * Editorial opening: the name is the largest thing on the page and the job title reads right under
 * it, then the summary, the areas of QA and the three actions. The photo is a small companion, not
 * the subject. The headline numbers live in the proof bar that closes the section.
 */
export function Hero() {
  const { t } = useLang();
  const { links } = profile;
  const cv = t(profile.cv);
  const cvHref = encodeURI(cv);

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.name}>{profile.name}</span>
            <span className={styles.role}>{t(profile.title)}</span>
          </h1>

          <p className={styles.headline}>
            <Abbr text={t(profile.headline)} />
          </p>
          <p className={styles.technical}>{t(profile.headlineTechnical)}</p>

          <ul className={styles.specialties} aria-label={t(ui.hero.specialties)}>
            {t(heroSpecialties).map((item) => (
              <li key={item}>
                <Abbr text={item} />
              </li>
            ))}
          </ul>

          <div className={styles.ctas}>
            <a className="btn btn-primary" href="#projects">
              {t(ui.hero.projects)}
              <Icon name="arrowRight" size={16} />
            </a>
            <a className="btn btn-ghost" href={cvHref} download={cv.split('/').pop()} aria-label={t(ui.hero.resumeLabel)}>
              <Icon name="download" size={16} />
              {t(ui.hero.resume)}
            </a>
            <a className={styles.linkedin} href={links.linkedin} target="_blank" rel="noopener noreferrer">
              <Icon name="linkedin" size={16} />
              LinkedIn
              <span className="sr-only"> {t(ui.a11y.newTab)}</span>
            </a>
          </div>

          <ul className={styles.links}>
            <li>
              <a href={`mailto:${links.email}`}>
                <Icon name="mail" size={16} />
                {links.email}
              </a>
            </li>
            <li className={styles.location}>
              <Icon name="pin" size={16} />
              {t(profile.location)}
            </li>
          </ul>
        </div>

        <div className={styles.photo}>
          <img
            src={profile.avatar}
            srcSet={profile.avatarSrcSet}
            sizes="(max-width: 860px) 150px, 200px"
            alt={t(ui.hero.photo)}
            width={480}
            height={480}
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Proof bar: the four facts a recruiter checks first, on one line. */}
      <div className="container">
        <ul className={styles.facts} aria-label={t(ui.hero.facts)}>
          {heroFacts.map((fact) => {
            const content = (
              <>
                <strong className={styles.factValue}>{fact.value}</strong>
                <span className={styles.factLabel}>{t(fact.label)}</span>
                {fact.hint && <span className={styles.factHint}>{t(fact.hint)}</span>}
              </>
            );
            return (
              <li key={fact.label.en}>
                {fact.href ? (
                  <a className={`${styles.fact} ${styles.factLink}`} href={fact.href}>
                    {content}
                  </a>
                ) : (
                  <div className={styles.fact}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
