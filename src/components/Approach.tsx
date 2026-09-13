import { approach } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Rich } from './Rich';
import { Section } from './Section';
import styles from './Approach.module.css';

export function Approach({ index }: { index: string }) {
  const { t } = useLang();

  return (
    <Section id="approach" index={index} title={t(ui.sections.approach)}>
      <p className={styles.lead}>
        <Rich text={t(approach.lead)} />
      </p>

      <ol className={styles.steps}>
        {approach.steps.map((step, i) => (
          <li key={step.title.en} className={styles.step}>
            <span className={styles.num} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.title}>{t(step.title)}</h3>
            <p className={styles.text}>{t(step.text)}</p>
          </li>
        ))}
      </ol>

      <p className={styles.technical}>{t(approach.technical)}</p>
    </Section>
  );
}
