import { Contact } from '../components/Contact';
import { Education } from '../components/Education';
import { Experience } from '../components/Experience';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Recognition } from '../components/Recognition';

/**
 * The home page, in the order a recruiter reads it: who I am, the proof bar, selected projects,
 * experience with the QA toolkit, recognition, education and contact. Loaded on its own (see
 * src/main.tsx), so the catalog page's code never ships with it.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <Recognition />
      <Education />
      <Contact />
    </>
  );
}
