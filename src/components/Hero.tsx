import { profile } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Abbr } from './Abbr';
import { Icon } from './Icon';
import { RecruiterSnapshot } from './RecruiterSnapshot';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useLang();
  const { links } = profile;
  const cv = t(profile.cv);
  const docx = t(profile.cvDocx);

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            {t(profile.openTo)}
          </p>
          <h1 id="hero-title" className={styles.name}>
            {profile.name}
          </h1>
          <p className={styles.headline}>
            <Abbr text={t(profile.headline)} />
          </p>

          <ul className={styles.proof}>
            {profile.proof.map((item) => (
              <li key={item.label.en}>
                <strong>{t(item.value)}</strong> {t(item.label)}
              </li>
            ))}
            <li>
              <a className={styles.award} href="#awards">
                <Icon name="trophy" size={16} />
                {t(ui.hero.award)}
              </a>
            </li>
          </ul>

          <div className={styles.ctas}>
            <a className="btn btn-primary" href={cv} download={cv.split('/').pop()}>
              <Icon name="download" />
              {t(ui.hero.resume)}
            </a>
            <a className="btn btn-ghost" href="#samples">
              {t(ui.hero.samples)}
              <Icon name="arrowRight" size={16} />
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
              <a href={docx} download={docx.split('/').pop()}>
                <Icon name="download" />
                {t(ui.hero.docx)}
              </a>
            </li>
          </ul>
        </div>

        <aside className={styles.side} aria-labelledby="snapshot-title">
          <RecruiterSnapshot />
        </aside>
      </div>
    </section>
  );
}
