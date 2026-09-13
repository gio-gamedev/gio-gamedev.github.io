import { profile } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import styles from './Contact.module.css';

export function Contact() {
  const { t } = useLang();
  const { links } = profile;

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.panel}>
          <p className={styles.index} aria-hidden="true">
            08 //
          </p>
          <h2 id="contact-title" className={styles.title}>
            {t(ui.contact.title)}
          </h2>
          <p className={styles.text}>{t(ui.contact.text)}</p>

          <div className={styles.actions}>
            <a className="btn btn-primary" href={`mailto:${links.email}`}>
              <Icon name="mail" />
              {links.email}
            </a>
            <a className="btn btn-ghost" href={links.linkedin} target="_blank" rel="noreferrer">
              <Icon name="linkedin" />
              LinkedIn
            </a>
            <a className="btn btn-ghost" href={links.github} target="_blank" rel="noreferrer">
              <Icon name="github" />
              GitHub
            </a>
            <a className="btn btn-ghost" href={profile.resume} download="Giovanni-S-Mariano-Resume.pdf">
              <Icon name="download" />
              {t(ui.hero.resume)}
            </a>
          </div>

          <p className={styles.location}>
            <Icon name="pin" size={16} />
            {t(profile.location)}
          </p>
        </div>
      </div>
    </section>
  );
}
