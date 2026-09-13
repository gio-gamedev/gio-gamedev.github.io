import { about } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Rich } from './Rich';
import { Section } from './Section';
import styles from './About.module.css';

export function About() {
  const { t } = useLang();

  return (
    <Section id="about" index="01" title={t(ui.sections.about)}>
      <div className={styles.body}>
        {t(about).map((paragraph, i) => (
          <p key={i} className={i === 0 ? styles.lead : undefined}>
            <Rich text={paragraph} />
          </p>
        ))}
      </div>
    </Section>
  );
}
