import type { CSSProperties } from 'react';
import {
  categoryInfo,
  linkLabel,
  pageOf,
  projectName,
  testingLabels,
  universalTesting,
  type Project,
} from '../content/projects';
import { reachKindLabel, reachSource, reachValue } from '../content/reach';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Cover } from './Cover';
import { Icon } from './Icon';
import { Tag } from './Tag';
import styles from './ProjectCard.module.css';

/** Three across on a wide screen, two on a tablet, one on a phone (see Projects.module.css). */
const coverSizes = '(max-width: 640px) calc(100vw - 32px), (max-width: 1099px) calc(50vw - 40px), 380px';

/**
 * Featured project, all six at the same weight: the product in one line, what Giovanni did, the QA
 * tags, public figures and one link. The full scope opens in a dialog, so the card stays scannable.
 */
export function ProjectCard({ project, onDetails }: { project: Project; onDetails: () => void }) {
  const { lang, t } = useLang();
  const category = categoryInfo[project.category];
  const name = projectName(project, lang);
  const url = pageOf(project);
  // Platforms already named by the category tag ("Roblox", "Fortnite") are not repeated.
  const categoryLabel = t(category.label).toLowerCase();
  const meta = [
    ...project.platforms.filter((platform) => !categoryLabel.includes(platform.toLowerCase())),
    ...(project.studio ? [project.studio] : []),
  ];

  return (
    <article className={styles.card} style={{ '--tone': `var(--${category.tone})` } as CSSProperties}>
      <div className={styles.media}>
        <Cover project={project} sizes={coverSizes} />
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <Tag tone={category.tone}>{t(category.label)}</Tag>
          {meta.length > 0 && <span className={styles.platforms}>{meta.join(' · ')}</span>}
        </div>
        <h3 className={styles.name}>{name}</h3>
        {project.context && <p className={styles.context}>{t(project.context)}</p>}

        {project.contribution && (
          <div>
            <p className={styles.label}>{t(ui.projects.contribution)}</p>
            <ul className={styles.points}>
              {t(project.contribution).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {/* The platform rules checked, on one line: it repeats across cards, so it is not a bullet. */}
        {project.compliance && (
          <p className={styles.compliance}>
            <span className={styles.complianceLabel}>{t(ui.projects.compliance)}</span>
            {t(project.compliance)}
          </p>
        )}

        {/* Functional and regression apply to every title and are stated once, in the catalog. */}
        <ul className={styles.tags}>
          {project.testing
            .filter((type) => !universalTesting.includes(type))
            .map((type) => (
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

        <p className={styles.footer}>
          <button type="button" className={styles.details} aria-haspopup="dialog" onClick={onDetails}>
            {t(ui.projects.details)}
            <span className="sr-only">: {name}</span>
            <Icon name="arrowRight" size={15} />
          </button>
          {url && (
            <a
              className={styles.link}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} — ${t(linkLabel(url).long)} ${t(ui.a11y.newTab)}`}
            >
              {t(linkLabel(url).short)}
              <Icon name="external" size={15} />
            </a>
          )}
        </p>
      </div>
    </article>
  );
}
