import { monthYear, present } from '../content/dates';
import {
  approach,
  award,
  certifications,
  education,
  experience,
  gameDev,
  languages,
  profile,
  skills,
} from '../content/profile';
import { categoryInfo, featuredProjects, gameCount, projectName } from '../content/projects';
import { formatReach } from '../content/reach';
import { SITE_URL } from '../content/site';
import type { L, Lang } from '../content/types';

// One source for both resumes: CvDocument renders it to HTML (printed to PDF), scripts/cv-docx.mjs
// writes it as Word. ATS-friendly: one column, standard headings, plain text.

export type CvBlock =
  | { kind: 'p'; label?: string; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'job'; title: string; dates: string; bullets: string[]; notes: string[] };

export type CvData = {
  name: string;
  title: string;
  contact: { text: string; href?: string }[];
  sections: { heading: string; blocks: CvBlock[] }[];
};

const heading = {
  summary: { en: 'Summary', pt: 'Resumo' },
  skills: { en: 'Skills', pt: 'Competências' },
  experience: { en: 'Experience', pt: 'Experiência' },
  projects: { en: 'Selected Projects', pt: 'Projetos em Destaque' },
  awards: { en: 'Awards', pt: 'Prêmios' },
  education: { en: 'Education', pt: 'Formação' },
  gameDev: { en: 'Game Development Background', pt: 'Desenvolvimento de Games' },
  certifications: { en: 'Certifications', pt: 'Certificações' },
  languages: { en: 'Languages', pt: 'Idiomas' },
  tools: { en: 'Tools', pt: 'Ferramentas' },
  platforms: { en: 'Platforms', pt: 'Plataformas' },
  projectsLead: {
    en: `${gameCount}+ game projects tested. Selected titles:`,
    pt: `Mais de ${gameCount} projetos de games testados. Títulos selecionados:`,
  },
} satisfies Record<string, L>;

const plain = (text: string) => text.replace(/\*\*/g, '');
const bare = (url: string) => url.replace(/^https?:\/\//, '');

export function cvData(lang: Lang): CvData {
  const t = <T>(value: L<T>) => value[lang];
  const { links } = profile;
  const jobs = experience.flatMap((group) => group.jobs);

  return {
    name: profile.name,
    title: t(profile.title),
    contact: [
      { text: t({ en: 'Brazil (UTC−3) · Remote', pt: 'Brasil (UTC−3) · Remoto' }) },
      { text: links.email, href: `mailto:${links.email}` },
      { text: bare(links.linkedin), href: links.linkedin },
      { text: bare(links.github), href: links.github },
      { text: bare(SITE_URL), href: `${SITE_URL}/` },
    ],
    sections: [
      {
        heading: t(heading.summary),
        blocks: [
          { kind: 'p', text: `${plain(t(approach.lead))} ${t(approach.technical)}` },
          { kind: 'p', text: `${t(profile.openTo)}. ${t(profile.availability)}.` },
        ],
      },
      {
        heading: t(heading.skills),
        blocks: skills.map((group) => ({ kind: 'p', label: t(group.title), text: t(group.items).join(', ') })),
      },
      {
        heading: t(heading.experience),
        blocks: jobs.map((job) => ({
          kind: 'job',
          title: `${t(job.role)} — ${job.company}`,
          dates: `${monthYear(job.start, lang)} – ${job.end ? monthYear(job.end, lang) : t(present)}`,
          bullets: [...t(job.bullets), ...(job.more ? t(job.more) : [])],
          notes: [
            ...(job.highlight ? [t(job.highlight.stats)] : []),
            // Per-job tool lines stay on the site; the Skills section already lists every tool.
            ...(job.highlight?.note ? [t(job.highlight.note)] : []),
          ],
        })),
      },
      {
        heading: t(heading.projects),
        blocks: [
          { kind: 'p', text: t(heading.projectsLead) },
          {
            kind: 'list',
            items: featuredProjects.map((p) =>
              [
                `${projectName(p, lang)} (${[t(categoryInfo[p.category].label), p.studio].filter(Boolean).join(', ')})`,
                p.reach ? formatReach(p.reach, lang) : '',
              ]
                .filter(Boolean)
                .join(' — '),
            ),
          },
        ],
      },
      {
        heading: t(heading.awards),
        blocks: [{ kind: 'p', text: `${t(award.title)} (${award.org})` }],
      },
      {
        heading: t(heading.education),
        blocks: [
          {
            kind: 'list',
            items: education.map((item) => `${t(item.degree)} — ${item.institution} (${item.start}–${item.end})`),
          },
        ],
      },
      {
        // Kept short to hold the resume at two pages: game jams and GDDs only, with the note on the
        // first item of each (the Producer credit and the requirements count). The site has the rest.
        heading: t(heading.gameDev),
        blocks: gameDev.groups
          .filter((group) => group.label.en === 'Game jams' || group.label.en === 'Game design documents')
          .map((group) => ({
            kind: 'p',
            label: t(group.label),
            text: group.items
              .map((item, i) => {
                const name = typeof item.name === 'string' ? item.name : t(item.name);
                return i === 0 && item.note ? `${name} (${t(item.note)})` : name;
              })
              .join(', '),
          })),
      },
      {
        heading: t(heading.certifications),
        blocks: [
          { kind: 'p', text: certifications.map((c) => [t(c.name), c.issuer, c.year].filter(Boolean).join(', ')).join('; ') },
        ],
      },
      {
        heading: t(heading.languages),
        blocks: [{ kind: 'p', text: t(languages) }],
      },
    ],
  };
}
