import { profile } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useLang();
  const { links } = profile;

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.avatar}>
          <img src={profile.avatar} alt={profile.name} width={320} height={320} fetchPriority="high" />
        </div>

        <div className={styles.copy}>
          <div className={styles.badges}>
            <p className={styles.status}>
              <span className={styles.dot} aria-hidden="true" />
              {t(profile.openTo)}
            </p>
            <a className={styles.award} href="#awards">
              <Icon name="trophy" size={15} />
              {t(ui.hero.award)}
            </a>
          </div>

          <h1 id="hero-title" className={styles.name}>
            {profile.name}
          </h1>
          <p className={styles.role}>{t(profile.role)}</p>
          <p className={styles.availability}>
            <Icon name="pin" size={16} />
            {t(profile.availability)}
          </p>

          <ul className={styles.platforms}>
            {profile.platforms.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className={styles.ctas}>
            <a className="btn btn-primary" href="#projects">
              {t(ui.hero.viewProjects)}
            </a>
            <a className="btn btn-ghost" href={profile.resume} download="Giovanni-S-Mariano-Resume.pdf">
              <Icon name="download" />
              {t(ui.hero.resume)}
            </a>
          </div>
          <a className={styles.sampleLink} href="#sample-bug-report">
            {t(ui.hero.sampleLink)}
            <Icon name="arrowRight" size={16} />
          </a>

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

        <dl className={styles.stats}>
          {profile.stats.map((s) => (
            <div key={s.label.en} className={styles.stat}>
              <dt>{t(s.label)}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
