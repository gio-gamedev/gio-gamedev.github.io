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
    .map((category) => `${t(categoryInfo[category].label)} ${projects.filter((p) => inCategory(p, category)).length}`)
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

      {/* The full list, with an image for every project, lives on its own page. */}
      <div className={styles.more}>
        <div>
          <h3 className={styles.moreTitle}>{t(ui.projects.moreTitle)}</h3>
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
