import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const pages = [
  {
    path: '/',
    lang: 'en',
    title: 'Game QA Analyst',
    section: 'Selected QA Projects',
    cv: '/cv/Giovanni-Mariano-Game-QA-EN',
    caixa: 'CAIXA Universe',
    minutes: '110M+',
    contribution: 'My contribution',
    english: 'English: EF SET B1 — 41/100 (Reading & Listening)',
    average: '109 games tested over four years in QA, working in teams of four to five people — approximately 27 games per year on average.',
    conferral: 'Feb 22, 2019',
    original: 'Original recommendation in Portuguese',
  },
  {
    path: '/pt/',
    lang: 'pt-BR',
    title: 'Analista de QA de Jogos',
    section: 'Projetos de QA em destaque',
    cv: '/cv/Giovanni-Mariano-Game-QA-PT',
    caixa: 'Universo CAIXA',
    minutes: '110 mi+',
    contribution: 'Minha contribuição',
    english: 'Inglês: EF SET B1 — 41/100 (leitura e compreensão oral)',
    average:
      '109 jogos testados em quatro anos de atuação em QA, com equipes de quatro a cinco pessoas — média histórica de aproximadamente 27 jogos por ano.',
    conferral: '22/02/2019',
    original: null,
  },
];

const galleries = [
  {
    path: '/projects/',
    lang: 'en',
    title: /^Full catalog: \d+ titles$/,
    other: '/pt/projetos/',
    switchTo: 'PT – Português',
    search: 'Search titles',
    clear: 'Clear filters',
    empty: 'No titles match',
    publishing: /Publishing & ports/,
  },
  {
    path: '/pt/projetos/',
    lang: 'pt-BR',
    title: /^Catálogo completo: \d+ títulos$/,
    other: '/projects/',
    switchTo: 'EN – English',
    search: 'Buscar títulos',
    clear: 'Limpar filtros',
    empty: 'Nenhum título',
    publishing: /Publicação e portes/,
  },
];

/** 116 unique titles: 109 games and 7 web apps (Island Defense is the old name of Coconuts vs Pirates). */
const TITLES = 116;

const QUOTE =
  'Trabalho com o Giovanni há anos e posso atestar sobre sua paixão por jogos e qualidade. É uma grande facilidade trabalhar com ele, visto que é solícito, proativo e muito dedicado com o que faz. Me ajudou muito a crescer e trabalhar melhor em equipe, admiro sua organização, responsabilidade e tato com os times.';

/** Retired positioning, totals, samples, the 2022 assessment and unconfirmed figures: none may come back. */
const forbidden = [
  'Senior',
  'Target roles',
  'Cargos-alvo',
  '11M+',
  '11 mi+',
  '280M',
  '280 mi',
  'Skyline Drift',
  'QA-1042',
  'Goal Rush',
  '1.9.0-rc3',
  'FICTIONAL',
  'avaliacao-qa-2022',
  'QA Evidence',
  'Evidência de QA',
  'Alpha Season',
  '4–6',
  '4–8',
  'comprova o produto',
  'confirms the product',
  'Translated from Portuguese',
  'English (A2)',
  'Inglês (A2)',
];

async function expectNoConsoleErrors(tab: Page, path: string, check: () => Promise<void>) {
  const errors: string[] = [];
  tab.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
  tab.on('pageerror', (error) => errors.push(error.message));
  await tab.goto(path);
  await check();
  await tab.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
}

