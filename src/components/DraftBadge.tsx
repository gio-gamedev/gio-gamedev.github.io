import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import styles from './DraftBadge.module.css';

/** Review-mode marker for fictional content Giovanni still has to redo. Never rendered on the published site. */
export function DraftBadge({ variant = 'banner' }: { variant?: 'banner' | 'chip' }) {
  const { t } = useLang();

  if (variant === 'chip') return <span className={styles.chip}>{t(ui.review.chip)}</span>;

  return (
    <p className={styles.banner} role="note">
      <Icon name="info" size={18} />
      <span>{t(ui.review.banner)}</span>
    </p>
  );
}
