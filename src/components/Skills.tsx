import { skills } from '../content/profile';
import { useLang } from '../i18n/LanguageContext';
import { Abbr } from './Abbr';
import styles from './Skills.module.css';

/**
 * The QA toolkit, by category: what I test and validate, the platforms, then the tools and the
 * complementary knowledge with less weight. Market-standard names, no levels or ratings.
 */
export function SkillList() {
  const { t } = useLang();
  const chipGroups = skills.filter((group) => group.kind === 'core' || group.kind === 'platforms');
  const tools = skills.filter((group) => group.kind === 'tools');
  const extra = skills.filter((group) => group.kind === 'extra');

  return (
    <div className={styles.skills}>
      {chipGroups.map((group) => (
        <div key={group.title.en} className={styles.group}>
          <h4 className={styles.groupTitle}>{t(group.title)}</h4>
          <ul className={`${styles.chips} ${group.kind === 'platforms' ? styles.platforms : ''}`}>
            {t(group.items).map((item) => (
              <li key={item}>
                <Abbr text={item} />
              </li>
            ))}
          </ul>
        </div>
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
