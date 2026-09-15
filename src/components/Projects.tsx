import { categories, categoryInfo, featuredProjects, inCategory, projectKey, projects } from '../content/projects';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../i18n/routes';
import { BrandStrip } from './BrandStrip';
import { Icon } from './Icon';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';
import styles from './Projects.module.css';

export function Projects({ index }: { index: string }) {
  const { lang, t } = useLang();
  const counts = categories
    // No-break spaces keep each label and its count together when the line wraps ("PC / Steam 1").
    .map(
      (category) =>
        `${t(categoryInfo[category].label).replace(/ /g, ' ')} ${projects.filter((p) => inCategory(p, category)).length}`,
    )
    .join(' · ');

  return (
    <Section id="projects" index={index} title={t(ui.sections.projects)} subtitle={t(ui.sections.projectsSubtitle)}>
      <ul className={styles.featured}>
        {featuredProjects.map((project) => (
          <li key={projectKey(project)}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      <p className={styles.note}>
        <Icon name="info" size={15} />
        {t(ui.projects.publicNote)}
      </p>

      {/* Every title, with filters and search, lives on its own page. */}
      <div className={styles.more}>
        <div>
          <h3 className={styles.moreTitle}>{t(ui.projects.catalogTitle)}</h3>
          <p className={styles.moreCounts}>{counts}</p>
        </div>
        <a className="btn btn-primary" href={pagePath(lang, 'projects')}>
          {t(ui.projects.seeAll)(projects.length)}
          <Icon name="arrowRight" size={16} />
        </a>
      </div>

      <BrandStrip />
    </Section>
  );
}
