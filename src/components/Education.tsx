import { useState } from 'react';
import { fullDate, monthYear } from '../content/dates';
import {
  certificates,
  education,
  gameDev,
  languages,
  otherCertificates,
  type Certificate,
  type GameDevItem,
} from '../content/profile';
import type { L } from '../content/types';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Lightbox } from './Lightbox';
import { Section } from './Section';
import styles from './Education.module.css';

const itemKey = (item: GameDevItem) => (typeof item.name === 'string' ? item.name : item.name.en);
const certUrl = (file: string) => `${import.meta.env.BASE_URL}certificados/${file}.webp`;

/** Degrees with course, conferral and diploma dates kept apart; selected certificates open in a dialog. */
export function Education({ index }: { index: string }) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState<Certificate | null>(null);
  const text = (value: string | L) => (typeof value === 'string' ? value : t(value));
  const describe = (c: Certificate) =>
    `${t(c.name)} — ${c.issuer}, ${t(c.date)}${c.masked ? ` (${t(ui.labels.birthDateHidden)})` : ''}`;

  return (
    <Section id="education" index={index} title={t(ui.sections.education)}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{t(ui.labels.education)}</h3>
          <ul className={styles.degrees}>
            {education.map((item) => (
              <li key={item.institution} className={styles.degree}>
                <p className={styles.degreeTitle}>{t(item.degree)}</p>
                <p className={styles.institution}>{item.institution}</p>
                <dl className={styles.dates}>
                  <div>
                    <dt>{t(ui.labels.course)}</dt>
                    <dd>
                      <time dateTime={item.start}>{monthYear(item.start, lang)}</time> –{' '}
                      <time dateTime={item.end}>{monthYear(item.end, lang)}</time>
                    </dd>
                  </div>
                  {item.conferral && (
                    <div>
                      <dt>{t(ui.labels.conferral)}</dt>
                      <dd>
                        <time dateTime={item.conferral}>{fullDate(item.conferral, lang)}</time>
                      </dd>
                    </div>
                  )}
                  {item.diploma && (
                    <div>
                      <dt>{t(ui.labels.diploma)}</dt>
                      <dd>
                        <time dateTime={item.diploma}>{fullDate(item.diploma, lang)}</time>
                      </dd>
                    </div>
                  )}
                </dl>
                {item.note && <p className={styles.note}>{t(item.note)}</p>}
              </li>
            ))}
          </ul>

          <h3 className={`${styles.cardTitle} ${styles.spaced}`}>{t(ui.labels.languages)}</h3>
          <p className={styles.languages}>{t(languages)}</p>
        </div>

        <div>
          <h3 className={styles.cardTitle}>{t(ui.labels.certificates)}</h3>
          <ul className={styles.certs}>
            {certificates.map((c) => (
              <li key={c.image}>
                <button type="button" className={styles.cert} onClick={() => setOpen(c)} aria-haspopup="dialog">
                  <span className={styles.thumb}>
                    <img
                      src={certUrl(`${c.image}-480`)}
                      alt=""
                      width={c.thumb.width}
                      height={c.thumb.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className={styles.certName}>{t(c.name)}</span>
                  <span className={styles.certMeta}>
                    {c.issuer} · {t(c.date)}
                  </span>
                  <span className="sr-only"> — {t(ui.labels.enlarge)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <details className={`disclosure ${styles.more}`}>
        <summary>{t(ui.labels.otherCertificates)}</summary>
        <ul className={`disclosure-body ${styles.otherList}`}>
          {otherCertificates.map((item) => (
            <li key={item.en}>{t(item)}</li>
          ))}
        </ul>
      </details>

      <details className={`disclosure ${styles.more}`}>
        <summary>{t(gameDev.title)}</summary>
        <div className="disclosure-body">
          <p>{t(gameDev.intro)}</p>
          {gameDev.groups.map((group) => (
            <div key={group.label.en} className={styles.gdGroup}>
              <p className={styles.gdLabel}>{t(group.label)}</p>
              <ul className={styles.gdList}>
                {group.items.map((item) => (
                  <li key={itemKey(item)}>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer">
                        {text(item.name)}
                      </a>
                    ) : (
                      <span className={styles.gdName}>{text(item.name)}</span>
                    )}
                    {item.note && <span className={styles.gdNote}> — {t(item.note)}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className={styles.gdLinks}>
            {gameDev.links.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                  <Icon name="external" size={13} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <Lightbox open={open !== null} title={open ? t(open.name) : ''} closeLabel={t(ui.labels.close)} onClose={() => setOpen(null)}>
        {open && <img src={certUrl(open.image)} alt={describe(open)} width={open.size.width} height={open.size.height} />}
      </Lightbox>
    </Section>
  );
}
