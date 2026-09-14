// Design rule: no green anywhere on the site. Fails the build if a green-hued color reaches dist/.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

async function collect(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await collect(file, files);
    else if (/\.(css|html|svg|js)$/.test(entry.name)) files.push(file);
  }
  return files;
}

function toHsl(r, g, b) {
  [r, g, b] = [r / 255, g / 255, b / 255];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: h * 60, s, l };
}

// Yellow-green through teal; grays, near-black and near-white are fine.
const isGreen = ({ h, s, l }) => h >= 75 && h <= 165 && s > 0.25 && l > 0.08 && l < 0.92;

const hex = /#([0-9a-f]{6}|[0-9a-f]{3})\b/gi;
const rgb = /rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/gi;

const files = await collect(dist);
const hits = new Set();
for (const file of files) {
  const text = await readFile(file, 'utf8');
  const where = path.relative(dist, file);
  for (const [match, value] of text.matchAll(hex)) {
    const full = value.length === 3 ? [...value].map((c) => c + c).join('') : value;
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
    if (isGreen(toHsl(r, g, b))) hits.add(`${where}: ${match}`);
  }
  for (const [match, r, g, b] of text.matchAll(rgb)) {
    if (isGreen(toHsl(Number(r), Number(g), Number(b)))) hits.add(`${where}: ${match})`);
  }
}

if (hits.size > 0) {
  console.error(`check-colors: green is not allowed on this site:\n  ${[...hits].join('\n  ')}`);
  process.exit(1);
}
console.log(`check-colors: no green in ${files.length} files`);
