import { useState } from 'react';
import { fullDate, monthYear } from '../content/dates';
import {
  academicProjects,
  certificates,
  education,
  efset,
  languageList,
  otherCertificates,
  type Scan,
} from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Lightbox } from './Lightbox';
import { Section } from './Section';
import styles from './Education.module.css';

const scanUrl = (file: string) => `${import.meta.env.BASE_URL}certificados/${file}.webp`;

type Open = { scan: Scan; title: string; alt: string; details: string[] };

/**
 * Degrees with course, institution and period (the diploma, with its administrative dates, opens in
 * a dialog); selected certificates, with the EF SET scores as text; the rest collapsed.
 */
export function Education({ index }: { index: string }) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState<Open | null>(null);

  return (
    <Section id="education" index={index} title={t(ui.sections.education)}>
      <div className={styles.grid}>
        {/* Both columns: a label, then the content, so their top edges line up. */}
        <div>
          <h3 className={styles.cardTitle}>{t(ui.labels.education)}</h3>
          <div className={styles.card}>
            <ul className={styles.degrees}>
              {education.map((item) => (
                <li key={item.institution} className={styles.degree}>
                  <p className={styles.degreeTitle}>{t(item.degree)}</p>
                  <p className={styles.institution}>{item.institution}</p>
                  <p className={styles.period}>
                    <time dateTime={item.start}>{monthYear(item.start, lang)}</time> –{' '}
                    <time dateTime={item.end}>{monthYear(item.end, lang)}</time>
                    {item.note && ` · ${t(item.note)}`}
                  </p>
                  {item.scan && (
                    <button
                      type="button"
                      className={styles.diploma}
                      aria-haspopup="dialog"
                      onClick={() =>
                        setOpen({
                          scan: item.scan!,
                          title: `${t(ui.labels.viewDiploma)} — ${t(item.degree)}`,
                          alt: `${t(item.degree)} — ${item.institution} (${t(ui.labels.birthDateHidden)})`,
                          details: [
                            ...(item.conferral ? [`${t(ui.labels.conferral)}: ${fullDate(item.conferral, lang)}`] : []),
                            ...(item.diploma ? [`${t(ui.labels.diploma)}: ${fullDate(item.diploma, lang)}`] : []),
                          ],
                        })
                      }
                    >
                      <Icon name="image" size={16} />
                      {t(ui.labels.viewDiploma)}
                      <span className="sr-only"> — {t(item.degree)}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <h4 className={`${styles.cardTitle} ${styles.spaced}`}>{t(ui.labels.languages)}</h4>
            <ul className={styles.languages}>
              {languageList.map((item) => (
                <li key={item.code}>
                  <strong>{t(item.name)}:</strong> {t(item.level)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className={styles.cardTitle}>{t(ui.labels.certificates)}</h3>
          <ul className={styles.certs}>
            <li className={styles.efsetItem}>
              <article className={styles.efset} aria-labelledby="efset-title">
                <div className={styles.efsetHead}>
                  <p id="efset-title" className={styles.efsetName}>
                    {t(efset.name)}
                  </p>
                  <p className={styles.certMeta}>
                    {efset.issuer} · {t(ui.labels.issued)} <time dateTime={efset.iso}>{t(efset.date)}</time>
                  </p>
                </div>
                <dl className={styles.scores}>
                  <div className={styles.overall}>
                    <dt>{t(ui.labels.overall)}</dt>
                    <dd>
                      <strong>{efset.score}</strong> {efset.level}
                    </dd>
                  </div>
                  {efset.sections.map((section) => (
                    <div key={section.score}>
                      <dt>{t(section.name)}</dt>
                      <dd>
                        <strong>{section.score}</strong> {section.level}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className={styles.scope}>{t(efset.scope)}</p>
                <p className={styles.efsetLinks}>
                  <a href={efset.pdf} type="application/pdf" target="_blank" rel="noreferrer">
                    <Icon name="download" size={16} />
                    {t(ui.labels.certificatePdf)}
                    <span className="sr-only"> {t(ui.a11y.newTab)}</span>
                  </a>
                  <a href={efset.verify} target="_blank" rel="noreferrer">
                    <Icon name="external" size={15} />
                    {t(ui.labels.verify)}
                    <span className="sr-only"> {t(ui.a11y.newTab)}</span>
                  </a>
                </p>
              </article>
            </li>
            {certificates.map((c) => (
              <li key={c.image}>
                <button
                  type="button"
                  className={styles.cert}
                  aria-haspopup="dialog"
                  onClick={() => setOpen({ scan: c, title: t(c.name), alt: `${t(c.name)} — ${c.issuer}, ${t(c.date)}`, details: [] })}
                >
                  <span className={styles.thumb}>
                    <img
                      src={scanUrl(`${c.image}-480`)}
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
        <summary>{t(academicProjects.title)}</summary>
        <div className="disclosure-body">
          <ul className={styles.academic}>
            {academicProjects.items.map((item) => (
              <li key={item.name}>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.name}
                  </a>
                ) : (
                  <span className={styles.academicName}>{item.name}</span>
                )}
                {item.start && item.end && (
                  <span className={styles.academicDate}>
                    {' '}
                    (<time dateTime={item.start}>{monthYear(item.start, lang)}</time> –{' '}
                    <time dateTime={item.end}>{monthYear(item.end, lang)}</time>)
                  </span>
                )}
                <span className={styles.academicNote}> — {t(item.note)}</span>
              </li>
            ))}
          </ul>
          <ul className={styles.academicLinks}>
            {academicProjects.links.map((link) => (
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

      <Lightbox open={open !== null} title={open?.title ?? ''} closeLabel={t(ui.labels.close)} onClose={() => setOpen(null)}>
        {open && (
          <>
            <img src={scanUrl(open.scan.image)} alt={open.alt} width={open.scan.size.width} height={open.scan.size.height} />
            {open.details.length > 0 && <p className={styles.scanDetails}>{open.details.join(' · ')}</p>}
          </>
        )}
      </Lightbox>
    </Section>
  );
}
