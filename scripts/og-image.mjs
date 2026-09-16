// Renders scripts/og.html to public/og-image.png (1200×630) with the local Chrome.
import { execFileSync } from 'node:child_process';
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { findChrome } from './chrome.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public', 'og-image.png');

// The card is plain HTML, so it cannot import the content. `npm run build` writes the derived
// numbers to og-data.json and they are filled in here, so the image can never show a stale count.
const dataFile = path.join(root, 'scripts', 'og-data.json');
let data;
try {
  data = JSON.parse(await readFile(dataFile, 'utf8'));
} catch {
  throw new Error('scripts/og-data.json is missing: run `npm run build` before `npm run og`');
}

const template = await readFile(path.join(root, 'scripts', 'og.html'), 'utf8');
const html = template.replace(/\{\{(years|titles)\}\}/g, (_, key) => String(data[key]));
if (html.includes('{{')) throw new Error('scripts/og.html still has an unfilled placeholder');

// Chrome screenshots a file, so the filled template is written next to the original (same relative
// paths for the font and avatar files) and removed afterwards.
const page = path.join(root, 'scripts', 'og.generated.html');
await writeFile(page, html);

try {
  execFileSync(
    findChrome(),
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      '--allow-file-access-from-files',
      '--virtual-time-budget=3000',
      `--screenshot=${out}`,
      pathToFileURL(page).href,
    ],
    { stdio: 'ignore' },
  );
} finally {
  await rm(page, { force: true });
}

console.log(`wrote public/og-image.png (${data.years}+ yrs, ${data.titles} titles)`);
