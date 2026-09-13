import { useMemo, useState } from 'react';
import {
  categories,
  categoryInfo,
  projects,
  storeLabel,
  testingLabels,
  type Category,
  type Project,
} from '../content/projects';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import styles from './ProjectIndex.module.css';

type Filter = Category | 'all';

// Grouped by category order, then alphabetically within each category.
const sorted = [...projects].sort(
  (a, b) => categories.indexOf(a.category) - categories.indexOf(b.category) || a.name.localeCompare(b.name),
);

// Skip platforms the category already names ("Roblox · Roblox", "Fortnite/UEFN · Fortnite").
const extraPlatforms = (p: Project) =>
  p.platforms.filter((x) => !p.category.toLowerCase().includes(x.toLowerCase()));

export function ProjectIndex() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>('all');

  const counts = useMemo(() => {
    const result = {} as Record<Category, number>;
    for (const c of categories) result[c] = projects.filter((p) => p.category === c).length;
    return result;
  }, []);

  const visible = filter === 'all' ? sorted : sorted.filter((p) => p.category === filter);

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <h3 className={styles.title}>{t(ui.projects.indexTitle)}</h3>
        <p className={styles.count} aria-live="polite">
          {t(ui.projects.count)(visible.length)}
        </p>
      </div>

      <div className={styles.filters} role="group" aria-label={t(ui.projects.filterLabel)}>
        <button type="button" className={styles.filter} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
          {t(ui.projects.all)}
          <span className={styles.filterCount}>{projects.length}</span>
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={styles.filter}
            data-tone={categoryInfo[c].tone}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {t(categoryInfo[c].label)}
            <span className={styles.filterCount}>{counts[c]}</span>
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {visible.map((p) => (
          <li key={p.name} className={styles.row} data-tone={categoryInfo[p.category].tone}>
            <div className={styles.main}>
              <span className={styles.name}>
                {p.name}
                {p.selected && (
                  <span className={styles.star} title={t(ui.projects.featured)}>
                    ★<span className="sr-only">{t(ui.projects.featured)}</span>
                  </span>
                )}
              </span>
              <span className={styles.meta}>
                {t(categoryInfo[p.category].label)}
                {extraPlatforms(p).length > 0 && ` · ${extraPlatforms(p).join(', ')}`}
              </span>
              <span className={styles.tests}>{p.testing.map((x) => t(testingLabels[x])).join(' · ')}</span>
            </div>
            {p.link && (
              <a
                className={styles.rowLink}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.name} — ${t(storeLabel(p.link))}`}
              >
                <Icon name="external" size={16} />
              </a>
            )}
          </li>
        ))}
      </ul>

      <p className={styles.note}>🔒 {t(ui.projects.confidential)}</p>
    </div>
  );
}
