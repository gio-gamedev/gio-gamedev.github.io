import { skills } from '../content/profile';
import { useLang } from '../i18n/LanguageContext';
import { Abbr } from './Abbr';
import styles from './Skills.module.css';

/** Skill groups with market-standard names (what job posts and screening tools search for). */
export function SkillList() {
  const { t } = useLang();

  return (
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
  );
}
