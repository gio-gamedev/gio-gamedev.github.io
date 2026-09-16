import { skills } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Abbr } from './Abbr';
import { Section } from './Section';
import styles from './Skills.module.css';

/**
 * Six blocks a reader can take one at a time instead of two dense columns: what I test, how I plan
 * and release it, the technical side, the tools, the platforms and the background behind it.
 * Market-standard names, no levels or ratings.
 */
export function Skills() {
  const { t } = useLang();

  return (
    <Section id="skills" title={t(ui.sections.skills)} subtitle={t(ui.sections.skillsSubtitle)}>
      <ul className={styles.grid}>
        {skills.map((group) => (
          <li key={group.title.en} className={styles.group}>
            <h3 className={styles.groupTitle}>{t(group.title)}</h3>
            <ul className={styles.chips}>
              {t(group.items).map((item) => (
                <li key={item}>
                  <Abbr text={item} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
