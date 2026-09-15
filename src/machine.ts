// Machine-readable copies of the portfolio for screening tools and LLMs: /resume.json (JSON Resume)
// and /llms.txt. Both are generated from the same content as the page, so they never drift apart.
import { abbreviations } from './content/abbreviations';
import { fullDate, monthYear } from './content/dates';
import { assessment } from './content/evidence';
import {
  approach,
  certificates,
  contactFacts,
  education,
  experience,
  gameDev,
  heroFacts,
  languageList,
  languages,
  otherCertificates,
  profile,
  recognition,
  skills,
  testimonial,
} from './content/profile';
import {
  appCount,
  categories,
  categoryInfo,
  categoryNote,
  DEFAULT_STUDIO,
  evidenceOf,
  featuredProjects,
  gameCount,
  projectName,
  projects,
  type Project,
} from './content/projects';
import { formatReachWithSource } from './content/reach';
import { SITE_URL } from './content/site';

const plain = (text: string) => text.replace(/\*\*/g, '');
const summary = () => `${plain(approach.lead.en)} ${approach.technical.en}`;
const jobs = () => experience.flatMap((group) => group.jobs);
const itemName = (name: string | { en: string }) => (typeof name === 'string' ? name : name.en);
const pdfUrl = `${SITE_URL}${assessment.pdf}`;

/** "Tetragon (by Cafundó; Gameloft (telco), Lume Pad 3D)" */
const describe = (p: Project) => {
  const details = [
    ...(p.studio ? [p.studio] : []),
    ...(p.origin ? [`by ${p.origin}`] : []),
    ...(p.aka ? [`formerly ${p.aka}`] : []),
    ...(p.category === 'Publishing' || p.ports ? [p.platforms.join(', ')] : []),
  ];
  return `${projectName(p, 'en')}${details.length ? ` (${details.join('; ')})` : ''}`;
};

