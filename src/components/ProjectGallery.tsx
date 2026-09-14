import { useState } from 'react';
import type { CSSProperties } from 'react';
import {
  categories,
  categoryInfo,
  categoryNote,
  categoryScope,
  coverOf,
  coverSrcSet,
  coverUrl,
  inCategory,
  projectKey,
  projectName,
  projectSlug,
  projects,
  storeLabel,
  storeName,
  testingLabels,
  universalTesting,
  type Category,
  type Project,
} from '../content/projects';
import { reachKindLabel, reachValue } from '../content/reach';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../i18n/routes';
import { Icon } from './Icon';
import { Section } from './Section';
import styles from './ProjectGallery.module.css';

type Filter = Category | 'all';

// Featured first, then by public reach, then alphabetical.
const weight = (p: Project) => {
  const first = p.reach?.[0];
  return (p.selected ? 1e12 : 0) + (first && first.kind !== 'rating' ? first.count : 0);
};

const groups = categories.map((category) => ({
  category,
  slug: category.toLowerCase().replace(/[^a-z]+/g, '-'),
  items: projects
    .filter((p) => inCategory(p, category))
    .sort((a, b) => weight(b) - weight(a) || projectKey(a).localeCompare(projectKey(b))),
}));

const countFor = (filter: Filter) =>
  filter === 'all' ? projects.length : projects.filter((p) => inCategory(p, filter)).length;

/** Every project, with an image or a placeholder, grouped by platform and filterable. */
export function ProjectGallery() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<Filter>('all');

  // "All" lists each project once, under its main platform; a platform filter also shows its ports.
  const shown = (p: Project, group: Category) => (filter === 'all' ? p.category === group : filter === group);

  return (
    <Section
      id="gallery"
      level={1}
      title={t(ui.gallery.title)(projects.length)}
      subtitle={t(ui.gallery.intro)}
    >
      <a className={styles.back} href={pagePath(lang, 'home')}>
        <Icon name="arrowRight" size={16} />
        {t(ui.gallery.back)}
      </a>

      <div className={styles.toolbar} role="group" aria-label={t(ui.gallery.filters)}>
        {(['all', ...categories] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            className={styles.filter}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? t(ui.gallery.all) : t(categoryInfo[f].label)}
            <span className={styles.filterCount}>{countFor(f)}</span>
          </button>
        ))}
      </div>
      <p className={styles.universal}>{t(ui.projects.universal)}</p>

      {groups.map(({ category, slug, items }) => {
        const info = categoryInfo[category];
        const visible = items.filter((p) => shown(p, category)).length;
        const scope = categoryScope[category].filter((type) => !universalTesting.includes(type));
        const note = categoryNote[category];
        return (
          <section
            key={category}
            className={styles.group}
            hidden={visible === 0}
            aria-labelledby={`group-${slug}`}
            style={{ '--tone': `var(--${info.tone})` } as CSSProperties}
          >
            <div className={styles.groupHead}>
              <h2 id={`group-${slug}`} className={styles.groupTitle}>
                {t(info.label)}
              </h2>
              <span className={styles.groupCount}>{visible}</span>
            </div>
            <p className={styles.scope}>
              <span className={styles.scopeLabel}>{t(ui.projects.scope)}</span>
              {scope.map((type) => t(testingLabels[type])).join(' · ')}
            </p>
            {note && <p className={styles.note}>{t(note)}</p>}
            <ul className={styles.grid}>
              {items.map((p) => (
                <li key={projectKey(p)} hidden={!shown(p, category)}>
                  <Tile project={p} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className={styles.footnote}>
        <Icon name="info" size={14} />
        {t(ui.projects.publicNote)}
      </p>
    </Section>
  );
}

function Tile({ project }: { project: Project }) {
  const { lang, t } = useLang();
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
    <article className={styles.tile}>
      <div className={styles.media} data-fit={cover === 'square' ? 'contain' : 'cover'}>
        {cover ? (
          <img
            src={coverUrl(cover === 'wide' ? `${slug}-400` : slug)}
            srcSet={cover === 'wide' ? coverSrcSet(slug) : undefined}
            sizes={cover === 'wide' ? '(max-width: 640px) 92vw, 300px' : undefined}
            alt=""
            width={400}
            height={225}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            {name}
          </span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {meta.length > 0 && <p className={styles.meta}>{meta.join(' · ')}</p>}
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
        {project.status && <p className={styles.status}>{t(project.status)}</p>}
        {links.length > 0 && (
          <p className={styles.links}>
            {links.map((url) => (
              <a key={url} href={url} target="_blank" rel="noreferrer" aria-label={`${name} — ${t(storeLabel(url))}`}>
                {storeName(url)}
                <Icon name="external" size={12} />
              </a>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}
