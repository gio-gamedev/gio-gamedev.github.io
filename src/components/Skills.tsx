import { skills } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Abbr } from './Abbr';
import { Section } from './Section';
import styles from './Skills.module.css';

export function Skills({ index }: { index: string }) {
  const { t } = useLang();

  return (
    <Section id="skills" index={index} title={t(ui.sections.skills)}>
      <dl className={styles.list}>
        {skills.map((group) => (
          <div key={group.title.en} className={styles.row}>
            <dt className={styles.group}>{t(group.title)}</dt>
            <dd className={styles.items}>
              <ul>
                {t(group.items).map((item) => (
                  <li key={item}>
                    <Abbr text={item} />
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