const educationLine = (item: (typeof education)[number]) =>
  [
    `course ${monthYear(item.start, 'en')} – ${monthYear(item.end, 'en')}`,
    ...(item.conferral ? [`degree conferred ${fullDate(item.conferral, 'en')}`] : []),
    ...(item.diploma ? [`diploma issued ${fullDate(item.diploma, 'en')}`] : []),
    ...(item.note ? [item.note.en] : []),
  ].join('; ');

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
      summary: job.highlight?.stats.en,
      highlights: job.bullets.en,
    })),
    education: education.map((item) => ({
      institution: item.institution,
      studyType: item.degree.en,
      startDate: item.start,
      endDate: item.end,
    })),
    awards: [
      {
        title: `${recognition.result.en} — ${recognition.event}`,
        date: recognition.year,
        summary: `${recognition.note.en} Team: ${recognition.team.map((m) => m.name).join(', ')}.`,
      },
    ],
    certificates: certificates.map((c) => ({ name: c.name.en, issuer: c.issuer, date: c.year })),
    skills: skills.map((group) => ({ name: group.title.en, keywords: group.items.en })),
    languages: languageList.map((l) => ({ language: l.name.en, fluency: l.level.en })),
    references: [
      {
        name: `${testimonial.author}, ${testimonial.role.en}`,
        reference: `${testimonial.translation} (translated from Portuguese)`,
      },
    ],
    projects: featuredProjects.map((p) => ({
      name: projectName(p, 'en'),
      description: [p.context?.en, p.contribution?.en].filter(Boolean).join(' '),
      entity: p.studio ?? DEFAULT_STUDIO,
      url: evidenceOf(p)?.url,
      highlights: p.reach ? [formatReachWithSource(p.reach, 'en')] : [],
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
    `> ${profile.headline.en} ${profile.location.en}. ${profile.availability.en}.`,
    '',
    `- Portfolio (English): ${SITE_URL}/`,
    `- Portfolio (Portuguese): ${SITE_URL}/pt/`,
    `- Full catalog (${projects.length} titles): ${SITE_URL}/projects/`,
    `- QA assessment, anonymized PDF (Portuguese): ${pdfUrl}`,
    `- Resume PDF (English): ${SITE_URL}${profile.cv.en}`,
    `- Resume PDF (Portuguese): ${SITE_URL}${profile.cv.pt}`,
    `- Resume Word (English): ${SITE_URL}${profile.cvDocx.en}`,
    `- Resume Word (Portuguese): ${SITE_URL}${profile.cvDocx.pt}`,
    `- JSON Resume: ${SITE_URL}/resume.json`,
    `- Email: ${profile.links.email}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    `- GitHub: ${profile.links.github}`,
    '',
    '## At a glance',
    ...heroFacts.map((fact) => `- ${fact.value} ${fact.label.en}`),
    ...contactFacts.map((fact) => `- ${fact.label.en}: ${fact.value.en}`),
    '',
    '## Summary',
    summary(),
    '',
    '## Experience',
    ...jobs().flatMap((job) => [
      `### ${job.role.en} — ${job.company} (${job.start} – ${job.end ?? 'present'})`,
      ...job.bullets.en.map((b) => `- ${b}`),
      ...(job.highlight ? [`- ${job.highlight.stats.en}`] : []),
      ...(job.tools ? [`- Tools: ${job.tools}`] : []),
      '',
    ]),
    '## Skills',
    ...skills.map((group) => `- ${group.title.en}: ${group.items.en.join(', ')}`),
    '',
    '## Projects',
    `${gameCount} games tested (${projects.length} titles including ${appCount} web apps). Public figures are product numbers with their source and the month checked; they reflect the whole team's work. Studio: ${DEFAULT_STUDIO} unless noted.`,
    '',
    '### Selected',
    ...featuredProjects.map((p) =>
      [
        `- ${projectName(p, 'en')} (${categoryInfo[p.category].label.en}${p.studio ? `, ${p.studio}` : ''})`,
        p.context ? `Context: ${p.context.en}` : '',
        p.contribution ? `My contribution: ${p.contribution.en}` : '',
        formatReachWithSource(p.reach, 'en'),
        evidenceOf(p)?.url ?? '',
      ]
        .filter(Boolean)
        .join(' — '),
    ),
    '',
    '### All titles by platform',
    ...categories.flatMap((category) => [
      `- ${categoryInfo[category].label.en}${categoryNote[category] ? ` (${categoryNote[category].en})` : ''}: ${projects
        .filter((p) => p.category === category)
        .map((p) => [describe(p), formatReachWithSource(p.reach, 'en')].filter(Boolean).join(' — '))
        .join('; ')}`,
    ]),
    '',
    '## QA evidence',
    `- ${assessment.title.en} (${assessment.badge.en}): ${assessment.summary.en} ${assessment.stats
      .map((s) => `${s.value} ${s.label.en}`)
      .join('; ')}. Anonymized PDF: ${pdfUrl}`,
    '',
    '## Recognition',
    `- ${recognition.result.en} — ${recognition.event} (${recognition.year}). ${recognition.note.en} Team: ${recognition.team
      .map((m) => m.name)
      .join(', ')}. Video: ${recognition.video}`,
    `- Testimonial from ${testimonial.author} (${testimonial.role.en}; ${testimonial.context.en}), translated from Portuguese: "${testimonial.translation}"`,
    '',
    '## Education',
    ...education.map((item) => `- ${item.degree.en} — ${item.institution} (${educationLine(item)})`),
    '',
    '## Certificates',
    ...certificates.map((c) => `- ${c.name.en} — ${c.issuer} — ${c.date.en}`),
    ...otherCertificates.map((c) => `- ${c.en}`),
    '',
    '## Game development background',
    ...gameDev.groups.map(
      (group) =>
        `- ${group.label.en}: ${group.items
          .map((item) => (item.note ? `${itemName(item.name)} (${item.note.en})` : itemName(item.name)))
          .join(', ')}`,
    ),
    '',
    '## Languages',
    `- ${languages.en}`,
    '',
    '## Abbreviations',
    ...Object.entries(abbreviations).map(([key, value]) => `- ${key}: ${value.en}`),
    '',
  ].join('\n');
}
