import { categoryInfo, DEFAULT_STUDIO, linkLabel, projectName, testingLabels, type Project } from '../content/projects';
import { reachKindLabel, reachSource, reachValue } from '../content/reach';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Lightbox } from './Lightbox';
import styles from './ProjectDetails.module.css';

/**
 * The full QA scope of a featured project, in a dialog. The card carries the two or three points
 * that matter most; everything a recruiter may want to read next lives here, so neither the card
 * nor the grid grows to fit it.
 */
export function ProjectDetails({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { lang, t } = useLang();
  const name = project ? projectName(project, lang) : '';
  // Platforms the category label already names ("PC / Steam" covers PC and Steam) are not repeated.
  const categoryLabel = project ? t(categoryInfo[project.category].label) : '';
  const meta = project
    ? [
        categoryLabel,
        ...project.platforms.filter((platform) => !categoryLabel.toLowerCase().includes(platform.toLowerCase())),
        project.studio ?? DEFAULT_STUDIO,
      ]
    : [];

  return (
    <Lightbox open={Boolean(project)} variant="text" title={name} closeLabel={t(ui.labels.close)} onClose={onClose}>
      {project && (
        <div className={styles.detail}>
          <p className={styles.meta}>{meta.join(' · ')}</p>

          {project.status && <p className={styles.status}>{t(project.status)}</p>}

          {project.context && (
            <section className={styles.block}>
              <h3 className={styles.blockTitle}>{t(ui.projects.product)}</h3>
              <p className={styles.text}>{t(project.context)}</p>
            </section>
          )}

          {project.detail && (
            <section className={styles.block}>
              <h3 className={styles.blockTitle}>{t(ui.projects.scopeFull)}</h3>
              <ul className={styles.points}>
                {t(project.detail).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          )}

          {project.compliance && (
            <p className={styles.compliance}>
              <span className={styles.label}>{t(ui.projects.compliance)}</span>
              {t(project.compliance)}
            </p>
          )}

          <ul className={styles.tags}>
            {project.testing.map((type) => (
              <li key={type}>{t(testingLabels[type])}</li>
            ))}
          </ul>

          {project.reach && (
            <p className={styles.reach}>
              {project.reach.map((r, i) => (
                <span key={r.kind}>
                  {i > 0 && ' · '}
                  <strong>{reachValue(r, lang)}</strong> {t(reachKindLabel[r.kind])}
                </span>
              ))}
              <span className={styles.source}>{reachSource(project.reach, lang)}</span>
            </p>
          )}

          {project.links && project.links.length > 0 && (
            <ul className={styles.links}>
              {project.links.map((url) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} — ${t(linkLabel(url).long)} ${t(ui.a11y.newTab)}`}
                  >
                    {t(linkLabel(url).short)}
                    <Icon name="external" size={15} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Lightbox>
  );
}
