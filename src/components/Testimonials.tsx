import { testimonials } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Section } from './Section';
import styles from './Testimonials.module.css';

export function Testimonials({ index }: { index: string }) {
  const { t } = useLang();
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials" index={index} title={t(ui.sections.testimonials)}>
      <ul className={styles.grid}>
        {testimonials.map((item) => (
          <li key={item.name}>
            <figure className={styles.card}>
              <blockquote className={styles.quote}>“{t(item.quote)}”</blockquote>
              <figcaption className={styles.caption}>
                <strong>{item.name}</strong>
                <span>
                  {t(item.role)} · {item.company}
                </span>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
