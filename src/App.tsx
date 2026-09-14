import { useEffect, type ComponentType } from 'react';
import { Approach } from './components/Approach';
import { Awards } from './components/Awards';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { WorkSamples } from './components/WorkSamples';
import { testimonials } from './content/profile';
import { ui } from './content/ui';
import { useLang } from './i18n/LanguageContext';

// Proof first (projects, work samples), then history, method and skills.
// Sections are numbered in this order, so optional ones don't leave gaps.
const sections: ComponentType<{ index: string }>[] = [
  Projects,
  WorkSamples,
  Experience,
  ...(testimonials.length > 0 ? [Testimonials] : []),
  Approach,
  Skills,
  Awards,
  Education,
  Contact,
];

export function App() {
  const { t } = useLang();

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
        <Hero />
        {sections.map((SectionComponent, i) => (
          <SectionComponent key={i} index={String(i + 1).padStart(2, '0')} />
        ))}
      </main>
      <Footer />
    </>
  );
}
