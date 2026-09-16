import { monthYear, present } from '../content/dates';
import {
  academicProjects,
  certificates,
  education,
  efset,
  experience,
  languages,
  otherCertificates,
  profile,
  recognition,
  skills,
  summary,
} from '../content/profile';
import { categoryInfo, featuredProjects, gameCount, projectName } from '../content/projects';
import { formatReachWithSource } from '../content/reach';
import { SITE_URL } from '../content/site';
import type { L, Lang } from '../content/types';

// One source for both resumes: CvDocument renders it to HTML (printed to PDF), scripts/cv-docx.mjs
// writes it as Word. ATS-friendly: one column, standard headings, plain selectable text, no hidden
// or repeated keywords. Order follows what recruiters read first: what I did, then how, then proof.

export type CvBlock =
  | { kind: 'p'; label?: string; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'job'; title: string; dates: string; bullets: string[]; notes: string[] };

export type CvSection = {
  heading: string;
  blocks: CvBlock[];
  /** Starts a new page, so a page break never falls inside a role (PDF only). */
  break?: boolean;
};

export type CvData = {
  name: string;
  title: string;
  contact: { text: string; href?: string }[];
  sections: CvSection[];
};

const heading = {
  summary: { en: 'Summary', pt: 'Resumo' },
  skills: { en: 'Skills', pt: 'Competências' },
  experience: { en: 'Experience', pt: 'Experiência' },
  projects: { en: 'Selected Projects', pt: 'Projetos em Destaque' },
  awards: { en: 'Awards', pt: 'Prêmios' },
  education: { en: 'Education', pt: 'Formação' },
  academic: { en: 'Academic Projects', pt: 'Projetos Acadêmicos' },
  certifications: { en: 'Certifications', pt: 'Certificações' },
  languages: { en: 'Languages', pt: 'Idiomas' },
  // The same count as the site and the catalog: one number everywhere.
  projectsLead: {
    en: `${gameCount} games tested. Selected titles (public figures belong to each product and its whole team):`,
    pt: `${gameCount} jogos testados. Títulos selecionados (os números públicos são de cada produto e de todo o time):`,
  },
  teamAward: { en: 'team award', pt: 'prêmio de equipe' },
  // The section scores stay on the certificate itself, which the link verifies.
  efsetScope: { en: 'reading and listening', pt: 'leitura e compreensão oral' },
} satisfies Record<string, L>;

const plain = (text: string) => text.replace(/\*\*/g, '');
const bare = (url: string) => url.replace(/^https?:\/\//, '');

/**
 * Plain-text extraction of a PDF only sees painted characters, so wherever a page break falls
 * between two blocks a naive parser joins the last word of one page to the first of the next
 * ("…dispositivos de redeCOMPETÊNCIAS"). A real full stop at the end of every line gives it a token
 * boundary there, and reads as ordinary resume punctuation. Lines that end in an address are left
 * alone, so the full stop is never read as part of the URL.
 */
const endsInUrl = /(?:https?:\/\/\S+|\b[\w-]+\.[a-z]{2,}(?:\/\S*)?)$/i;
const stop = (text: string) => (/[.!?:]$/.test(text) || endsInUrl.test(text) ? text : `${text}.`);

const punctuate = (sections: CvSection[]): CvSection[] =>
  sections.map((section) => ({
    ...section,
    blocks: section.blocks.map((block): CvBlock => {
      if (block.kind === 'p') return { ...block, text: stop(block.text) };
      if (block.kind === 'list') return { ...block, items: block.items.map(stop) };
      return { ...block, bullets: block.bullets.map(stop), notes: block.notes.map(stop) };
    }),
  }));

export function cvData(lang: Lang): CvData {
  const t = <T>(value: L<T>) => value[lang];
  const { links } = profile;
  const dates = (job: { start: string; end?: string }) =>
    `${monthYear(job.start, lang)} – ${job.end ? monthYear(job.end, lang) : t(present)}`;

  const data = {
    name: profile.name,
    // The Portuguese resume carries the local job title too, so a search in Portuguese matches.
    title: lang === 'pt' ? `${t(profile.title)} (${profile.titleLocal.pt})` : t(profile.title),
    contact: [
      { text: t(profile.location) },
      { text: links.email, href: `mailto:${links.email}` },
      { text: bare(links.linkedin), href: links.linkedin },
      { text: bare(links.github), href: links.github },
      { text: `Discord: ${links.discord}` },
      { text: bare(SITE_URL), href: `${SITE_URL}/` },
    ],
    sections: [
      {
        heading: t(heading.summary),
        blocks: [
          { kind: 'p', text: `${plain(t(summary.lead))} ${t(summary.technical)}` },
          { kind: 'p', text: `${t(profile.location)}. ${t(profile.availability)}.` },
        ],
      },
      {
        heading: t(heading.experience),
        /*
         * Game QA roles in full. The earlier technology roles become one bulleted list: they are
         * context, not the point of the resume, and every line then starts with a real "•" glyph.
         * That matters because plain-text extraction only sees painted characters: if a page break
         * falls between two blocks, a naive parser glues the end of one page to the start of the
         * next ("…JavaScript e ReactDesenvolvedor de Sistemas Web"). The bullet keeps them apart.
         */
        blocks: experience.flatMap((group): CvBlock[] =>
          group.compact
            ? [
                {
                  kind: 'list',
                  items: group.jobs.map(
                    (job) => `${t(job.role)} — ${job.company} (${dates(job)}): ${plain(t(job.bullets)[0])}`,
                  ),
                },
              ]
            : group.jobs.map((job) => ({
                kind: 'job',
                title: `${t(job.role)} — ${job.company}`,
                dates: dates(job),
                bullets: t(job.bullets),
                notes: [...(job.leadNote ? [t(job.leadNote)] : []), ...(job.note ? [t(job.note)] : [])],
              })),
        ),
      },
      {
        heading: t(heading.skills),
        // Items like "SQL · REST APIs · JSON" use commas here, so one separator runs through the line.
        blocks: skills.map((group) => ({
          kind: 'p',
          label: t(group.title),
          text: t(group.items)
            .map((item) => item.replace(/ · /g, ', '))
            .join(', '),
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
            items: education.map(
              (item) =>
                `${t(item.degree)} — ${item.institution} (${monthYear(item.start, lang)} – ${monthYear(item.end, lang)}${
                  item.note ? `; ${t(item.note)}` : ''
                })`,
            ),
          },
        ],
      },
      {
        heading: t(heading.languages),
        blocks: [{ kind: 'p', text: t(languages) }],
      },
      {
        heading: t(heading.certifications),
        blocks: [
          {
            kind: 'list',
            items: [
              `${t(efset.name)} — ${efset.level} (${efset.score}, ${t(heading.efsetScope)}), ${t(efset.date)} — ${bare(efset.verify)}`,
              ...certificates.map((c) => `${t(c.name)}, ${c.issuer}, ${c.year}`),
              t(otherCertificates[0]),
            ],
          },
        ],
      },
      {
        // College work, last and in one line each: it carries less weight than the QA experience above.
        heading: t(heading.academic),
        blocks: [
          {
            kind: 'p',
            text: academicProjects.items.map((item) => `${item.name} (${t(item.short)})`).join('; '),
          },
        ],
      },
    ] satisfies CvSection[],
  };

  return { ...data, sections: punctuate(data.sections) };
}
