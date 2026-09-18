import { useState } from 'react';
import { profile } from '../content/profile';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Lightbox } from './Lightbox';
import styles from './ResumeDialog.module.css';

/**
 * "View" opens both résumés at once, English and Portuguese, regardless of the site's current
 * language — a recruiter reading one version may still want the other. The download button next to
 * it (see Hero/Contact) keeps going straight to the résumé matching the page's own language.
 */
export function ResumeViewButton({ className }: { className?: string }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <Icon name="external" size={15} />
        {t(ui.resume.view)}
      </button>
      <Lightbox open={open} variant="text" title={t(ui.resume.pdf)} closeLabel={t(ui.labels.close)} onClose={() => setOpen(false)}>
        <ul className={styles.list}>
          <li>
            <a href={encodeURI(profile.cv.en)} target="_blank" rel="noopener noreferrer">
              <Icon name="external" size={16} />
              View résumé (English)
            </a>
          </li>
          <li>
            <a href={encodeURI(profile.cv.pt)} target="_blank" rel="noopener noreferrer">
              <Icon name="external" size={16} />
              Ver currículo (Português)
            </a>
          </li>
        </ul>
      </Lightbox>
    </>
  );
}
