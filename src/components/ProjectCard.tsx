import type { CSSProperties } from 'react';
import {
  categoryInfo,
  coverOf,
  coverSrcSet,
  coverUrl,
  projectName,
  projectSlug,
  storeLabel,
  storeName,
  testingLabels,
  universalTesting,
  type Project,
} from '../content/projects';
import { reachKindLabel, reachValue } from '../content/reach';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import { Tag } from './Tag';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLang();
  const category = categoryInfo[project.category];
  const name = projectName(project, lang);
  const slug = projectSlug(project);
  const cover = coverOf(project);
  const links = project.links ?? [];
  const meta = [
    ...project.platforms,
    ...(project.studio ? [project.studio] : []),
    ...(project.origin ? [t(ui.projects.byOrigin)(project.origin)] : []),
  ];

  return (
    <article className={styles.card}>
      <div
        className={styles.media}
        data-fit={cover === 'square' ? 'contain' : 'cover'}
        style={{ '--tone': `var(--${category.tone})` } as CSSProperties}
      >
        {cover && (
          <img
            src={coverUrl(slug)}
            srcSet={cover === 'wide' ? coverSrcSet(slug) : undefined}
            sizes={cover === 'wide' ? '(max-width: 640px) 92vw, 380px' : undefined}
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
        <p className={styles.platforms}>{meta.join(' · ')}</p>

        {project.reach && (
          <p className={styles.reach}>
            {project.reach.map((r, i) => (
              <span key={r.kind}>
                {i > 0 && ' · '}
                <strong>{reachValue(r, lang)}</strong> {t(reachKindLabel[r.kind])}
              </span>
            ))}
          </p>
        )}

        {project.focus && (
          <p className={styles.focus}>
            <span className={styles.focusLabel}>{t(ui.projects.focus)}</span>
            {t(project.focus)}
          </p>
        )}

        {/* Functional/regression apply to every project and are stated once on the gallery page. */}
        <ul className={styles.tags}>
          {project.testing
            .filter((type) => !universalTesting.includes(type))
            .map((type) => (
              <li key={type}>
                <Tag>{t(testingLabels[type])}</Tag>
              </li>
            ))}
        </ul>

        {links.length > 0 && (
          <p className={styles.links}>
            {links.map((url, i) => (
              <a key={url} className={styles.link} href={url} target="_blank" rel="noreferrer">
                {i === 0 ? t(storeLabel(url)) : storeName(url)}
                <span className="sr-only"> — {name}</span>
                <Icon name="external" size={15} />
              </a>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}
