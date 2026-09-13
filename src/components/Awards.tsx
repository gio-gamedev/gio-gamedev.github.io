import { award } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Section } from './Section';
import styles from './Awards.module.css';

export function Awards({ index }: { index: string }) {
  const { t } = useLang();

  return (
    <Section id="awards" index={index} title={t(ui.sections.awards)}>
      <article className={styles.card}>
        <span className={styles.icon}>
          <Icon name="trophy" size={28} />
        </span>
        <div>
          <h3 className={styles.title}>{t(award.title)}</h3>
          <p className={styles.org}>{award.org}</p>
          <p className={styles.note}>{t(award.note)}</p>
          <a className={styles.link} href={award.link} target="_blank" rel="noreferrer">
            <Icon name="play" size={16} />
            {t(award.linkLabel)}
          </a>
        </div>
      </article>
    </Section>
  );
}
