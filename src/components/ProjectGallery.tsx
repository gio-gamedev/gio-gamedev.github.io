import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  categories,
  categoryInfo,
  categoryNote,
  categoryScope,
  coverOf,
  inCategory,
  isFeatured,
  linkLabel,
  projectKey,
  projectName,
  projectSlug,
  projects,
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

/** URL value of a platform filter: "fortnite-uefn", "the-sandbox" (the same in both languages). */
const slugOf = (category: Category) => category.toLowerCase().replace(/[^a-z]+/g, '-');
const fold = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

// Titles with a confirmed image first (the rest keep a neutral frame at the end of each group),
// then featured, then by public reach, then alphabetical.
const firstReach = (p: Project) => {
  const first = p.reach?.[0];
  return first && first.kind !== 'rating' ? first.count : 0;
};
const order = (a: Project, b: Project) =>
  Number(Boolean(coverOf(b))) - Number(Boolean(coverOf(a))) ||
  Number(isFeatured(b)) - Number(isFeatured(a)) ||
  firstReach(b) - firstReach(a) ||
  projectKey(a).localeCompare(projectKey(b));

const groups = categories.map((category) => ({
  category,
  slug: slugOf(category),
  items: projects.filter((p) => inCategory(p, category)).sort(order),
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

const currentUrl = () => `${location.pathname}${location.search}${location.hash}`;
const urlFor = (filter: Filter, query: string) => {
  const params = new URLSearchParams();
  if (filter !== 'all') params.set('p', slugOf(filter));
  if (query.trim()) params.set('q', query.trim());
  const search = params.toString();
  return `${location.pathname}${search ? `?${search}` : ''}${location.hash}`;
};
// Lets the header update its language links, which carry the filters along.
const announce = () => window.dispatchEvent(new Event('urlchange'));

/** Every title, grouped by platform, with search, platform filters and a shareable URL. */
export function ProjectGallery() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [ready, setReady] = useState(false);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Shareable state (?p=<platform>&q=<search>), read after hydration so the prerendered page
  // (everything shown) matches the first client render. Back and forward restore it too.
  useEffect(() => {
    const readUrl = () => {
      const params = new URLSearchParams(location.search);
      setFilter(categories.find((c) => slugOf(c) === params.get('p')) ?? 'all');
      setQuery(params.get('q') ?? '');
    };
    readUrl();
    setReady(true);
    window.addEventListener('popstate', readUrl);
    return () => window.removeEventListener('popstate', readUrl);
  }, []);

  // Typing replaces the current history entry; picking a filter adds one (see choose).
  useEffect(() => {
    if (!ready) return;
    const url = urlFor(filter, query);
    if (url === currentUrl()) return;
    history.replaceState(null, '', url);
    announce();
  }, [ready, filter, query]);

  // Phones: the toolbar scrolls away, so a button brings it back once it is out of view.
  useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return;
    const observer = new IntersectionObserver(([entry]) => setToolbarVisible(entry.isIntersecting));
    observer.observe(toolbar);
    return () => observer.disconnect();
  }, []);

  const choose = (next: Filter, nextQuery = query) => {
    setFilter(next);
    setQuery(nextQuery);
    const url = urlFor(next, nextQuery);
    if (url === currentUrl()) return;
    history.pushState(null, '', url);
    announce();
  };

  const backToSearch = () => {
    toolbarRef.current?.scrollIntoView({ block: 'start' });
    searchRef.current?.focus({ preventScroll: true });
  };

  const q = fold(query.trim());
  const matches = (p: Project) => !q || (haystack.get(p) ?? '').includes(q);
  // "All" lists each title once, under its main platform; a platform filter also shows its ports.
  const shown = (p: Project, group: Category) => (filter === 'all' ? p.category === group : filter === group) && matches(p);
  const count = projects.filter((p) => (filter === 'all' || inCategory(p, filter)) && matches(p)).length;

  return (
    <Section
      id="gallery"
      level={1}
      title={t(ui.gallery.title)(projects.length)}
      subtitle={t(ui.gallery.intro)()}
      lead={
        <a className={styles.back} href={pagePath(lang, 'home')}>
          <Icon name="arrowRight" size={16} />
          {t(ui.gallery.back)}
        </a>
      }
    >
      <div ref={toolbarRef} className={styles.toolbar}>
        <div className={styles.searchRow}>
          <label className={styles.search}>
            <span className="sr-only">{t(ui.gallery.search)}</span>
            <Icon name="search" size={18} />
            <input
              ref={searchRef}
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
          <button type="button" className={styles.clear} onClick={() => choose('all', '')} disabled={filter === 'all' && !query}>
            {t(ui.gallery.clear)}
          </button>
        </div>

        <div className={styles.filtersWrap}>
          <div className={styles.filters} role="group" aria-label={t(ui.gallery.filters)}>
            {(['all', ...categories] as Filter[]).map((f) => (
              <button key={f} type="button" className={styles.filter} aria-pressed={filter === f} onClick={() => choose(f)}>
                {f === 'all' ? t(ui.gallery.all) : t(categoryInfo[f].label)}
                <span className={styles.filterCount}>{totalFor(f)}</span>
              </button>
            ))}
          </div>
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

      <button type="button" className={styles.toSearch} hidden={toolbarVisible} onClick={backToSearch} aria-label={t(ui.gallery.toSearch)}>
        <Icon name="search" size={18} />
        <span aria-hidden="true">{t(ui.gallery.toSearchShort)}</span>
      </button>
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
        <Cover project={project} sizes="(max-width: 560px) 88px, 280px" />
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
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} — ${t(linkLabel(url).long)} ${t(ui.a11y.newTab)}`}
              >
                {t(linkLabel(url).short)}
                <Icon name="external" size={12} />
              </a>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}
