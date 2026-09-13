import { useEffect } from 'react';
import { About } from './components/About';
import { Awards } from './components/Awards';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Expertise } from './components/Expertise';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { WorkSamples } from './components/WorkSamples';
import { ui } from './content/ui';
import { useLang } from './i18n/LanguageContext';

export function App() {
  const { t } = useLang();

  useEffect(() => {
    document.title = t(ui.meta.title);
  }, [t]);

  return (
    <>
      <a href="#main" className="skip-link">
        {t(ui.a11y.skip)}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <WorkSamples />
        <Expertise />
        <Awards />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
