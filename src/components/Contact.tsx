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
export function Contact({ index }: { index: string }) {
  const { t } = useLang();
  const { links } = profile;
  const [copied, setCopied] = useState(false);
  const cv = t(profile.cv);
  const docx = t(profile.cvDocx);

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
              <button type="button" className="btn btn-ghost" onClick={() => copyText(links.email).then(() => setCopied(true))}>
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
              <a className="btn btn-ghost" href={cv} download={cv.split('/').pop()}>
                <Icon name="download" />
                {t(ui.resume.pdf)}
              </a>
              <a className="btn btn-ghost" href={docx} download={docx.split('/').pop()}>
                <Icon name="download" />
                {t(ui.resume.docx)}
              </a>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {copied ? t(ui.contact.copied) : ''}
          </p>
        </div>
      </div>
    </section>
  );
}
