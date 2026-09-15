// Local check of the catalog images against the asset package in images/assets/jogos (gitignored).
// Writes private/catalog-status.md (also gitignored: only the site is public) and fails when the
// site publishes a cover the package marks as candidate or pending, or a cover that is not the one
// already reviewed for the site (capa-atual.webp). Without images/ (as in CI) it skips.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const jogos = path.join(root, 'images', 'assets', 'jogos');
if (!existsSync(jogos)) {
  console.log('catalog-status: images/assets/jogos not found; skipped');
  process.exit(0);
}

const covers = new Map(
  [...readFileSync(path.join(root, 'src', 'content', 'covers.ts'), 'utf8').matchAll(/["']([a-z0-9-]+)["']\s*:\s*["'](wide|square)["']/g)].map(
    (m) => [m[1], m[2]],
  ),
);

// Folder names are "NNN-<slug of the English title>", the same slug as src/content/projects.ts.
const merged = { 'island-defense': 'Coconuts vs Pirates' };

const statusOf = (text) =>
  /CAPA ATUAL/.test(text)
    ? 'current-fallback'
    : /IMAGEM PÚBLICA/.test(text)
      ? 'public-source-or-store'
      : /CANDIDATA/.test(text)
        ? 'candidate'
        : /PENDENTE/.test(text)
          ? 'pending'
          : 'unknown';

const action = (status, published) =>
  ({
    merged: 'Fundida em Coconuts vs Pirates (mesmo jogo, renomeado).',
    'current-fallback': published ? 'Capa atual mantida.' : 'Sem capa no site.',
    'public-source-or-store': published
      ? 'Capa atual mantida; trocar pela imagem pública só depois de conferir a versão testada.'
      : 'Imagem pública disponível; conferir se é a versão testada antes de publicar.',
    candidate: 'Não publicar: confirmar identidade e versão (pode ser homônimo).',
    pending: 'Sem imagem pública confirmada; placeholder no site.',
    unknown: 'STATUS.md sem status reconhecido.',
  })[status];

const folders = readdirSync(jogos, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();
const errors = [];
const rows = [];

for (const folder of folders) {
  const slug = folder.replace(/^\d+-/, '');
  const dir = path.join(jogos, folder);
  const statusFile = path.join(dir, 'STATUS.md');
  const text = existsSync(statusFile) ? readFileSync(statusFile, 'utf8') : '';
  const title = text.match(/^# \d+ — (.+)$/m)?.[1]?.trim() ?? slug;
  const files = readdirSync(dir).filter((f) => f !== 'STATUS.md');
  const status = merged[slug] ? 'merged' : statusOf(text);
  const published = covers.has(slug);

  if (published && (status === 'candidate' || status === 'pending' || status === 'merged')) {
    errors.push(`${folder}: cover published, but the package status is ${status}`);
  }
  if (published && !files.includes('capa-atual.webp')) {
    errors.push(`${folder}: cover published without the reviewed current cover (capa-atual.webp)`);
  }
  rows.push({ folder, title, status, published, files, action: action(status, published) });
}

for (const slug of covers.keys()) {
  if (!folders.some((f) => f.replace(/^\d+-/, '') === slug)) errors.push(`${slug}: cover has no folder in the asset package`);
}
if (folders.length !== 117) errors.push(`expected 117 folders in the asset package, found ${folders.length}`);

const count = (status) => rows.filter((r) => r.status === status).length;
const report = [
  '# Status das imagens do catálogo (local, fora do git)',
  '',
  `Gerado por \`npm run catalog\` em ${new Date().toISOString().slice(0, 10)} a partir de images/assets/jogos.`,
  '',
  `- Pastas: ${folders.length} · capas publicadas: ${rows.filter((r) => r.published).length}`,
  `- current-fallback: ${count('current-fallback')} · public-source-or-store: ${count('public-source-or-store')} · candidate: ${count('candidate')} · pending: ${count('pending')} · merged: ${count('merged')}`,
  `- Problemas: ${errors.length ? errors.join('; ') : 'nenhum'}`,
  '',
  '| Pasta | Título | Status | Capa no site | Arquivos no pacote | Ação |',
  '|---|---|---|---|---|---|',
  ...rows.map(
    (r) => `| ${r.folder} | ${r.title} | ${r.status} | ${r.published ? 'sim' : 'não'} | ${r.files.join(', ') || '—'} | ${r.action} |`,
  ),
  '',
].join('\n');

mkdirSync(path.join(root, 'private'), { recursive: true });
writeFileSync(path.join(root, 'private', 'catalog-status.md'), report);
console.log(`catalog-status: ${folders.length} folders, ${rows.filter((r) => r.published).length} covers published, ${errors.length} problem(s)`);
for (const error of errors) console.error(`  - ${error}`);
if (errors.length) process.exit(1);
