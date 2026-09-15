import { useEffect, type ComponentType } from 'react';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectGallery } from './components/ProjectGallery';
import { Projects } from './components/Projects';
import { Recognition } from './components/Recognition';
import { ui } from './content/ui';
import { useLang } from './i18n/LanguageContext';

// Selected projects first, then experience, recognition, education and contact. Sections are
// numbered in this order.
const sections: ComponentType<{ index: string }>[] = [Projects, Experience, Recognition, Education, Contact];

export function App() {
  const { page, t } = useLang();

  // Printing (or "Save as PDF") expands every collapsed section, then restores it.
  useEffect(() => {
    let expanded: HTMLDetailsElement[] = [];
    const expand = () => {
      expanded = [...document.querySelectorAll<HTMLDetailsElement>('details:not([open])')];
      expanded.forEach((d) => (d.open = true));
    };
    const restore = () => expanded.forEach((d) => (d.open = false));
    window.addEventListener('beforeprint', expand);
    window.addEventListener('afterprint', restore);
    return () => {
      window.removeEventListener('beforeprint', expand);
      window.removeEventListener('afterprint', restore);
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        {t(ui.a11y.skip)}
      </a>
      <Header />
      <main id="main">
        {page === 'projects' ? (
          <ProjectGallery />
        ) : (
          <>
            <Hero />
            {sections.map((SectionComponent, i) => (
              <SectionComponent key={i} index={String(i + 1).padStart(2, '0')} />
            ))}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
