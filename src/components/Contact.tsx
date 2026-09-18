import { useEffect, useState } from 'react';
import { contactFacts, profile } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Abbr } from './Abbr';
import { Icon } from './Icon';
import styles from './Contact.module.css';

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // The Clipboard API needs a secure context and permission; fall back to a hidden textarea.
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
}

/** Ways to get in touch on the left; the facts recruiters filter on and the resume files on the right. */
export function Contact() {
  const { t } = useLang();
  const { links } = profile;
  const [copied, setCopied] = useState(false);
  const cv = t(profile.cv);
  const cvHref = encodeURI(cv);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.panel}>
          <div>
            <h2 id="contact-title" className={styles.title}>
              {t(ui.contact.title)}
            </h2>
            <p className={styles.text}>{t(ui.contact.text)}</p>

            <div className={styles.actions}>
              <a className="btn btn-primary" href={`mailto:${links.email}`}>
                <Icon name="mail" />
                {links.email}
              </a>
              <a className="btn btn-ghost" href={links.linkedin} target="_blank" rel="noopener noreferrer">
                <Icon name="linkedin" />
                LinkedIn
                <span className="sr-only"> {t(ui.a11y.newTab)}</span>
              </a>
              {/* Discord has no public profile URL for usernames, so the button copies it. */}
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => copyText(links.discord).then(() => setCopied(true))}
                aria-label={`${t(copied ? ui.contact.discordCopied : ui.contact.copyDiscord)}: ${links.discord}`}
              >
                <Icon name={copied ? 'check' : 'discord'} />
                Discord: {links.discord}
              </button>
            </div>
          </div>

          <div className={styles.side}>
            <dl className={styles.facts}>
              {contactFacts.map((fact) => (
                <div key={fact.label.en}>
                  <dt>{t(fact.label)}</dt>
                  <dd>
                    <Abbr text={t(fact.value)} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className={styles.resumeLabel}>{t(ui.contact.resume)}</p>
            <div className={styles.downloads}>
              <a className="btn btn-ghost" href={cvHref} download={cv.split('/').pop()}>
                <Icon name="download" />
                {t(ui.resume.pdf)}
              </a>
              <a className="btn btn-ghost" href={cvHref} target="_blank" rel="noopener noreferrer" aria-label={t(ui.resume.viewLabel)}>
                <Icon name="external" />
                {t(ui.resume.view)}
              </a>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {copied ? t(ui.contact.discordCopied) : ''}
          </p>
        </div>
      </div>
    </section>
  );
}
