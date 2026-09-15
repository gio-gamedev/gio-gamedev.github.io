import { fullDate, monthYear, present } from '../content/dates';
import { approach, certificates, education, experience, gameDev, languages, profile, recognition, skills } from '../content/profile';
import { categoryInfo, featuredProjects, projectName } from '../content/projects';
import { formatReachWithSource } from '../content/reach';
import { SITE_URL } from '../content/site';
import type { L, Lang } from '../content/types';

// One source for both resumes: CvDocument renders it to HTML (printed to PDF), scripts/cv-docx.mjs
// writes it as Word. ATS-friendly: one column, standard headings, plain selectable text, no hidden
// or repeated keywords.

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
  gameDev: { en: 'Game Development Background', pt: 'Desenvolvimento de Jogos' },
  certifications: { en: 'Certifications', pt: 'Certificações' },
  languages: { en: 'Languages', pt: 'Idiomas' },
  // Fixed "100+" so the resume text doesn't go stale as the catalog grows.
  projectsLead: {
    en: '100+ games tested. Selected titles (public figures belong to each product and its whole team):',
    pt: 'Mais de 100 jogos testados. Títulos selecionados (os números públicos são de cada produto e de todo o time):',
  },
  teamAward: { en: 'team award', pt: 'prêmio de equipe' },
  course: { en: 'course', pt: 'curso' },
  conferral: { en: 'degree conferred', pt: 'colação de grau em' },
  diploma: { en: 'diploma issued', pt: 'diploma emitido em' },
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
          { kind: 'p', text: `${t(profile.location)}. ${t(profile.availability)}.` },
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
          bullets: t(job.bullets),
          notes: job.highlight ? [t(job.highlight.stats)] : [],
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
                formatReachWithSource(p.reach, lang),
              ]
                .filter(Boolean)
                .join(' — '),
            ),
          },
        ],
      },
      {
        heading: t(heading.awards),
        blocks: [
          { kind: 'p', text: `${t(recognition.result)} — ${recognition.event} (${recognition.year}), ${t(heading.teamAward)}` },
        ],
      },
      {
        heading: t(heading.education),
        blocks: [
          {
            kind: 'list',
            items: education.map((item) => {
              const dates = [
                `${t(heading.course)} ${monthYear(item.start, lang)} – ${monthYear(item.end, lang)}`,
                ...(item.conferral ? [`${t(heading.conferral)} ${fullDate(item.conferral, lang)}`] : []),
                ...(!item.conferral && item.diploma ? [`${t(heading.diploma)} ${fullDate(item.diploma, lang)}`] : []),
              ].join('; ');
              return `${t(item.degree)} — ${item.institution} (${dates})`;
            }),
          },
        ],
      },
      {
        // Kept short to hold the resume at two pages: game jams and GDDs only, with the note on the
        // first item of each. The site has the rest.
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
          {
            kind: 'p',
            text: certificates
              .filter((c) => !c.masked)
              .map((c) => `${t(c.name)}, ${c.issuer}, ${c.year}`)
              .join('; '),
          },
        ],
      },
      {
        heading: t(heading.languages),
        blocks: [{ kind: 'p', text: t(languages) }],
      },
    ],
  };
}
