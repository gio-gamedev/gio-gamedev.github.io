import { profile } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useLang();
  const { links } = profile;

  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            {t(profile.openTo)}
          </p>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.role}>{t(profile.role)}</p>

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
            <li>
              <span>
                <Icon name="pin" />
                {t(profile.location)}
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.side}>
          <div className={styles.avatarFrame}>
            <img src={profile.avatar} alt={profile.name} width={320} height={320} />
          </div>
          <dl className={styles.stats}>
            {profile.stats.map((s) => (
              <div key={s.value} className={styles.stat}>
                <dt>{t(s.label)}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