async function expectNoAxeViolations(tab: Page) {
  const results = await new AxeBuilder({ page: tab }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
}

/** Opens a dialog from its button with the keyboard, then closes it with Escape. */
async function expectDialogRoundTrip(tab: Page, opener: ReturnType<Page['locator']>) {
  await opener.focus();
  await tab.keyboard.press('Enter');
  const dialog = tab.locator('dialog[open]');
  await expect(dialog).toHaveCount(1);
  await expect(dialog.locator('img')).toBeVisible();
  await tab.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
}

const visibleTiles = (tab: Page) => tab.locator('#gallery li:not([hidden]) article');

for (const page of pages) {
  test.describe(`page ${page.path}`, () => {
    test('renders the prerendered content without console errors', async ({ page: tab }) => {
      await expectNoConsoleErrors(tab, page.path, async () => {
        await expect(tab.locator('html')).toHaveAttribute('lang', page.lang);
        await expect(tab.getByRole('heading', { level: 1 })).toHaveText('Giovanni S. Mariano');
        await expect(tab.locator('#top')).toContainText(page.title);
        await expect(tab.getByRole('heading', { name: page.section })).toBeVisible();
      });
    });

    for (const theme of ['dark', 'light'] as const) {
      test(`has no WCAG A/AA violations in the ${theme} theme`, async ({ page: tab }) => {
        await tab.addInitScript((value) => localStorage.setItem('theme', value), theme);
        await tab.goto(page.path);
        await expect(tab.locator('html')).toHaveAttribute('data-theme', theme);
        await expectNoAxeViolations(tab);
      });
    }

    test('serves its resume as PDF and Word, and the hero downloads it', async ({ page: tab, request }) => {
      const pdf = await request.get(`${page.cv}.pdf`);
      expect(pdf.status()).toBe(200);
      expect(pdf.headers()['content-type']).toContain('pdf');
      const docx = await request.get(`${page.cv}.docx`);
      expect(docx.status()).toBe(200);
      // A .docx is a zip archive: it starts with "PK".
      expect((await docx.body()).subarray(0, 2).toString()).toBe('PK');

      await tab.goto(page.path);
      await expect(tab.locator('#top a[download]')).toHaveAttribute('href', `${page.cv}.pdf`);
    });

    test('every in-page link points to an existing section', async ({ page: tab }) => {
      await tab.goto(page.path);
      const missing = await tab
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links.map((a) => a.getAttribute('href')!.slice(1)).filter((id) => id && !document.getElementById(id)),
        );
      expect(missing).toEqual([]);
      await expect(tab.locator('#evidence')).toHaveCount(0);
    });

    test('has 6 featured projects, Sportia first, each with a contribution and one public link', async ({ page: tab }) => {
      await tab.goto(page.path);
      const cards = tab.locator('#projects article');
      await expect(cards).toHaveCount(6);
      await expect(cards.first().getByRole('heading', { level: 3 })).toHaveText('Sportia');
      await expect(tab.locator('#projects article img:not([aria-hidden="true"])')).toHaveCount(6);
      await expect(cards.getByText(page.contribution, { exact: true })).toHaveCount(6);
      await expect(cards.locator('a[href^="https://"]')).toHaveCount(6);
      await expect(tab.locator('#projects')).not.toContainText(page.caixa);
      const football = cards.filter({ hasText: 'Football Tycoon' });
      await expect(football).toContainText(page.minutes);
      await expect(football).toContainText('fortnite.gg');
    });

    test('links to the full catalog, which still lists CAIXA', async ({ page: tab }) => {
      await tab.goto(page.path);
      await tab.locator('#projects a.btn-primary').click();
      await expect(tab.getByRole('heading', { level: 1 })).toHaveText(new RegExp(String(TITLES)));
      await expect(tab.getByRole('heading', { level: 3, name: page.caixa })).toBeVisible();
    });

    test('states the QA period, team size and yearly average once', async ({ page: tab }) => {
      await tab.goto(page.path);
      await expect(tab.locator('#experience')).toContainText(page.average);
    });

    test('credits the Testathon team, shows the photos and quotes the testimonial exactly', async ({ page: tab }) => {
      await tab.goto(page.path);
      await expect(tab.locator('#recognition article a[aria-label$="LinkedIn"]')).toHaveCount(5);
      const quote = tab.locator('#recognition blockquote');
      await expect(quote).toHaveAttribute('lang', 'pt-BR');
      await expect(quote).toHaveText(QUOTE);
      await expect(tab.locator('#recognition figure:has(blockquote) img')).toHaveCount(0);
      if (page.original) await expect(tab.locator('#recognition')).toContainText(page.original);
      const photos = tab.locator('#recognition button[aria-haspopup="dialog"]');
      await expect(photos).toHaveCount(3);
      await expectDialogRoundTrip(tab, photos.first());
    });

    test('shows the EF SET scores, certificate and verification link', async ({ page: tab, request }) => {
      await tab.goto(page.path);
      const education = tab.locator('#education');
      for (const text of ['41/100', '48/100', '34/100', 'B1 Intermediate', 'A2 Elementary', page.english]) {
        await expect(education).toContainText(text);
      }
      await expect(education.locator('a[href="https://cert.efset.org/zCsGzw"]')).toHaveCount(1);
      const href = await education.locator('a[href$=".pdf"]').getAttribute('href');
      const pdf = await request.get(href ?? '');
      expect(pdf.status()).toBe(200);
      expect(pdf.headers()['content-type']).toContain('pdf');
      // The original file, byte for byte.
      expect((await pdf.body()).length).toBe(79751);
    });

    test('opens a diploma in a dialog that closes with Escape', async ({ page: tab }) => {
      await tab.goto(page.path);
      const opener = tab.locator('#education button[aria-haspopup="dialog"]').first();
      await opener.focus();
      await tab.keyboard.press('Enter');
      await expect(tab.locator('dialog[open]')).toContainText(page.conferral);
      await tab.keyboard.press('Escape');
      await expect(opener).toBeFocused();
      await expectDialogRoundTrip(tab, opener);
    });

    test('lists Discord in the contact section', async ({ page: tab }) => {
      await tab.goto(page.path);
      await expect(tab.locator('#contact')).toContainText('Discord: giogamedev');
    });
  });
}

