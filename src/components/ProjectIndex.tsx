import {
  categories,
  categoryInfo,
  categoryScope,
  projectKey,
  projectName,
  projects,
  storeLabel,
  testingLabels,
  universalTesting,
  type Project,
} from '../content/projects';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Icon } from './Icon';
import styles from './ProjectIndex.module.css';

const samePlatforms = (a: Project, b: Project) => a.platforms.join('|') === b.platforms.join('|');

// One panel per platform, featured projects first, then alphabetical. The typical scope is stated
// once per panel instead of repeating the same tags on every project.
const panels = categories.map((category) => {
  const items = projects
    .filter((p) => p.category === category)
    .sort(
      (a, b) => Number(Boolean(b.selected)) - Number(Boolean(a.selected)) || projectKey(a).localeCompare(projectKey(b)),
    );
  // Platforms only when every project shares them and they add to the category name ("Mobile" → "iOS · Android").
  const platforms = items.every((p) => samePlatforms(p, items[0]))
    ? items[0].platforms.filter((x) => !category.toLowerCase().includes(x.toLowerCase()))
    : [];
  const scope = categoryScope[category].filter((type) => !universalTesting.includes(type));
  return { category, items, platforms, scope, slug: category.toLowerCase().replace(/[^a-z]+/g, '-') };
});

export function ProjectIndex() {
  const { lang, t } = useLang();

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>{t(ui.projects.indexTitle)(projects.length)}</h3>
      <p className={styles.universal}>{t(ui.projects.universal)}</p>

      <div className={styles.panels}>
        {panels.map(({ category, items, platforms, scope, slug }) => {
          const info = categoryInfo[category];
          return (
            <section key={category} className={styles.panel} data-tone={info.tone} aria-labelledby={`index-${slug}`}>
              <div className={styles.panelHead}>
                <h4 id={`index-${slug}`} className={styles.panelTitle}>
                  {t(info.label)}
                </h4>
                <span className={styles.count}>{items.length}</span>
              </div>
              {platforms.length > 0 && <p className={styles.platforms}>{platforms.join(' · ')}</p>}
              <p className={styles.scope}>
                <span className={styles.scopeLabel}>{t(ui.projects.scope)}</span>
                {scope.map((type) => t(testingLabels[type])).join(' · ')}
              </p>

              <ul className={styles.names}>
                {items.map((p) => {
                  const name = projectName(p, lang);
                  return (
                    <li key={projectKey(p)}>
                      {p.link ? (
                        <a
                          className={styles.name}
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${name} — ${t(storeLabel(p.link))}`}
                        >
                          {name}
                          <Icon name="external" size={12} />
                        </a>
                      ) : (
                        <span className={styles.name}>{name}</span>
                      )}
                      {p.studio && <span className={styles.studio}>{p.studio}</span>}
                      {p.selected && (
                        <span className={styles.star} title={t(ui.projects.featured)}>
                          ★<span className="sr-only">{t(ui.projects.featured)}</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <p className={styles.note}>
        <Icon name="info" size={14} />
        {t(ui.projects.publicNote)}
      </p>
    </div>
  );
}
