// Prints the prerendered resume pages (dist/cv/, dist/pt/cv/) to PDF with the local Chrome.
// `npm run cv` builds first; the PDFs land in public/cv/ and are committed.
import { execFileSync } from 'node:child_process';
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { findChrome } from './chrome.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chrome = findChrome();
const outDir = path.join(root, 'public', 'cv');
await mkdir(outDir, { recursive: true });

for (const [suffix, page] of [
  ['EN', 'dist/cv/index.html'],
  ['PT', 'dist/pt/cv/index.html'],
]) {
  const out = path.join(outDir, `Giovanni-Mariano-Game-QA-${suffix}.pdf`);
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      '--print-to-pdf-no-header',
      `--print-to-pdf=${out}`,
      pathToFileURL(path.join(root, page)).href,
    ],
    { stdio: 'ignore' },
  );
  // Keep the current build in sync without another full build.
  await copyFile(out, path.join(root, 'dist', 'cv', path.basename(out)));
  console.log(`wrote public/cv/${path.basename(out)}`);
}
