// Renders scripts/og.html to public/og-image.png (1200×630) with the local Chrome.
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { findChrome } from './chrome.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public', 'og-image.png');

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
    pathToFileURL(path.join(root, 'scripts', 'og.html')).href,
  ],
  { stdio: 'ignore' },
);
console.log('wrote public/og-image.png');
