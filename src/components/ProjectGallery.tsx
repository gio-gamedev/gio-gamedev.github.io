import { useEffect, useState, type CSSProperties } from 'react';
import {
  categories,
  categoryInfo,
  categoryNote,
  categoryScope,
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
import { reachKindLabel, reachSource, reachValue } from '../content/reach';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../i18n/routes';
import { Cover } from './Cover';
import { Icon } from './Icon';
import { Section } from './Section';
import styles from './ProjectGallery.module.css';

type Filter = Category | 'all';

/** URL value of a platform filter: "fortnite-uefn", "the-sandbox". */
const slugOf = (category: Category) => category.toLowerCase().replace(/[^a-z]+/g, '-');
const fold = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

// Featured first, then by public reach, then alphabetical.
const weight = (p: Project) => {
  const first = p.reach?.[0];
  return (p.selected ? 1e12 : 0) + (first && first.kind !== 'rating' ? first.count : 0);
};

const groups = categories.map((category) => ({
  category,
  slug: slugOf(category),
  items: projects
    .filter((p) => inCategory(p, category))
    .sort((a, b) => weight(b) - weight(a) || projectKey(a).localeCompare(projectKey(b))),
}));

/** Everything a search matches: both titles, the former title, studios, platforms and category. */
const haystack = new Map(
  projects.map((p) => [
    p,
    fold(
      [
        typeof p.name === 'string' ? p.name : `${p.name.en} ${p.name.pt}`,
        p.aka ?? '',
        p.origin ?? '',
        p.studio ?? '',
        ...p.platforms,
        categoryInfo[p.category].label.en,
        categoryInfo[p.category].label.pt,
      ].join(' '),
    ),
  ]),
);

const totalFor = (filter: Filter) =>
  filter === 'all' ? projects.length : projects.filter((p) => inCategory(p, filter)).length;

/** Every title, grouped by platform, with search, platform filters and a shareable URL. */
export function ProjectGallery() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [ready, setReady] = useState(false);

  // Shareable state (?p=<platform>&q=<search>), read after hydration so the prerendered page
  // (everything shown) matches the first client render.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fromUrl = categories.find((c) => slugOf(c) === params.get('p'));
    if (fromUrl) setFilter(fromUrl);
    setQuery(params.get('q') ?? '');
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams();
    if (filter !== 'all') params.set('p', slugOf(filter));
    if (query.trim()) params.set('q', query.trim());
    const search = params.toString();
    history.replaceState(null, '', `${location.pathname}${search ? `?${search}` : ''}${location.hash}`);
  }, [ready, filter, query]);

  const q = fold(query.trim());
  const matches = (p: Project) => !q || (haystack.get(p) ?? '').includes(q);
  // "All" lists each title once, under its main platform; a platform filter also shows its ports.
  const shown = (p: Project, group: Category) => (filter === 'all' ? p.category === group : filter === group) && matches(p);
  const count = projects.filter((p) => (filter === 'all' || inCategory(p, filter)) && matches(p)).length;
  const clear = () => {
    setFilter('all');
    setQuery('');
  };

  return (
    <Section
      id="gallery"
      level={1}
      title={t(ui.gallery.title)(projects.length)}
      subtitle={t(ui.gallery.intro)(projects.length)}
      lead={
        <a className={styles.back} href={pagePath(lang, 'home')}>
          <Icon name="arrowRight" size={16} />
          {t(ui.gallery.back)}
        </a>
      }
    >
      <div className={styles.toolbar}>
        <div className={styles.searchRow}>
          <label className={styles.search}>
            <span className="sr-only">{t(ui.gallery.search)}</span>
            <Icon name="search" size={18} />
            <input
              type="search"
              value={query}
              placeholder={t(ui.gallery.searchPlaceholder)}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <p className={styles.results} aria-live="polite">
            {t(ui.gallery.results)(count)}
          </p>
          <button type="button" className={styles.clear} onClick={clear} disabled={filter === 'all' && !query}>
            {t(ui.gallery.clear)}
          </button>
        </div>

        <div className={styles.filters} role="group" aria-label={t(ui.gallery.filters)}>
          {(['all', ...categories] as Filter[]).map((f) => (
            <button key={f} type="button" className={styles.filter} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f === 'all' ? t(ui.gallery.all) : t(categoryInfo[f].label)}
              <span className={styles.filterCount}>{totalFor(f)}</span>
            </button>
          ))}
        </div>
      </div>

      {count === 0 && <p className={styles.empty}>{t(ui.gallery.empty)}</p>}

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

      <div className={styles.footnote}>
        <Icon name="info" size={14} />
        <div>
          <p>{t(ui.projects.universal)}</p>
          <p>{t(ui.projects.publicNote)}</p>
        </div>
      </div>
    </Section>
  );
}

function Tile({ project }: { project: Project }) {
  const { lang, t } = useLang();
  const name = projectName(project, lang);
  const links = project.links ?? [];
  // The group heading already names the platform ("Roblox", "Fortnite"); other platforms stay.
  const categoryLabel = t(categoryInfo[project.category].label).toLowerCase();
  const meta = [
    ...project.platforms.filter((platform) => !categoryLabel.includes(platform.toLowerCase())),
    ...(project.studio ? [project.studio] : []),
    ...(project.origin ? [t(ui.projects.byOrigin)(project.origin)] : []),
    ...(project.aka ? [t(ui.projects.formerly)(project.aka)] : []),
  ];

  return (
    <article className={styles.tile} id={`p-${projectSlug(project)}`}>
      <div className={styles.media}>
        <Cover project={project} name={name} sizes="(max-width: 560px) 88px, 300px" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {meta.length > 0 && <p className={styles.meta}>{meta.join(' · ')}</p>}
        {project.reach && (
          <>
            <p className={styles.reach}>
              {project.reach.map((r, i) => (
                <span key={r.kind}>
                  {i > 0 && ' · '}
                  <strong>{reachValue(r, lang)}</strong> {t(reachKindLabel[r.kind])}
                </span>
              ))}
            </p>
            <p className={styles.source}>{reachSource(project.reach, lang)}</p>
          </>
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
