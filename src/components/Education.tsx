import { useState } from 'react';
import { fullDate, monthYear } from '../content/dates';
import {
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
 * Three compact columns: degrees, languages (with the EF SET result and its certificate) and the
 * selected certificates. Everything else stays collapsed: this section carries less weight than the
 * projects and the experience above it.
 */
export function Education() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState<Open | null>(null);

  return (
    <Section id="education" title={t(ui.sections.education)}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <h3 className={styles.colTitle}>{t(ui.labels.education)}</h3>
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
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>{t(ui.labels.languages)}</h3>
          <ul className={styles.languages}>
            {languageList.map((item) => (
              <li key={item.code}>
                <strong>{t(item.name)}</strong> — {t(item.level)}
              </li>
            ))}
          </ul>

          {/* The certificate itself: the level first, each score next to the skill it belongs to. */}
          <article className={styles.efset} aria-labelledby="efset-title">
            <p id="efset-title" className={styles.efsetName}>
              {t(efset.name)}
            </p>
            <p className={styles.certMeta}>
              {efset.issuer} · {t(ui.labels.issued)} <time dateTime={efset.iso}>{t(efset.date)}</time>
            </p>
            <details className={`disclosure ${styles.efsetDetails}`}>
              <summary>{t(ui.labels.certificateDetails)}</summary>
              <dl className={`disclosure-body ${styles.scores}`}>
                <div>
                  <dt>{t(ui.labels.overall)}</dt>
                  <dd>
                    <strong>{efset.level}</strong>
                    <span className={styles.scoreValue}>{efset.score}</span>
                  </dd>
                </div>
                {efset.sections.map((section) => (
                  <div key={section.score}>
                    <dt>{t(section.name)}</dt>
                    <dd>
                      <strong>{section.level}</strong>
                      <span className={styles.scoreValue}>{section.score}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </details>
            <p className={styles.efsetLinks}>
              <a href={efset.pdf} type="application/pdf" target="_blank" rel="noopener noreferrer">
                <Icon name="download" size={16} />
                {t(ui.labels.certificatePdf)}
                <span className="sr-only"> {t(ui.a11y.newTab)}</span>
              </a>
              <a href={efset.verify} target="_blank" rel="noopener noreferrer">
                <Icon name="external" size={15} />
                {t(ui.labels.verify)}
                <span className="sr-only"> {t(ui.a11y.newTab)}</span>
              </a>
            </p>
          </article>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>{t(ui.labels.certificates)}</h3>
          <ul className={styles.certs}>
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
                  <span>
                    <span className={styles.certName}>{t(c.name)}</span>
                    <span className={styles.certMeta}>
                      {c.issuer} · {t(c.date)}
                    </span>
                  </span>
                  <span className="sr-only"> — {t(ui.labels.enlarge)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.disclosures}>
        <details className="disclosure">
          <summary>{t(ui.labels.otherCertificates)}</summary>
          <ul className={`disclosure-body ${styles.otherList}`}>
            {otherCertificates.map((item) => (
              <li key={item.en}>{t(item)}</li>
            ))}
          </ul>
        </details>
      </div>

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
