import { useState } from 'react';
import {
  categories,
  categoryInfo,
  featuredProjects,
  projectKey,
  projects,
  type Project,
} from '../content/projects';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../i18n/routes';
import { Icon } from './Icon';
import { ProjectCard } from './ProjectCard';
import { ProjectDetails } from './ProjectDetails';
import { Section } from './Section';
import styles from './Projects.module.css';

export function Projects() {
  const { lang, t } = useLang();
  const [detail, setDetail] = useState<Project | null>(null);
  // Each title counted once, under its main platform, so the line adds up to the total above it.
  const counts = categories
    // No-break spaces keep each label and its count together when the line wraps ("PC / Steam 1").
    .map(
      (category) =>
        `${t(categoryInfo[category].label).replace(/ /g, ' ')} ${projects.filter((p) => p.category === category).length}`,
    )
    .join(' · ');

  return (
    <Section id="projects" title={t(ui.sections.projects)} subtitle={t(ui.sections.projectsSubtitle)}>
      {/* Six cards of equal weight: three across, two on a tablet, one on a phone. */}
      <ul className={styles.featured}>
        {featuredProjects.map((project) => (
          <li key={projectKey(project)}>
            <ProjectCard project={project} onDetails={() => setDetail(project)} />
          </li>
        ))}
      </ul>

      <ProjectDetails project={detail} onClose={() => setDetail(null)} />

      <p className={styles.note}>
        <Icon name="info" size={15} />
        {t(ui.projects.publicNote)}
      </p>

      {/* Every title, with filters and search, lives on its own page. */}
      <div className={styles.more}>
        <div>
          <h3 className={styles.moreTitle}>{t(ui.projects.catalogTitle)}</h3>
          <p className={styles.moreSummary}>{t(ui.projects.catalogSummary)}</p>
          <p className={styles.moreCounts}>{counts}</p>
        </div>
        <a className="btn btn-primary" href={pagePath(lang, 'projects')}>
          {t(ui.projects.seeAll)}
          <Icon name="arrowRight" size={16} />
        </a>
      </div>
    </Section>
  );
}
