import { heroFacts, profile } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Abbr } from './Abbr';
import { Icon } from './Icon';
import styles from './Hero.module.css';

/** Name, title and a short summary; the headline numbers live only in the strip below. */
export function Hero() {
  const { t } = useLang();
  const { links } = profile;
  const cv = t(profile.cv);

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.role}>{t(profile.title)}</span>
            <span aria-hidden="true"> · </span>
            {t(profile.location)}
          </p>
          <h1 id="hero-title" className={styles.name}>
            {profile.name}
          </h1>
          <p className={styles.headline}>
            <Abbr text={t(profile.headline)} />
          </p>

          <div className={styles.ctas}>
            <a className="btn btn-primary" href="#projects">
              {t(ui.hero.projects)}
              <Icon name="arrowRight" size={16} />
            </a>
            <a className="btn btn-ghost" href={cv} download={cv.split('/').pop()} aria-label={t(ui.hero.resumeLabel)}>
              <Icon name="download" size={16} />
              {t(ui.hero.resume)}
            </a>
          </div>

          <ul className={styles.links}>
            <li>
              <a href={`mailto:${links.email}`}>
                <Icon name="mail" />
                {links.email}
              </a>
            </li>
            <li>
              <a href={links.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" />
                LinkedIn
              </a>
            </li>
            <li>
              <a href={links.github} target="_blank" rel="noreferrer">
                <Icon name="github" />
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.photo}>
          <img src={profile.avatar} alt={t(ui.hero.photo)} width={480} height={480} fetchPriority="high" />
        </div>
      </div>

      <div className="container">
        <ul className={styles.facts} aria-label={t(ui.hero.facts)}>
          {heroFacts.map((fact) => {
            const content = (
              <>
                <strong className={styles.factValue}>{fact.value}</strong>
                <span className={styles.factLabel}>{t(fact.label)}</span>
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
