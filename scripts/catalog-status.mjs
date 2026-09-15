// Local check of the catalog images against the final image package (images/, gitignored).
// Writes private/catalog-status.md (also gitignored: only the site is public) and fails when the
// site publishes a cover the manifest marks as pending, one it does not list, or one withheld after
// an identity check; when a title with an approved image has no cover; or when a file is missing.
// Without the package (as in CI) it skips.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = path.join(root, 'images', 'IMAGENS-PORTFOLIO-AJUSTES-FINAIS');
const manifestFile = path.join(pkg, 'manifesto-imagens.json');
if (!existsSync(manifestFile)) {
  console.log('catalog-status: image package not found; skipped');
  process.exit(0);
}

const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'));
const coversTs = readFileSync(path.join(root, 'src', 'content', 'covers.ts'), 'utf8');
const covers = JSON.parse(coversTs.slice(coversTs.indexOf('CoverArt> = {') + 11, coversTs.lastIndexOf('}') + 1));

// Approved in the package but kept off the site after a check (reason shown in the report).
const withheld = {
  'pro-soccer-simulator':
    'Retida: a página no Roblox (103709979719238) é de outro grupo (ProSoccerGroup); identidade não confirmada em 15/09/2026.',
};

const statusLabel = {
  imagem_externa_selecionada: 'imagem externa selecionada',
  capa_publicada_preservada: 'capa publicada preservada',
  pendente: 'pendente',
};

const errors = [];
const rows = [];
for (const title of manifest.titles) {
  const cover = covers[title.slug];
  const pending = title.status === 'pendente';
  let note = pending ? title.notes : '';

  if (cover && pending) errors.push(`${title.slug}: cover published, but the manifest marks it pending`);
  if (cover && withheld[title.slug]) errors.push(`${title.slug}: cover published, but it is withheld`);
  if (!cover && !pending && !withheld[title.slug]) errors.push(`${title.slug}: approved image without a cover on the site`);
  if (withheld[title.slug]) note = withheld[title.slug];

  if (title.selected_file) {
    const file = path.join(pkg, title.selected_file);
    if (!existsSync(file)) errors.push(`${title.slug}: package file missing (${title.selected_file})`);
    else if (createHash('sha256').update(readFileSync(file)).digest('hex') !== title.sha256) {
      errors.push(`${title.slug}: package file differs from the manifest hash`);
    }
  }
  for (const width of cover?.widths ?? []) {
    if (!existsSync(path.join(root, 'public', 'covers', `${title.slug}-${width}.webp`))) {
      errors.push(`${title.slug}: public/covers/${title.slug}-${width}.webp missing`);
    }
  }

  rows.push({ title, cover, note });
}
for (const slug of Object.keys(covers)) {
  if (!manifest.titles.some((t) => t.slug === slug)) errors.push(`${slug}: cover not listed in the manifest`);
}
if (manifest.titles.length !== 116) errors.push(`expected 116 titles in the manifest, found ${manifest.titles.length}`);

const published = rows.filter((r) => r.cover).length;
const cell = (text) => String(text ?? '').replace(/\|/g, '\\|');
const report = [
  '# Status das imagens do catálogo (local, fora do git)',
  '',
  `Gerado por \`npm run catalog\` em ${new Date().toISOString().slice(0, 10)} a partir de images/IMAGENS-PORTFOLIO-AJUSTES-FINAIS/manifesto-imagens.json.`,
  '',
  `- Títulos: ${rows.length} · com capa no site: ${published} · sem imagem: ${rows.length - published}`,
  `- Pendentes no pacote: ${rows.filter((r) => r.title.status === 'pendente').length} · retidas após conferência: ${Object.keys(withheld).length}`,
  `- Problemas: ${errors.length ? errors.join('; ') : 'nenhum'}`,
  '',
  '| Título | Status no pacote | No site | Tamanho original | Larguras publicadas | Enquadramento | Fonte | Observação |',
  '|---|---|---|---|---|---|---|---|',
  ...rows.map(({ title, cover, note }) =>
    [
      title.title,
      statusLabel[title.status] ?? title.status,
      cover ? 'sim' : 'não',
      title.width ? `${title.width}×${title.height}` : '—',
      cover ? cover.widths.join(', ') : '—',
      cover?.fit ?? '—',
      title.source_page ?? '—',
      note || title.notes || '',
    ]
      .map(cell)
      .join(' | '),
  ).map((line) => `| ${line} |`),
  '',
].join('\n');

mkdirSync(path.join(root, 'private'), { recursive: true });
writeFileSync(path.join(root, 'private', 'catalog-status.md'), report);
console.log(`catalog-status: ${rows.length} titles, ${published} covers published, ${errors.length} problem(s)`);
for (const error of errors) console.error(`  - ${error}`);
if (errors.length) process.exit(1);
