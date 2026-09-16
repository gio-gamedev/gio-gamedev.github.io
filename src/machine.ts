// Machine-readable copies of the portfolio for screening tools and LLMs: /resume.json (JSON Resume)
// and /llms.txt. Both are generated from the same content as the page, so they never drift apart.
import { abbreviations } from './content/abbreviations';
import { fullDate, monthYear } from './content/dates';
import {
  academicProjects,
  certificates,
  contactFacts,
  education,
  efset,
  experience,
  experienceIntro,
  heroFacts,
  languageList,
  languages,
  otherCertificates,
  profile,
  recognition,
  skills,
  summary,
  testimonial,
} from './content/profile';
import {
  appCount,
  brandGroups,
  categories,
  categoryInfo,
  categoryNote,
  DEFAULT_STUDIO,
  featuredProjects,
  gameCount,
  pageOf,
  projectName,
  projects,
  type Project,
} from './content/projects';
import { formatReachWithSource } from './content/reach';
import { SITE_URL } from './content/site';
import { ui } from './content/ui';

const plain = (text: string) => text.replace(/\*\*/g, '');
const summaryText = () => `${plain(summary.lead.en)} ${summary.technical.en}`;
const jobs = () => experience.flatMap((group) => group.jobs);
const efsetLine = `${efset.name.en} — ${efset.score} ${efset.level} (${efset.sections
  .map((s) => `${s.name.en} ${s.score} ${s.level}`)
  .join('; ')}), ${efset.date.en}. ${efset.scope.en} Verify: ${efset.verify}`;

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
    ...(item.note ? [item.note.en] : []),
    ...(item.conferral ? [`degree conferred ${fullDate(item.conferral, 'en')}`] : []),
    ...(item.diploma ? [`diploma issued ${fullDate(item.diploma, 'en')}`] : []),
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
      summary: summaryText(),
      location: { countryCode: 'BR' },
      profiles: [
        { network: 'LinkedIn', username: 'giogamedev', url: profile.links.linkedin },
        { network: 'GitHub', username: 'gio-gamedev', url: profile.links.github },
        { network: 'Discord', username: profile.links.discord },
      ],
    },
    work: jobs().map((job) => ({
      name: job.company,
      position: job.role.en,
      startDate: job.start,
      endDate: job.end,
      summary: job.note?.en,
      highlights: job.bullets.en.map(plain),
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
    certificates: [
      { name: `${efset.name.en} — ${efset.score} ${efset.level}`, issuer: efset.issuer, date: efset.iso, url: efset.verify },
      ...certificates.map((c) => ({ name: c.name.en, issuer: c.issuer, date: c.year })),
    ],
    skills: skills.map((group) => ({ name: group.title.en, keywords: group.items.en })),
    languages: languageList.map((l) => ({ language: l.name.en, fluency: l.level.en })),
    references: [
      {
        name: `${testimonial.author}, ${testimonial.role.en}`,
        reference: `${testimonial.quote} (original recommendation, in Portuguese) — reference translation: ${testimonial.translation}`,
      },
    ],
    projects: featuredProjects.map((p) => ({
      name: projectName(p, 'en'),
      description: [p.context?.en, ...(p.contribution?.en ?? []), p.compliance && `Compliance: ${p.compliance.en}`]
        .filter(Boolean)
        .join(' · '),
      entity: p.studio ?? DEFAULT_STUDIO,
      url: pageOf(p),
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
    `- Resume PDF (English): ${SITE_URL}${profile.cv.en}`,
    `- Resume PDF (Portuguese): ${SITE_URL}${profile.cv.pt}`,
    `- Resume Word (English): ${SITE_URL}${profile.cvDocx.en}`,
    `- Resume Word (Portuguese): ${SITE_URL}${profile.cvDocx.pt}`,
    `- JSON Resume: ${SITE_URL}/resume.json`,
    `- EF SET English Certificate (PDF): ${SITE_URL}${efset.pdf}`,
    `- Email: ${profile.links.email}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    `- GitHub: ${profile.links.github}`,
    `- Discord: ${profile.links.discord}`,
    '',
    '## At a glance',
    ...heroFacts.map((fact) => `- ${fact.value} ${fact.label.en}`),
    ...contactFacts.map((fact) => `- ${fact.label.en}: ${fact.value.en}`),
    '',
    '## Summary',
    summaryText(),
    '',
    '## Experience',
    experienceIntro.en,
    '',
    ...jobs().flatMap((job) => [
      `### ${job.role.en} — ${job.company} (${job.start} – ${job.end ?? 'present'})`,
      ...job.bullets.en.map((b) => `- ${plain(b)}`),
      ...(job.note ? [`- ${job.note.en}`] : []),
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
        p.context?.en ?? '',
        p.contribution ? `My contribution: ${p.contribution.en.join('; ')}` : '',
        p.compliance ? `Compliance: ${p.compliance.en}` : '',
        formatReachWithSource(p.reach, 'en'),
        pageOf(p) ?? '',
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
    '## Recognition',
    `- ${recognition.result.en} — ${recognition.event} (${recognition.year}). ${recognition.note.en} Team: ${recognition.team
      .map((m) => m.name)
      .join(', ')}. Video: ${recognition.video}`,
    `- Testimonial from ${testimonial.author} (${testimonial.role.en}; ${testimonial.context.en}), original in Portuguese: "${testimonial.quote}" — reference translation: "${testimonial.translation}"`,
    '',
    '## Education',
    ...education.map((item) => `- ${item.degree.en} — ${item.institution} (${educationLine(item)})`),
    '',
    '## Certificates',
    `- ${efsetLine}`,
    ...certificates.map((c) => `- ${c.name.en} — ${c.issuer} — ${c.date.en}`),
    ...otherCertificates.map((c) => `- ${c.en}`),
    '',
    '## Academic projects',
    ...academicProjects.items.map(
      (item) => `- ${item.name}${item.start && item.end ? ` (${item.start} – ${item.end})` : ''}: ${item.note.en}`,
    ),
    '',
    '## Brands and IPs in the titles tested',
    ...brandGroups.map((group) => `- ${group.title.en}: ${group.items.join(', ')}`),
    `- ${ui.projects.brandsNote.en}`,
    '',
    '## Languages',
    `- ${languages.en}`,
    '',
    '## Abbreviations',
    ...Object.entries(abbreviations).map(([key, value]) => `- ${key}: ${value.en}`),
    '',
  ].join('\n');
}
