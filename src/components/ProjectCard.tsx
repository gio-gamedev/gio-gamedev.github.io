import type { CSSProperties } from 'react';
import {
  categoryInfo,
  coverUrl,
  storeLabel,
  testingLabels,
  universalTesting,
  type Project,
} from '../content/projects';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Tag } from './Tag';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLang();
  const category = categoryInfo[project.category];

  return (
    <article className={styles.card}>
      <div
        className={styles.media}
        data-fit={project.coverFit ?? 'cover'}
        style={{ '--tone': `var(--${category.tone})` } as CSSProperties}
      >
        {project.cover ? (
          <img src={coverUrl(project.cover)} alt="" width={800} height={450} loading="lazy" decoding="async" />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            {project.name}
          </span>
        )}
        <span className={styles.badge}>
          <Tag tone={category.tone}>{t(category.label)}</Tag>
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{project.name}</h3>
        {project.platforms.length > 0 && <p className={styles.platforms}>{project.platforms.join(' · ')}</p>}

        {project.focus && (
          <p className={styles.focus}>
            <span className={styles.focusLabel}>{t(ui.projects.focus)}</span>
            {t(project.focus)}
          </p>
        )}

        {project.caseStudy && (
          <dl className={styles.case}>
            <div>
              <dt>{t(ui.projects.did)}</dt>
              <dd>{t(project.caseStudy.did)}</dd>
            </div>
            {project.caseStudy.highlight && (
              <div>
                <dt>{t(ui.projects.highlight)}</dt>
                <dd>{t(project.caseStudy.highlight)}</dd>
              </div>
            )}
          </dl>
        )}

        {/* Functional/regression apply to every project and are stated once in the index. */}
        <ul className={styles.tags}>
          {project.testing
            .filter((type) => !universalTesting.includes(type))
            .map((type) => (
            <li key={type}>
              <Tag>{t(testingLabels[type])}</Tag>
            </li>
          ))}
        </ul>

        {project.link && (
          <a className={styles.link} href={project.link} target="_blank" rel="noreferrer">
            {t(storeLabel(project.link))}
            <Icon name="external" size={15} />
          </a>
        )}
      </div>
    </article>
  );
}
