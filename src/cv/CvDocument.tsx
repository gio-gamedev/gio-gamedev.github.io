import { monthYear, present } from '../content/dates';
import {
  approach,
  award,
  certifications,
  earlierExperience,
  education,
  experience,
  languages,
  profile,
  skills,
} from '../content/profile';
import { categoryInfo, featuredProjects } from '../content/projects';
import { SITE_URL } from '../content/site';
import type { L, Lang } from '../content/types';

// ATS-friendly resume: one column, standard headings, plain text, no tables or icons.
// Rendered to dist/cv/ and dist/pt/cv/ by scripts/prerender.mjs, printed to PDF by scripts/cv-pdf.mjs.

const heading = {
  summary: { en: 'Summary', pt: 'Resumo' },
  skills: { en: 'Skills', pt: 'Competências' },
  experience: { en: 'Experience', pt: 'Experiência' },
  projects: { en: 'Selected Projects', pt: 'Projetos em Destaque' },
  awards: { en: 'Awards', pt: 'Prêmios' },
  education: { en: 'Education', pt: 'Formação' },
  certifications: { en: 'Certifications', pt: 'Certificações' },
  languages: { en: 'Languages', pt: 'Idiomas' },
  tools: { en: 'Tools', pt: 'Ferramentas' },
} satisfies Record<string, L>;

export const cvTitle: L = {
  en: `${profile.name} — Game QA Analyst — Resume`,
  pt: `${profile.name} — Analista de QA de Games — Currículo`,
};

const plain = (text: string) => text.replace(/\*\*/g, '');
const bare = (url: string) => url.replace(/^https?:\/\//, '');

export function CvDocument({ lang }: { lang: Lang }) {
  const t = <T,>(value: L<T>) => value[lang];
  const { links } = profile;
  const jobs = experience.flatMap((group) => group.jobs);

  return (
    <main className="cv">
      <header>
        <h1>{profile.name}</h1>
        <p className="title">{t(profile.title)}</p>
        {/* Items never break inside (a URL split at its hyphen extracts as the wrong address);
            the line wraps only at the separators. */}
        <p className="contact">
          <span>{t({ en: 'Brazil (UTC−3) · Remote', pt: 'Brasil (UTC−3) · Remoto' })}</span>
          {' | '}
          <span>
            <a href={`mailto:${links.email}`}>{links.email}</a>
          </span>
          {' | '}
          <span>
            <a href={links.linkedin}>{bare(links.linkedin)}</a>
          </span>
          {' | '}
          <span>
            <a href={links.github}>{bare(links.github)}</a>
          </span>
          {' | '}
          <span>
            <a href={`${SITE_URL}/`}>{bare(SITE_URL)}</a>
          </span>
        </p>
      </header>

      <section>
        <h2>{t(heading.summary)}</h2>
        <p>
          {plain(t(approach.lead))} {t(approach.technical)}
        </p>
        <p>
          {t(profile.openTo)}. {t(profile.availability)}.
        </p>
      </section>

      <section>
        <h2>{t(heading.skills)}</h2>
        {skills.map((group) => (
          <p key={group.title.en}>
            <strong>{t(group.title)}:</strong> {t(group.items).join(', ')}
          </p>
        ))}
      </section>

      <section>
        <h2>{t(heading.experience)}</h2>
        {jobs.map((job) => (
          <article key={job.company}>
            <h3>
              {t(job.role)} — {job.company}
            </h3>
            <p className="dates">
              {monthYear(job.start, lang)} – {job.end ? monthYear(job.end, lang) : t(present)}
            </p>
            <ul>
              {[...t(job.bullets), ...(job.more ? t(job.more) : [])].map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {job.highlight && <p>{t(job.highlight.stats)}</p>}
            {job.tools && (
              <p>
                <strong>{t(heading.tools)}:</strong> {job.tools}
              </p>
            )}
          </article>
        ))}
        <p>{t(earlierExperience.text)}</p>
      </section>

      <section>
        <h2>{t(heading.projects)}</h2>
        <ul>
          {featuredProjects.map((p) => (
            <li key={p.name}>
              <strong>{p.name}</strong> ({t(categoryInfo[p.category].label)}){p.focus ? ` — ${t(p.focus)}` : ''}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t(heading.awards)}</h2>
        <p>
          {t(award.title)} ({award.org})
        </p>
      </section>

      <section>
        <h2>{t(heading.education)}</h2>
        {education.map((item) => (
          <p key={item.institution}>
            {t(item.degree)} — {item.institution} ({item.start}–{item.end})
          </p>
        ))}
      </section>

      <section>
        <h2>{t(heading.certifications)}</h2>
        <ul>
          {certifications.map((c) => (
            <li key={c.name.en}>{[t(c.name), c.issuer, c.year].filter(Boolean).join(' — ')}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t(heading.languages)}</h2>
        <p>{t(languages)}</p>
      </section>
    </main>
  );
}
