// Local check of the catalog images against the final image package (images/, gitignored).
// Writes private/catalog-status.md (also gitignored: only the site is public) and fails when the
// site publishes a cover the manifest marks as pending, one it does not list, or one withheld after
// an identity check; when a title with an approved image has no cover; or when a file is missing.
// Without the package (as in CI) it skips.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
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

// Images collected outside the package, each one with the page it came from (images/extras/, not in
// git). They answer for titles the package left pending, so they are checked the same way.
const extraFile = path.join(root, 'images', 'extras', 'covers-extra.json');
const extras = new Map(
  (existsSync(extraFile) ? JSON.parse(readFileSync(extraFile, 'utf8')).titles : []).map((item) => [item.slug, item]),
);
const coversTs = readFileSync(path.join(root, 'src', 'content', 'covers.ts'), 'utf8');
const covers = JSON.parse(coversTs.slice(coversTs.indexOf('CoverArt> = {') + 11, coversTs.lastIndexOf('}') + 1));

// Approved in the package but kept off the site after a check (reason shown in the report).
const withheld = {};

// Cover taken from another file already in the repository after reviewing the framing; the manifest
// entry and its hash stay as they are, so the size column below still shows the manifest's image.
const overrides = {
  'rumble-kong-league':
    'Capa trocada em 15/09/2026 pelo screenshot 16:9 da mesma página oficial do Google Play (o ícone quadrado ficava com bordas no card).',
};

// Taken out of the catalog by Giovanni; kept in the report, without a cover.
const removed = new Set([
  // 15/09/2026
  'slice-mania', 'sniper-master', 'parkpurr', 'farm-break', 'kite-drop', 'vacuum-guy', 'sokobalien',
  'slackline-infinite', 'minute-bomb', 'ladder-stacker', 'milky-way-coliseum', 'iin', 'hexon', 'flip-the-box',
  'goroons', 'blocky-gate', 'clickermon', 'colorgrid', 'vila-do-brasa-sports-land-hub',
  // 16/09/2026
  'pro-soccer-simulator', 'slap-tower', 'winter-sports', 'sports-land-stadium', 'sports-land-football-saga',
  'mesmerized', 'uol-eclub', 'flamengo-eclub', 'eclub-benefits-platform',
  // 16/09/2026
  'barcelona-card-game', 'sugar-rush', 'cob-sports-legends-collect-merge',
]);

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

  if (removed.has(title.slug)) {
    if (cover) errors.push(`${title.slug}: removed from the catalog, but its cover is still published`);
    rows.push({ title, cover, note: 'Removido do catálogo pelo Giovanni.', removed: true });
    continue;
  }
  const extra = extras.get(title.slug);
  if (cover && pending && !extra) errors.push(`${title.slug}: cover published, but the manifest marks it pending`);
  if (extra && !cover) errors.push(`${title.slug}: image collected in images/extras, but no cover on the site`);
  if (cover && withheld[title.slug]) errors.push(`${title.slug}: cover published, but it is withheld`);
  if (!cover && !pending && !withheld[title.slug]) errors.push(`${title.slug}: approved image without a cover on the site`);
  if (withheld[title.slug]) note = withheld[title.slug];
  if (overrides[title.slug]) note = overrides[title.slug];
  if (extra) note = extra.notes;

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

  rows.push({ title, cover, note, extra });
}
for (const slug of Object.keys(covers)) {
  if (!manifest.titles.some((t) => t.slug === slug)) errors.push(`${slug}: cover not listed in the manifest`);
}

// The other direction: a file left behind by an earlier run is shipped but belongs to nothing, so
// a removed title or an old width can go on being published without anyone noticing.
const declared = new Set(
  Object.entries(covers).flatMap(([slug, art]) => art.widths.map((width) => `${slug}-${width}.webp`)),
);
for (const file of readdirSync(path.join(root, 'public', 'covers'))) {
  if (!declared.has(file)) errors.push(`public/covers/${file}: on disk but no cover declares it`);
}
if (manifest.titles.length !== 116) errors.push(`expected 116 titles in the manifest, found ${manifest.titles.length}`);

const published = rows.filter((r) => r.cover).length;
const inCatalog = rows.filter((r) => !r.removed);
const cell = (text) => String(text ?? '').replace(/\|/g, '\\|');
const report = [
  '# Status das imagens do catálogo (local, fora do git)',
  '',
  `Gerado por \`npm run catalog\` em ${new Date().toISOString().slice(0, 10)} a partir de images/IMAGENS-PORTFOLIO-AJUSTES-FINAIS/manifesto-imagens.json.`,
  '',
  `- Títulos no manifesto: ${rows.length} · removidos do catálogo: ${rows.length - inCatalog.length} · no catálogo: ${inCatalog.length}`,
  `- No catálogo: com capa ${published} · sem imagem ${inCatalog.length - published}`,
  `- Pendentes no pacote (no catálogo): ${inCatalog.filter((r) => r.title.status === 'pendente').length} · retidas após conferência: ${Object.keys(withheld).length}`,
  `- Problemas: ${errors.length ? errors.join('; ') : 'nenhum'}`,
  '',
  '| Título | Status no pacote | No site | Tamanho original | Larguras publicadas | Enquadramento | Fonte | Observação |',
  '|---|---|---|---|---|---|---|---|',
  ...rows.map(({ title, cover, note, extra }) =>
    [
      title.title,
      extra ? 'imagem coletada (images/extras)' : (statusLabel[title.status] ?? title.status),
      cover ? 'sim' : 'não',
      (extra ?? title).width ? `${(extra ?? title).width}×${(extra ?? title).height}` : '—',
      cover ? cover.widths.join(', ') : '—',
      cover?.fit ?? '—',
      extra?.source_page ?? title.source_page ?? '—',
      note || title.notes || '',
    ]
      .map(cell)
      .join(' | '),
  ).map((line) => `| ${line} |`),
  '',
].join('\n');

mkdirSync(path.join(root, 'private'), { recursive: true });
writeFileSync(path.join(root, 'private', 'catalog-status.md'), report);
console.log(
  `catalog-status: ${inCatalog.length} titles in the catalog (${rows.length - inCatalog.length} removed), ${published} covers published, ${errors.length} problem(s)`,
);
for (const error of errors) console.error(`  - ${error}`);
if (errors.length) process.exit(1);
