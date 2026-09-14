// Machine-readable copies of the portfolio for screening tools and LLMs: /resume.json (JSON Resume)
// and /llms.txt. Both are generated from the same content as the page, so they never drift apart.
// Drafts are never included (they live in a module the published build leaves out).
import { abbreviations } from './content/abbreviations';
import {
  approach,
  award,
  certifications,
  education,
  experience,
  gameDev,
  languageList,
  languages,
  profile,
  skills,
  snapshot,
} from './content/profile';
import {
  categories,
  categoryInfo,
  DEFAULT_STUDIO,
  featuredProjects,
  gameCount,
  projectName,
  projects,
} from './content/projects';
import { compactCount, formatReach, totalReach } from './content/reach';
import { SITE_URL } from './content/site';
import { workSamples } from './content/workSamples';

const plain = (text: string) => text.replace(/\*\*/g, '');
const summary = () => `${plain(approach.lead.en)} ${approach.technical.en}`;
const jobs = () => experience.flatMap((group) => group.jobs);
const itemName = (name: string | { en: string }) => (typeof name === 'string' ? name : name.en);

export function resumeJson() {
  return {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: profile.name,
      label: profile.title.en,
      image: `${SITE_URL}/avatar.webp`,
      email: profile.links.email,
      url: `${SITE_URL}/`,
      summary: summary(),
      location: { countryCode: 'BR' },
      profiles: [
        { network: 'LinkedIn', username: 'giogamedev', url: profile.links.linkedin },
        { network: 'GitHub', username: 'gio-gamedev', url: profile.links.github },
      ],
    },
    work: jobs().map((job) => ({
      name: job.company,
      position: job.role.en,
      startDate: job.start,
      endDate: job.end,
      summary: [job.highlight?.stats.en, job.highlight?.note?.en].filter(Boolean).join('. ') || undefined,
      highlights: [...job.bullets.en, ...(job.more?.en ?? [])],
    })),
    education: education.map((item) => ({
      institution: item.institution,
      studyType: item.degree.en,
      startDate: item.start,
      endDate: item.end,
    })),
    awards: [{ title: award.title.en, date: award.year, awarder: 'Meta', summary: award.note.en }],
    certificates: certifications.map((c) => ({ name: c.name.en, issuer: c.issuer, date: c.year })),
    skills: skills.map((group) => ({ name: group.title.en, keywords: group.items.en })),
    languages: languageList.map((l) => ({ language: l.name.en, fluency: l.level.en })),
    projects: featuredProjects.map((p) => ({
      name: projectName(p, 'en'),
      description: p.focus?.en,
      entity: p.studio ?? DEFAULT_STUDIO,
      url: p.link,
      highlights: p.reach ? [formatReach(p.reach, 'en')] : [],
      keywords: [categoryInfo[p.category].label.en, ...p.testing],
      roles: ['QA Analyst'],
    })),
    meta: {
      canonical: `${SITE_URL}/resume.json`,
      version: 'v1.0.0',
      lastModified: new Date(__BUILD_DATE__).toISOString().slice(0, 19),
    },
  };
}

export function llmsTxt(): string {
  return [
    `# ${profile.name} — ${profile.title.en}`,
    '',
    `> ${profile.headline.en} ${profile.openTo.en}.`,
    '',
    `- Portfolio (English): ${SITE_URL}/`,
    `- Portfolio (Portuguese): ${SITE_URL}/pt/`,
    `- Resume PDF (English): ${SITE_URL}${profile.cv.en}`,
    `- Resume PDF (Portuguese): ${SITE_URL}${profile.cv.pt}`,
    `- Resume Word (English): ${SITE_URL}${profile.cvDocx.en}`,
    `- Resume Word (Portuguese): ${SITE_URL}${profile.cvDocx.pt}`,
    `- JSON Resume: ${SITE_URL}/resume.json`,
    `- Email: ${profile.links.email}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    `- GitHub: ${profile.links.github}`,
    '',
    '## Recruiter snapshot',
    ...snapshot.map((row) => `- ${row.label.en}: ${row.value.en}`),
    '',
    '## Summary',
    summary(),
    '',
    '## Experience',
    ...jobs().flatMap((job) => [
      `### ${job.role.en} — ${job.company} (${job.start} – ${job.end ?? 'present'})`,
      ...[...job.bullets.en, ...(job.more?.en ?? [])].map((b) => `- ${b}`),
      ...(job.highlight ? [`- ${job.highlight.stats.en}`] : []),
      ...(job.highlight?.note ? [`- ${job.highlight.note.en}`] : []),
      ...(job.tools ? [`- Tools: ${job.tools}`] : []),
      '',
    ]),
    '## Skills',
    ...skills.map((group) => `- ${group.title.en}: ${group.items.en.join(', ')}`),
    '',
    '## Projects',
    `${gameCount}+ game projects tested; the titles with public figures add up to ${compactCount(totalReach, 'en')} downloads and visits. Studio: ${DEFAULT_STUDIO} unless noted.`,
    '',
    '### Selected',
    ...featuredProjects.map((p) =>
      [
        `- ${projectName(p, 'en')} (${categoryInfo[p.category].label.en}${p.studio ? `, ${p.studio}` : ''})`,
        p.reach ? formatReach(p.reach, 'en') : '',
        p.focus?.en ?? '',
        p.link ?? '',
      ]
        .filter(Boolean)
        .join(' — '),
    ),
    '',
    '### All projects by platform',
    ...categories.map(
      (category) =>
        `- ${categoryInfo[category].label.en}: ${projects
          .filter((p) => p.category === category)
          .map((p) => `${projectName(p, 'en')}${p.studio ? ` (${p.studio})` : ''}`)
          .join(', ')}`,
    ),
    '',
    '## Work samples',
    ...workSamples.map(
      (sample) =>
        `- ${sample.title.en} (${sample.disclaimer ? 'real document, anonymized' : 'example with fictional data'}): ${SITE_URL}/#sample-${sample.id}`,
    ),
    '',
    '## Awards',
    `- ${award.title.en} (${award.org})`,
    '',
    '## Education',
    ...education.map((item) => `- ${item.degree.en} — ${item.institution} (${item.start}–${item.end})`),
    '',
    '## Game development background',
    ...gameDev.groups.map(
      (group) =>
        `- ${group.label.en}: ${group.items
          .map((item) => (item.note ? `${itemName(item.name)} (${item.note.en})` : itemName(item.name)))
          .join(', ')}`,
    ),
    '',
    '## Certifications',
    ...certifications.map((c) => `- ${[c.name.en, c.issuer, c.year].filter(Boolean).join(' — ')}`),
    '',
    '## Languages',
    `- ${languages.en}`,
    '',
    '## Abbreviations',
    ...Object.entries(abbreviations).map(([key, value]) => `- ${key}: ${value.en}`),
    '',
  ].join('\n');
}
