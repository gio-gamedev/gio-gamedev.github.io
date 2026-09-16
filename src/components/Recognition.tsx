import { useState } from 'react';
import { recognition, testimonial, type Photo } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Lightbox } from './Lightbox';
import { Section } from './Section';
import styles from './Recognition.module.css';

const photoUrl = (file: string, width: number) => `${import.meta.env.BASE_URL}testathon/${file}-${width}.webp`;
const photoSrcSet = (photo: Photo) => photo.widths.map((w) => `${photoUrl(photo.file, w)} ${w}w`).join(', ');

/**
 * One composition: the award photo and the award itself on the first row, the testimonial and the
 * two other event photos on the second. The team award credits every member, the photos name nobody,
 * and the recommendation is quoted exactly in its original Portuguese on both versions of the site.
 */
export function Recognition() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState<Photo | null>(null);
  const [main, ...rest] = recognition.photos;

  const photoButton = (photo: Photo, sizes: string) => (
    <button type="button" className={styles.photo} onClick={() => setOpen(photo)} aria-haspopup="dialog">
      <img
        src={photoUrl(photo.file, photo.widths[0])}
        srcSet={photoSrcSet(photo)}
        sizes={sizes}
        alt={t(photo.alt)}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        decoding="async"
      />
      <span className="sr-only"> — {t(ui.labels.enlarge)}</span>
    </button>
  );

  return (
    <Section id="recognition" title={t(ui.sections.recognition)}>
      <div className={styles.grid}>
        <figure className={styles.mainPhoto}>
          {photoButton(main, '(max-width: 1000px) calc(100vw - 32px), 640px')}
          <figcaption className={styles.photoCaption}>{t(main.caption)}</figcaption>
        </figure>

        <article className={styles.award} aria-labelledby="award-title">
          <p className={styles.result}>
            <Icon name="trophy" size={18} />
            {t(recognition.result)}
          </p>
          <h3 id="award-title" className={styles.event}>
            {recognition.event} — {recognition.year}
          </h3>
          <p className={styles.note}>{t(recognition.note)}</p>

          <p className={styles.label}>{t(ui.recognition.team)}</p>
          <ul className={styles.team}>
            {recognition.team.map((member) => (
              <li key={member.name}>
                <a
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t(ui.recognition.linkedin)(member.name)} ${t(ui.a11y.newTab)}`}
                >
                  <Icon name="linkedin" size={14} />
                  {member.name}
                </a>
              </li>
            ))}
          </ul>

          <a className={styles.video} href={recognition.video} target="_blank" rel="noopener noreferrer">
            <Icon name="play" size={16} />
            {t(ui.recognition.video)}
            <span className="sr-only"> {t(ui.a11y.newTab)}</span>
          </a>
        </article>

        <figure className={styles.quote}>
          <p className={styles.label}>{t(ui.recognition.testimonial)}</p>
          {lang === 'en' && <p className={styles.original}>{t(ui.recognition.original)}</p>}
          <blockquote lang="pt-BR">
            <p>{testimonial.quote}</p>
          </blockquote>
          {lang === 'en' && (
            <div className={styles.translation}>
              <p className={styles.original}>{t(ui.recognition.translation)}</p>
              <p>{testimonial.translation}</p>
            </div>
          )}
          <figcaption className={styles.caption}>
            <a className={styles.author} href={testimonial.url} target="_blank" rel="noopener noreferrer">
              {testimonial.author}
              <Icon name="linkedin" size={14} />
              <span className="sr-only"> — LinkedIn {t(ui.a11y.newTab)}</span>
            </a>
            <span>{t(testimonial.role)}</span>
            <span className={styles.context}>{t(testimonial.context)}</span>
          </figcaption>
        </figure>

        <div className={styles.extraPhotos}>
          <h3 className={styles.label}>{t(ui.recognition.photos)}</h3>
          <ul className={styles.photoGrid}>
            {rest.map((photo) => (
              <li key={photo.file}>
                <figure>
                  {photoButton(photo, '(max-width: 1000px) calc(50vw - 24px), 220px')}
                  <figcaption className={styles.photoCaption}>{t(photo.caption)}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Lightbox open={open !== null} title={open ? t(open.caption) : ''} closeLabel={t(ui.labels.close)} onClose={() => setOpen(null)}>
        {open && (
          <img src={photoUrl(open.file, open.widths[open.widths.length - 1])} srcSet={photoSrcSet(open)} sizes="92vw" alt={t(open.alt)} width={open.width} height={open.height} />
        )}
      </Lightbox>
    </Section>
  );
}