for (const gallery of galleries) {
  test.describe(`gallery ${gallery.path}`, () => {
    test('lists every title once, without console errors', async ({ page: tab }) => {
      await expectNoConsoleErrors(tab, gallery.path, async () => {
        await expect(tab.locator('html')).toHaveAttribute('lang', gallery.lang);
        await expect(tab.getByRole('heading', { level: 1 })).toHaveText(gallery.title);
      });
      const total = Number((await tab.getByRole('heading', { level: 1 }).textContent())?.match(/\d+/)?.[0]);
      expect(total).toBe(TITLES);
      await expect(visibleTiles(tab)).toHaveCount(total);
      // "All" lists a port once, under its main platform; the Publishing filter adds the ports.
      await expect(tab.locator('section[aria-labelledby="group-publishing"] li:not([hidden])')).toHaveCount(41);
    });

    test('filters by platform and puts the filter in the URL', async ({ page: tab }) => {
      await tab.goto(gallery.path);
      const fortnite = tab.getByRole('button', { name: /Fortnite\/UEFN/ });
      await fortnite.click();
      await expect(fortnite).toHaveAttribute('aria-pressed', 'true');
      await expect(visibleTiles(tab)).toHaveCount(20);
      await expect(tab).toHaveURL(/\?p=fortnite-uefn/);
      await tab.getByRole('button', { name: gallery.publishing }).click();
      await expect(visibleTiles(tab)).toHaveCount(43);
    });

    test('back and forward step through the filters', async ({ page: tab }) => {
      await tab.goto(gallery.path);
      const fortnite = tab.getByRole('button', { name: /Fortnite\/UEFN/ });
      const roblox = tab.getByRole('button', { name: /^Roblox/ });
      await fortnite.click();
      await roblox.click();
      await expect(tab).toHaveURL(/\?p=roblox$/);
      await tab.goBack();
      await expect(fortnite).toHaveAttribute('aria-pressed', 'true');
      await expect(tab).toHaveURL(/\?p=fortnite-uefn$/);
      await tab.goForward();
      await expect(roblox).toHaveAttribute('aria-pressed', 'true');
    });

    test('searches without accents and by former title, shows an empty state and clears', async ({ page: tab }) => {
      await tab.goto(gallery.path);
      const search = tab.getByRole('searchbox', { name: gallery.search });
      await search.fill('tycoon');
      await expect(visibleTiles(tab).filter({ hasNotText: /tycoon/i })).toHaveCount(0);
      expect(await visibleTiles(tab).count()).toBeGreaterThan(0);
      await search.fill('island defense');
      await expect(visibleTiles(tab)).toHaveCount(1);
      await expect(visibleTiles(tab)).toContainText('Coconuts vs Pirates');
      await search.fill('gremio');
      expect(await visibleTiles(tab).count()).toBeGreaterThan(1);
      await search.fill('zzzz');
      await expect(tab.getByText(gallery.empty)).toBeVisible();
      await tab.getByRole('button', { name: gallery.clear }).click();
      await expect(search).toHaveValue('');
      await expect(visibleTiles(tab)).toHaveCount(TITLES);
    });

    test('restores the filters from a shared URL and keeps them when switching language', async ({ page: tab }) => {
      await tab.goto(`${gallery.path}?p=fortnite-uefn&q=tycoon`);
      await expect(tab.getByRole('button', { name: /Fortnite\/UEFN/ })).toHaveAttribute('aria-pressed', 'true');
      await expect(tab.getByRole('searchbox', { name: gallery.search })).toHaveValue('tycoon');
      await tab.getByRole('link', { name: gallery.switchTo }).click();
      await expect(tab).toHaveURL(new RegExp(`${gallery.other.replace(/\//g, '\\/')}\\?p=fortnite-uefn&q=tycoon$`));
      await expect(tab.getByRole('button', { name: /Fortnite\/UEFN/ })).toHaveAttribute('aria-pressed', 'true');
      await expect(tab.locator('input[type="search"]')).toHaveValue('tycoon');
    });

    test('titles without a confirmed image show a neutral frame, without their name', async ({ page: tab }) => {
      await tab.goto(gallery.path);
      const frame = tab.locator('#p-slap-tower span[aria-hidden="true"]').first();
      await expect(frame).toBeVisible();
      expect((await frame.textContent())?.trim()).toBe('');
    });

    test('every srcset width matches the real image width', async ({ page: tab }) => {
      await tab.goto(gallery.path);
      const wrong = await tab.locator('#gallery img[srcset]').evaluateAll(async (images) => {
        const candidates = [
          ...new Set(images.flatMap((img) => (img.getAttribute('srcset') ?? '').split(',').map((c) => c.trim()))),
        ];
        const results = await Promise.all(
          candidates.map(
            (candidate) =>
              new Promise<string | null>((resolve) => {
                const [url, descriptor] = candidate.split(/\s+/);
                const probe = new Image();
                probe.onload = () => resolve(`${probe.naturalWidth}w` === descriptor ? null : `${url}: ${probe.naturalWidth}px, ${descriptor}`);
                probe.onerror = () => resolve(`${url}: failed to load`);
                probe.src = url;
              }),
          ),
        );
        return results.filter(Boolean);
      });
      expect(wrong).toEqual([]);
    });

    test('on phones, a button brings the search back after scrolling', async ({ page: tab, isMobile }) => {
      test.skip(!isMobile, 'phone layout only');
      await tab.goto(gallery.path);
      const toSearch = tab.locator('#gallery button[aria-label]').last();
      await expect(toSearch).toBeHidden();
      await tab.evaluate(() => window.scrollTo(0, 4000));
      await expect(toSearch).toBeVisible();
      await toSearch.click();
      await expect(tab.getByRole('searchbox', { name: gallery.search })).toBeFocused();
    });

    for (const theme of ['dark', 'light'] as const) {
      test(`has no WCAG A/AA violations in the ${theme} theme`, async ({ page: tab }) => {
        await tab.addInitScript((value) => localStorage.setItem('theme', value), theme);
        await tab.goto(gallery.path);
        await expect(tab.locator('html')).toHaveAttribute('data-theme', theme);
        await expectNoAxeViolations(tab);
      });
    }

    test('switches language on the same page', async ({ page: tab }) => {
      await tab.goto(gallery.path);
      await tab.getByRole('link', { name: gallery.switchTo }).click();
      await expect(tab).toHaveURL(new RegExp(`${gallery.other}$`));
    });
  });
}

