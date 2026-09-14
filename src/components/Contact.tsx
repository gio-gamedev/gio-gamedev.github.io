import { useEffect, useState } from 'react';
import { profile } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
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

export function Contact({ index }: { index: string }) {
  const { t } = useLang();
  const { links } = profile;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.panel}>
          <p className={styles.index} aria-hidden="true">
            {index} //
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
            {/* mailto: does nothing for people on webmail, so offer a copy too. */}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => copyText(links.email).then(() => setCopied(true))}
            >
              <Icon name={copied ? 'check' : 'copy'} />
              {t(copied ? ui.contact.copied : ui.contact.copy)}
            </button>
            <a className="btn btn-ghost" href={links.linkedin} target="_blank" rel="noreferrer">
              <Icon name="linkedin" />
              LinkedIn
            </a>
            <a className="btn btn-ghost" href={links.github} target="_blank" rel="noreferrer">
              <Icon name="github" />
              GitHub
            </a>
            <a className="btn btn-ghost" href={t(profile.cv)} download={t(profile.cv).split('/').pop()}>
              <Icon name="download" />
              {t(ui.hero.resume)}
            </a>
          </div>

          <p className={styles.availability}>
            <Icon name="pin" size={16} />
            {t(profile.availability)}
          </p>
          <p className="sr-only" aria-live="polite">
            {copied ? t(ui.contact.copied) : ''}
          </p>
        </div>
      </div>
    </section>
  );
}
