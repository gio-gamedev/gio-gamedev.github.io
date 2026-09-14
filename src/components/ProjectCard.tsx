import type { CSSProperties } from 'react';
import {
  categoryInfo,
  coverSrcSet,
  coverUrl,
  projectName,
  storeLabel,
  testingLabels,
  universalTesting,
  type Project,
} from '../content/projects';
import { compactCount, reachKindLabel } from '../content/reach';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Tag } from './Tag';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLang();
  const category = categoryInfo[project.category];
  const name = projectName(project, lang);
  const fit = project.coverFit ?? 'cover';

  return (
    <article className={styles.card}>
      <div className={styles.media} data-fit={fit} style={{ '--tone': `var(--${category.tone})` } as CSSProperties}>
        {project.cover && (
          <img
            src={coverUrl(project.cover)}
            srcSet={fit === 'cover' ? coverSrcSet(project.cover) : undefined}
            sizes={fit === 'cover' ? '(max-width: 640px) 92vw, 380px' : undefined}
            alt=""
            width={800}
            height={450}
            loading="lazy"
            decoding="async"
          />
        )}
        <span className={styles.badge}>
          <Tag tone={category.tone}>{t(category.label)}</Tag>
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.platforms}>
          {[...project.platforms, ...(project.studio ? [project.studio] : [])].join(' · ')}
        </p>

        {project.reach && (
          <p className={styles.reach}>
            <strong>{compactCount(project.reach.count, lang)}</strong> {t(reachKindLabel[project.reach.kind])}
          </p>
        )}

        {project.focus && (
          <p className={styles.focus}>
            <span className={styles.focusLabel}>{t(ui.projects.focus)}</span>
            {t(project.focus)}
          </p>
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
            <span className="sr-only"> — {name}</span>
            <Icon name="external" size={15} />
          </a>
        )}
      </div>
    </article>
  );
}
