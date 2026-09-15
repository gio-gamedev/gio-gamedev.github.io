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
import { categoryInfo, featuredProjects, gameCountRounded, projectName } from '../content/projects';
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
  academic: { en: 'Academic Projects', pt: 'Projetos Acadêmicos' },
  certifications: { en: 'Certifications', pt: 'Certificações' },
  languages: { en: 'Languages', pt: 'Idiomas' },
  // Rounded down ("90+") so the printed resume doesn't go stale as the catalog grows.
  projectsLead: {
    en: `${gameCountRounded}+ games tested. Selected titles (public figures belong to each product and its whole team):`,
    pt: `${gameCountRounded}+ jogos testados. Títulos selecionados (os números públicos são de cada produto e de todo o time):`,
  },
  teamAward: { en: 'team award', pt: 'prêmio de equipe' },
} satisfies Record<string, L>;

const plain = (text: string) => text.replace(/\*\*/g, '');
const bare = (url: string) => url.replace(/^https?:\/\//, '');

export function cvData(lang: Lang): CvData {
  const t = <T>(value: L<T>) => value[lang];
  const { links } = profile;
  const dates = (job: { start: string; end?: string }) =>
    `${monthYear(job.start, lang)} – ${job.end ? monthYear(job.end, lang) : t(present)}`;

  return {
    name: profile.name,
    title: t(profile.title),
    contact: [
      { text: t({ en: 'Brazil (UTC−3) · Remote', pt: 'Brasil (UTC−3) · Remoto' }) },
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
        heading: t(heading.experience),
        // Game QA roles in full; earlier technology roles with their first line only.
        blocks: experience.flatMap((group) =>
          group.jobs.map((job): CvBlock => ({
            kind: 'job',
            title: `${t(job.role)} — ${job.company}`,
            dates: dates(job),
            bullets: group.compact ? t(job.bullets).slice(0, 1) : t(job.bullets),
            notes: job.note ? [t(job.note)] : [],
          })),
        ),
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
        heading: t(heading.academic),
        blocks: [
          {
            kind: 'p',
            text: academicProjects.items
              .map((item) => `${item.name}${item.start ? ` (${item.start.slice(0, 4)})` : ''}: ${t(item.note)}`)
              .join('; '),
          },
        ],
      },
      {
        heading: t(heading.certifications),
        blocks: [
          {
            kind: 'list',
            items: [
              `${t(efset.name)} — ${efset.score} ${efset.level} (${efset.sections
                // "Leitura (Reading)" → "Leitura": no nested parentheses.
                .map((s) => `${t(s.name).replace(/ \(.+\)$/, '')} ${s.score} ${s.level}`)
                .join('; ')}), ${t(efset.date)} — ${bare(efset.verify)}`,
              ...certificates.map((c) => `${t(c.name)}, ${c.issuer}, ${c.year}`),
              t(otherCertificates[0]),
            ],
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
