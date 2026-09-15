import type { CSSProperties } from 'react';
import { categoryInfo, evidenceOf, projectName, type Project } from '../content/projects';
import { reachKindLabel, reachSource, reachValue } from '../content/reach';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { Cover } from './Cover';
import { Icon } from './Icon';
import { Tag } from './Tag';
import styles from './ProjectCard.module.css';

/** Featured project: context, what Giovanni did, and a public page as evidence of the product. */
export function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLang();
  const category = categoryInfo[project.category];
  const name = projectName(project, lang);
  const evidence = evidenceOf(project);
  // Platforms already named by the category tag ("Roblox", "Fortnite") are not repeated.
  const categoryLabel = t(category.label).toLowerCase();
  const meta = [
    ...project.platforms.filter((platform) => !categoryLabel.includes(platform.toLowerCase())),
    ...(project.studio ? [project.studio] : []),
  ];

  return (
    <article className={styles.card} style={{ '--tone': `var(--${category.tone})` } as CSSProperties}>
      <div className={styles.media}>
        <Cover project={project} name={name} sizes="(max-width: 640px) 92vw, (max-width: 980px) 46vw, 350px" />
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <Tag tone={category.tone}>{t(category.label)}</Tag>
          {meta.length > 0 && <span className={styles.platforms}>{meta.join(' · ')}</span>}
        </div>
        <h3 className={styles.name}>{name}</h3>

        {project.reach && (
          <div className={styles.reach}>
            <ul className={styles.figures}>
              {project.reach.map((r) => (
                <li key={r.kind}>
                  <strong>{reachValue(r, lang)}</strong> {t(reachKindLabel[r.kind])}
                </li>
              ))}
            </ul>
            <p className={styles.source}>{reachSource(project.reach, lang)}</p>
          </div>
        )}

        <dl className={styles.facts}>
          {project.context && (
            <div>
              <dt>{t(ui.projects.context)}</dt>
              <dd>{t(project.context)}</dd>
            </div>
          )}
          {project.contribution && (
            <div>
              <dt>{t(ui.projects.contribution)}</dt>
              <dd>{t(project.contribution)}</dd>
            </div>
          )}
          {evidence && (
            <div className={styles.evidence}>
              <dt>{t(ui.projects.evidence)}</dt>
              <dd>
                <a className={styles.link} href={evidence.url} target="_blank" rel="noreferrer">
                  {t(evidence.label)}
                  <span className="sr-only">
                    {' '}
                    — {name} {t(ui.a11y.newTab)}
                  </span>
                  <Icon name="external" size={15} />
                </a>
                <span className={styles.evidenceNote}>{t(ui.projects.evidenceNote)}</span>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}