test('language switch keeps the reader on the same section', async ({ page }) => {
  await page.goto('/#experience');
  await page.getByRole('link', { name: 'PT – Português' }).click();
  await expect(page).toHaveURL(/\/pt\/#experience$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
});

test('theme toggle switches theme and remembers the choice', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Toggle light or dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('first visit follows the system theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('never ships retired content, unconfirmed figures or the 2022 assessment', async ({ page, request }) => {
  for (const path of ['/', '/pt/', '/projects/', '/pt/projetos/', '/cv/', '/pt/cv/', '/llms.txt', '/resume.json']) {
    const body = await (await request.get(path)).text();
    for (const text of forbidden) expect(body, `${path} contains "${text}"`).not.toContain(text);
  }
  expect((await request.get('/docs/avaliacao-qa-2022-anonimizada.pdf')).headers()['content-type'] ?? '').not.toContain('pdf');

  // Not just the HTML: every published script too.
  await page.goto('/');
  const urls = await page
    .locator('script[src], link[rel="modulepreload"]')
    .evaluateAll((els) => els.map((el) => el.getAttribute('src') ?? el.getAttribute('href') ?? ''));
  expect(urls.length).toBeGreaterThan(0);
  for (const url of urls) {
    const body = await (await request.get(url)).text();
    for (const text of forbidden) expect(body, `${url} contains "${text}"`).not.toContain(text);
  }
});

test('machine-readable files and sitemap are served', async ({ request }) => {
  const resume = await (await request.get('/resume.json')).json();
  expect(resume.basics.name).toBe('Giovanni S. Mariano');
  expect(resume.basics.label).toBe('Game QA Analyst');
  expect(resume.basics.profiles.map((p: { network: string }) => p.network)).toContain('Discord');
  expect(resume.projects).toHaveLength(6);
  expect(resume.projects[0].name).toBe('Sportia');
  expect(JSON.stringify(resume.languages)).toContain('EF SET B1');
  const llms = await (await request.get('/llms.txt')).text();
  expect(llms).toContain('# Giovanni S. Mariano — Game QA Analyst');
  expect(llms).toContain('Logic Pic (Mobile, Space Bit Games)');
  expect(llms).toContain('fortnite.gg');
  expect(llms).toContain('Discord: giogamedev');
  expect(llms).toContain('cert.efset.org/zCsGzw');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap.match(/<loc>/g)).toHaveLength(4);
});
