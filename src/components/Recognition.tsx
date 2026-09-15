import { recognition, testimonial } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Section } from './Section';
import styles from './Recognition.module.css';

/** The Testathon team award (every member credited) and a testimonial, as text. */
export function Recognition({ index }: { index: string }) {
  const { lang, t } = useLang();

  return (
    <Section id="recognition" index={index} title={t(ui.sections.recognition)}>
      <div className={styles.grid}>
        <article className={styles.award} aria-labelledby="award-title">
          <span className={styles.icon}>
            <Icon name="trophy" size={26} />
          </span>
          <p className={styles.result}>{t(recognition.result)}</p>
          <h3 id="award-title" className={styles.event}>
            {recognition.event} — {recognition.year}
          </h3>
          <p className={styles.note}>{t(recognition.note)}</p>

          <p className={styles.label}>{t(ui.recognition.team)}</p>
          <ul className={styles.team}>
            {recognition.team.map((member) => (
              <li key={member.name}>
                <a href={member.url} target="_blank" rel="noreferrer" aria-label={t(ui.recognition.linkedin)(member.name)}>
                  <Icon name="linkedin" size={14} />
                  {member.name}
                </a>
              </li>
            ))}
          </ul>

          <a className={styles.video} href={recognition.video} target="_blank" rel="noreferrer">
            <Icon name="play" size={16} />
            {t(ui.recognition.video)}
          </a>
        </article>

        <figure className={styles.quote}>
          <p className={styles.label}>{t(ui.recognition.testimonial)}</p>
          <blockquote lang={lang === 'pt' ? 'pt-BR' : 'en'}>
            <p>{lang === 'pt' ? testimonial.quote : testimonial.translation}</p>
          </blockquote>
          <figcaption className={styles.caption}>
            <strong>{testimonial.author}</strong>
            <span>{t(testimonial.role)}</span>
            <span className={styles.context}>{t(testimonial.context)}</span>
          </figcaption>
          {lang === 'en' && (
            <>
              <p className={styles.translated}>{t(ui.recognition.translated)}</p>
              <details className={`disclosure ${styles.original}`}>
                <summary>{t(ui.recognition.original)}</summary>
                <p className="disclosure-body" lang="pt-BR">
                  {testimonial.quote}
                </p>
              </details>
            </>
          )}
        </figure>
      </div>
    </Section>
  );
}
