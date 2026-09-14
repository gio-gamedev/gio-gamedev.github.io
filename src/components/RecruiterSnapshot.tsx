import { profile, snapshot } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Abbr } from './Abbr';
import styles from './RecruiterSnapshot.module.css';

/** The filter facts a recruiter (or a screening tool) looks for first, in one scannable card. */
export function RecruiterSnapshot() {
  const { t } = useLang();

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <img
          className={styles.photo}
          src={profile.avatar}
          alt={profile.name}
          width={80}
          height={80}
          fetchPriority="high"
        />
        <div>
          <h2 id="snapshot-title" className={styles.title}>
            {t(ui.snapshot.title)}
          </h2>
          <p className={styles.role}>{t(profile.title)}</p>
        </div>
      </div>

      <dl className={styles.list}>
        {snapshot.map((row) => (
          <div key={row.label.en} className={styles.row}>
            <dt>{t(row.label)}</dt>
            <dd>
              <Abbr text={t(row.value)} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
