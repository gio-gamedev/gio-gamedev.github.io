import { skills } from '../content/profile';
import { useLang } from '../i18n/LanguageContext';
import { Abbr } from './Abbr';
import styles from './Skills.module.css';

/**
 * Market-standard skill names (what job posts and screening tools search for): the core Game QA
 * set as chips, tools grouped on lines, complementary knowledge last with less weight.
 */
export function SkillList() {
  const { t } = useLang();
  const core = skills.filter((group) => group.kind === 'core');
  const tools = skills.filter((group) => group.kind === 'tools');
  const extra = skills.filter((group) => group.kind === 'extra');

  return (
    <div className={styles.skills}>
      {core.map((group) => (
        <ul key={group.title.en} className={styles.chips} aria-label={t(group.title)}>
          {t(group.items).map((item) => (
            <li key={item}>
              <Abbr text={item} />
            </li>
          ))}
        </ul>
      ))}

      <dl className={styles.tools}>
        {tools.map((group) => (
          <div key={group.title.en} className={styles.row}>
            <dt>{t(group.title)}</dt>
            <dd>{t(group.items).join(' · ')}</dd>
          </div>
        ))}
      </dl>

      {extra.map((group) => (
        <p key={group.title.en} className={styles.extra}>
          <span className={styles.extraTitle}>{t(group.title)}:</span> <Abbr text={t(group.items).join(' · ')} />
        </p>
      ))}
    </div>
  );
}
