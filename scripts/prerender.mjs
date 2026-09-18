// Writes one static HTML page per language and page after `vite build` and `vite build --ssr`,
// plus the machine-readable files and sitemap.xml. The client bundle then hydrates the
// prerendered markup. The résumé PDF is a ready-made file (public/curriculo/), not generated here.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, headTags, SITE_URL, resumeJson, llmsTxt, qaYears, titleCount } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

const HEAD = /<!--head:start-->[\s\S]*?<!--head:end-->/;
const ROOT = '<div id="root"></div>';
if (!HEAD.test(template) || !template.includes(ROOT)) {
  throw new Error('dist/index.html is missing the <!--head:start/end--> markers or the empty #root');
}

// Inline the stylesheet (~10 kB gzipped) to drop a render-blocking request, and preload the fonts
// painted above the fold: the headline (Chakra Petch 700), the body text (Inter) and the mono face
// used by the name and the areas of QA — without it, the swap reflows the hero (measured as a 0.16
// layout shift on the Portuguese page, whose line is longer).
const assetsDir = path.join(dist, 'assets');
const cssTag = template.match(/<link rel="stylesheet"[^>]*href="\/assets\/([^"]+\.css)"[^>]*>/);
if (!cssTag) throw new Error('dist/index.html has no stylesheet link to inline');
const css = await readFile(path.join(assetsDir, cssTag[1]), 'utf8');
const preloads = (await readdir(assetsDir))
  .filter((file) =>
    /^(chakra-petch-latin-700-normal|inter-latin-wght-normal|jetbrains-mono-latin-wght-normal)-.+\.woff2$/.test(file),
  )
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`);
if (preloads.length !== 3) throw new Error(`Expected 3 fonts to preload, found ${preloads.length}`);
const shell = template.replace(cssTag[0], () => `${preloads.join('\n    ')}\n    <style>${css}</style>`);

// Keep in sync with src/i18n/routes.ts.
const pages = [
  { lang: 'en', page: 'home', dir: dist, url: `${SITE_URL}/` },
  { lang: 'pt', page: 'home', dir: path.join(dist, 'pt'), url: `${SITE_URL}/pt/` },
  { lang: 'en', page: 'projects', dir: path.join(dist, 'projects'), url: `${SITE_URL}/projects/` },
  { lang: 'pt', page: 'projects', dir: path.join(dist, 'pt', 'projetos'), url: `${SITE_URL}/pt/projetos/` },
];

// Each page's code is loaded on demand (src/main.tsx), so the page preloads its own chunk: it
// arrives with the entry instead of after it, and hydration is not held back by a second round trip.
const manifestFile = path.join(dist, '.vite', 'manifest.json');
const manifest = JSON.parse(await readFile(manifestFile, 'utf8'));
const pageChunk = (page) => {
  const entry = manifest[`src/pages/${page === 'projects' ? 'GalleryPage' : 'HomePage'}.tsx`];
  if (!entry) throw new Error(`No build manifest entry for the ${page} page chunk`);
  return `<link rel="modulepreload" crossorigin href="/${entry.file}" />`;
};

for (const { lang, page, dir, url } of pages) {
  const head = headTags(lang, page);
  const html = shell
    .replace(/<html lang="[^"]*">/, () => `<html lang="${head.htmlLang}">`)
    .replace(HEAD, () => `${head.tags}\n    ${pageChunk(page)}`)
    .replace(ROOT, () => `<div id="root">${render(lang, page)}</div>`);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
  console.log(`prerendered ${url} (${(Buffer.byteLength(html) / 1024).toFixed(1)} kB)`);
}

// GitHub Pages has no redirect rules, so the addresses people type by hand (the English site is at
// the root, not under /en/) get a small page that forwards to the real URL with its ?query and #hash.
// They are kept out of search results; public/404.html handles anything else.
const aliases = [
  ['en', '/'],
  ['en/projects', '/projects/'],
  ['pt/projects', '/pt/projetos/'],
  ['projetos', '/pt/projetos/'],
  ['pt-br', '/pt/'],
];

for (const [from, to] of aliases) {
  const target = `${SITE_URL}${to}`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${to}" />
    <link rel="canonical" href="${target}" />
    <title>Redirecting to ${target}</title>
    <script>
      location.replace('${to}' + location.search + location.hash);
    </script>
  </head>
  <body>
    <p>This page is at <a href="${to}">${target}</a>.</p>
  </body>
</html>
`;
  const dir = path.join(dist, ...from.split('/'));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}
console.log(`redirects: ${aliases.map(([from, to]) => `/${from}/ → ${to}`).join(', ')}`);

// Machine-readable copies for screening tools and LLMs.
await writeFile(path.join(dist, 'resume.json'), `${JSON.stringify(resumeJson(), null, 2)}\n`);
await writeFile(path.join(dist, 'llms.txt'), llmsTxt());
console.log('wrote resume.json and llms.txt');

// The share image is drawn by Chrome from a plain HTML file, which cannot import the content. The
// build writes the derived numbers next to it, so the card can never disagree with the site.
await writeFile(
  path.join(root, 'scripts', 'og-data.json'),
  `${JSON.stringify({ years: qaYears, titles: titleCount }, null, 2)}\n`,
);

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
// The build manifest is a build artifact, not part of the site.
await rm(path.join(dist, '.vite'), { recursive: true, force: true });
