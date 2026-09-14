// Writes one static HTML page per language and page after `vite build` and `vite build --ssr`,
// plus the resume pages, the machine-readable files and sitemap.xml. The client bundle then
// hydrates the prerendered markup.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildDocx } from './cv-docx.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, renderCv, headTags, SITE_URL, cvData, cvStyles, cvTitle, resumeJson, llmsTxt } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

const HEAD = /<!--head:start-->[\s\S]*?<!--head:end-->/;
const ROOT = '<div id="root"></div>';
if (!HEAD.test(template) || !template.includes(ROOT)) {
  throw new Error('dist/index.html is missing the <!--head:start/end--> markers or the empty #root');
}

// Inline the stylesheet (~10 kB gzipped) to drop a render-blocking request, and preload
// the fonts painted above the fold: the headline (Chakra Petch 700) and body text (Inter).
const assetsDir = path.join(dist, 'assets');
const cssTag = template.match(/<link rel="stylesheet"[^>]*href="\/assets\/([^"]+\.css)"[^>]*>/);
if (!cssTag) throw new Error('dist/index.html has no stylesheet link to inline');
const css = await readFile(path.join(assetsDir, cssTag[1]), 'utf8');
const preloads = (await readdir(assetsDir))
  .filter((file) => /^(chakra-petch-latin-700-normal|inter-latin-wght-normal)-.+\.woff2$/.test(file))
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`);
if (preloads.length !== 2) throw new Error(`Expected 2 fonts to preload, found ${preloads.length}`);
const shell = template.replace(cssTag[0], () => `${preloads.join('\n    ')}\n    <style>${css}</style>`);

// Keep in sync with src/i18n/routes.ts.
const pages = [
  { lang: 'en', page: 'home', dir: dist, url: `${SITE_URL}/` },
  { lang: 'pt', page: 'home', dir: path.join(dist, 'pt'), url: `${SITE_URL}/pt/` },
  { lang: 'en', page: 'projects', dir: path.join(dist, 'projects'), url: `${SITE_URL}/projects/` },
  { lang: 'pt', page: 'projects', dir: path.join(dist, 'pt', 'projetos'), url: `${SITE_URL}/pt/projetos/` },
];

for (const { lang, page, dir, url } of pages) {
  const head = headTags(lang, page);
  const html = shell
    .replace(/<html lang="[^"]*">/, () => `<html lang="${head.htmlLang}">`)
    .replace(HEAD, () => head.tags)
    .replace(ROOT, () => `<div id="root">${render(lang, page)}</div>`);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
  console.log(`prerendered ${url} (${(Buffer.byteLength(html) / 1024).toFixed(1)} kB)`);
}

const homes = pages.filter((p) => p.page === 'home');

// Resume pages (one column, no JavaScript) that scripts/cv-pdf.mjs prints to PDF.
for (const { lang, dir } of homes) {
  const cvDir = path.join(dir, 'cv');
  const html = `<!doctype html>
<html lang="${lang === 'pt' ? 'pt-BR' : 'en'}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>${cvTitle[lang]}</title>
    <style>${cvStyles}</style>
  </head>
  <body>${renderCv(lang)}</body>
</html>
`;
  await mkdir(cvDir, { recursive: true });
  await writeFile(path.join(cvDir, 'index.html'), html);
}

// Word resumes, served from /cv/ next to the PDFs (public/cv/).
for (const { lang } of homes) {
  const file = `Giovanni-Mariano-Game-QA-${lang.toUpperCase()}.docx`;
  await writeFile(path.join(dist, 'cv', file), await buildDocx(cvData(lang), cvTitle[lang]));
}

// Machine-readable copies for screening tools and LLMs.
await writeFile(path.join(dist, 'resume.json'), `${JSON.stringify(resumeJson(), null, 2)}\n`);
await writeFile(path.join(dist, 'llms.txt'), llmsTxt());
console.log('wrote cv pages, resume.json and llms.txt');

// Each URL lists its language versions (and the English one as x-default).
const lastmod = new Date().toISOString().slice(0, 10);
const entry = ({ page, url }) => {
  const versions = pages.filter((x) => x.page === page);
  const english = versions.find((x) => x.lang === 'en').url;
  const alternates = [...versions.map((x) => [x.lang === 'pt' ? 'pt-BR' : 'en', x.url]), ['x-default', english]]
    .map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)
    .join('\n');
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`;
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(entry).join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await rm(ssrDir, { recursive: true, force: true });
