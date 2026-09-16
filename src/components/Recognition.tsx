import { useEffect, useState } from 'react';
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
 * Two things that are not the same thing, so they no longer read as one: the team award, with the
 * event gallery attached to it, and the LinkedIn recommendation in a block of its own. The team
 * award credits every member, the photos name nobody, and the recommendation is quoted exactly in
 * its original Portuguese on both versions of the site.
 */
export function Recognition() {
  const { lang, t } = useLang();
  const photos = recognition.photos;
  const [shown, setShown] = useState(0);
  const [open, setOpen] = useState(false);
  const current = photos[shown];

  const step = (delta: number) => setShown((i) => (i + delta + photos.length) % photos.length);

  // Arrow keys walk the gallery while the dialog is open, as in any photo viewer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, photos.length]);

  return (
    <Section id="recognition" title={t(ui.sections.recognition)}>
      <div className={styles.grid}>
        {/* One gallery of the event: the big photo, then the others as thumbnails under it. */}
        <figure className={styles.gallery} aria-label={t(ui.recognition.gallery)}>
          <button type="button" className={styles.photo} onClick={() => setOpen(true)} aria-haspopup="dialog">
            <img
              key={current.file}
              src={photoUrl(current.file, current.widths[0])}
              srcSet={photoSrcSet(current)}
              sizes="(max-width: 1000px) calc(100vw - 32px), 640px"
              alt={t(current.alt)}
              width={current.width}
              height={current.height}
              loading="lazy"
              decoding="async"
            />
            <span className="sr-only"> — {t(ui.labels.enlarge)}</span>
          </button>

          <figcaption className={styles.photoCaption}>
            {t(current.caption)}
            <span className={styles.counter}>{t(ui.recognition.photoOf)(shown + 1, photos.length)}</span>
          </figcaption>

          <ul className={styles.thumbs}>
            {photos.map((photo, i) => (
              <li key={photo.file}>
                <button
                  type="button"
                  className={styles.thumb}
                  aria-current={i === shown || undefined}
                  onClick={() => setShown(i)}
                >
                  <img
                    src={photoUrl(photo.file, photo.widths[0])}
                    alt={t(photo.caption)}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </li>
            ))}
          </ul>
        </figure>

        <article className={styles.award} aria-labelledby="award-title">
          <p className={styles.result}>
            <Icon name="trophy" size={18} />
            {t(recognition.badge)}
          </p>
          <h3 id="award-title" className={styles.event}>
            {recognition.event} — {recognition.year}
          </h3>
          <p className={styles.note}>{t(recognition.note)}</p>

          <p className={styles.label}>{t(ui.recognition.team)}</p>
          <ul className={styles.team}>
            {recognition.team.map((member) => (
              <li key={member.name} title={member.name}>
                {member.name.split(' ')[0]}
              </li>
            ))}
          </ul>

          <a className={styles.video} href={recognition.video} target="_blank" rel="noopener noreferrer">
            <Icon name="play" size={16} />
            {t(ui.recognition.video)}
            <span className="sr-only"> {t(ui.a11y.newTab)}</span>
          </a>
        </article>
      </div>

      {/* A recommendation is not part of the award: its own block, with room to breathe. */}
      <figure className={styles.quote} aria-labelledby="quote-title">
        <p id="quote-title" className={styles.quoteLabel}>
          {t(ui.recognition.testimonial)}
        </p>
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
          <span className={styles.role}>{t(testimonial.role)}</span>
          <span className={styles.context}>{t(testimonial.context)}</span>
        </figcaption>
      </figure>

      <Lightbox open={open} title={t(current.caption)} closeLabel={t(ui.labels.close)} onClose={() => setOpen(false)}>
        <div className={styles.viewer}>
          <button type="button" className={styles.step} onClick={() => step(-1)} aria-label={t(ui.recognition.previous)}>
            <Icon name="chevron" size={20} />
          </button>
          <img
            src={photoUrl(current.file, current.widths[current.widths.length - 1])}
            srcSet={photoSrcSet(current)}
            sizes="92vw"
            alt={t(current.alt)}
            width={current.width}
            height={current.height}
          />
          <button
            type="button"
            className={`${styles.step} ${styles.stepNext}`}
            onClick={() => step(1)}
            aria-label={t(ui.recognition.next)}
          >
            <Icon name="chevron" size={20} />
          </button>
        </div>
      </Lightbox>
    </Section>
  );
}
