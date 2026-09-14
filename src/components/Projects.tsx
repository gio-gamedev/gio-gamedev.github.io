import { featuredProjects, projectKey } from '../content/projects';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LanguageContext';
import { BrandStrip } from './BrandStrip';
import { ProjectCard } from './ProjectCard';
import { ProjectIndex } from './ProjectIndex';
import { Section } from './Section';
import styles from './Projects.module.css';

export function Projects({ index }: { index: string }) {
  const { t } = useLang();

  return (
    <Section id="projects" index={index} title={t(ui.sections.projects)} subtitle={t(ui.sections.projectsSubtitle)}>
      <ul className={styles.featured}>
        {featuredProjects.map((project) => (
          <li key={projectKey(project)}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <BrandStrip />
      <ProjectIndex />
    </Section>
  );
}
