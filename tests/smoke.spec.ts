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
  },
];

/** 116 unique titles: 109 games and 7 web apps (Island Defense is the old name of Coconuts vs Pirates). */
const TITLES = 116;

/** Retired positioning, summed totals and fictional samples: none of it may come back. */
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

    test('serves its resume as PDF and Word', async ({ request }) => {
      const pdf = await request.get(`${page.cv}.pdf`);
      expect(pdf.status()).toBe(200);
      expect(pdf.headers()['content-type']).toContain('pdf');
      const docx = await request.get(`${page.cv}.docx`);
      expect(docx.status()).toBe(200);
      // A .docx is a zip archive: it starts with "PK".
      expect((await docx.body()).subarray(0, 2).toString()).toBe('PK');
    });

    test('shows project names in the page language', async ({ page: tab }) => {
      await tab.goto(page.path);
      await expect(tab.getByRole('heading', { level: 3, name: page.caixa })).toBeVisible();
    });

    test('has 6 featured projects with context, contribution, evidence and sourced figures', async ({ page: tab }) => {
      await tab.goto(page.path);
      const cards = tab.locator('#projects article');
      await expect(cards).toHaveCount(6);
      await expect(tab.locator('#projects article img:not([aria-hidden="true"])')).toHaveCount(6);
      await expect(cards.locator('dt', { hasText: page.contribution })).toHaveCount(6);
      await expect(cards.locator('dd a[href^="https://"]')).toHaveCount(6);
      const football = cards.filter({ hasText: 'Football Tycoon' });
      await expect(football).toContainText(page.minutes);
      await expect(football).toContainText('fortnite.gg');
    });

    test('links to the full catalog', async ({ page: tab }) => {
      await tab.goto(page.path);
      await tab.locator('#projects a.btn-primary').click();
      await expect(tab.getByRole('heading', { level: 1 })).toHaveText(new RegExp(String(TITLES)));
    });

    test('serves the anonymized QA assessment', async ({ page: tab, request }) => {
      await tab.goto(page.path);
      const href = await tab.locator('#evidence a[href$=".pdf"]').getAttribute('href');
      const pdf = await request.get(href ?? '');
      expect(pdf.status()).toBe(200);
      expect(pdf.headers()['content-type']).toContain('pdf');
    });

    test('credits the whole Testathon team and shows the testimonial as text', async ({ page: tab }) => {
      await tab.goto(page.path);
      await expect(tab.locator('#recognition ul li a')).toHaveCount(5);
      await expect(tab.locator('#recognition blockquote')).toContainText('Giovanni');
      await expect(tab.locator('#recognition img')).toHaveCount(0);
    });

    test('opens a certificate in a dialog that closes with Escape', async ({ page: tab }) => {
      await tab.goto(page.path);
      const opener = tab.locator('#education button[aria-haspopup="dialog"]').first();
      await opener.focus();
      await tab.keyboard.press('Enter');
      const dialog = tab.locator('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.locator('img')).toBeVisible();
      await tab.keyboard.press('Escape');
      await expect(dialog).toBeHidden();
      await expect(opener).toBeFocused();
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
    });

    test('filters by platform and puts the filter in the URL', async ({ page: tab }) => {
      await tab.goto(gallery.path);
      const fortnite = tab.getByRole('button', { name: /Fortnite\/UEFN/ });
      await fortnite.click();
      await expect(fortnite).toHaveAttribute('aria-pressed', 'true');
      await expect(visibleTiles(tab)).toHaveCount(20);
      await expect(tab).toHaveURL(/\?p=fortnite-uefn/);
    });

    test('searches, shows an empty state and clears the filters', async ({ page: tab }) => {
      await tab.goto(gallery.path);
      const search = tab.getByRole('searchbox', { name: gallery.search });
      await search.fill('tycoon');
      await expect(visibleTiles(tab).filter({ hasNotText: /tycoon/i })).toHaveCount(0);
      expect(await visibleTiles(tab).count()).toBeGreaterThan(0);
      await search.fill('zzzz');
      await expect(tab.getByText(gallery.empty)).toBeVisible();
      await tab.getByRole('button', { name: gallery.clear }).click();
      await expect(search).toHaveValue('');
      await expect(visibleTiles(tab)).toHaveCount(TITLES);
    });

    test('restores the filters from a shared URL', async ({ page: tab }) => {
      await tab.goto(`${gallery.path}?p=fortnite-uefn&q=tycoon`);
      await expect(tab.getByRole('button', { name: /Fortnite\/UEFN/ })).toHaveAttribute('aria-pressed', 'true');
      await expect(tab.getByRole('searchbox', { name: gallery.search })).toHaveValue('tycoon');
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

test('never ships fictional samples, summed totals or senior/lead positioning', async ({ page, request }) => {
  for (const path of ['/', '/pt/', '/projects/', '/pt/projetos/', '/cv/', '/pt/cv/', '/llms.txt', '/resume.json']) {
    const body = await (await request.get(path)).text();
    for (const text of forbidden) expect(body, `${path} contains "${text}"`).not.toContain(text);
  }

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
  expect(resume.projects).toHaveLength(6);
  const llms = await (await request.get('/llms.txt')).text();
  expect(llms).toContain('# Giovanni S. Mariano — Game QA Analyst');
  expect(llms).toContain('Logic Pic (Mobile, Space Bit Games)');
  expect(llms).toContain('fortnite.gg');
  expect(llms).toContain('avaliacao-qa-2022-anonimizada.pdf');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap.match(/<loc>/g)).toHaveLength(4);
});
