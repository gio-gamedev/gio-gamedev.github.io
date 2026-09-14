import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = [
  { path: '/', lang: 'en', section: 'Selected QA Projects', cv: '/cv/Giovanni-Mariano-Game-QA-EN.pdf' },
  { path: '/pt/', lang: 'pt-BR', section: 'Projetos de QA em destaque', cv: '/cv/Giovanni-Mariano-Game-QA-PT.pdf' },
];

for (const page of pages) {
  test.describe(`page ${page.path}`, () => {
    test('renders the prerendered content without console errors', async ({ page: tab }) => {
      const errors: string[] = [];
      tab.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
      tab.on('pageerror', (error) => errors.push(error.message));

      await tab.goto(page.path);
      await expect(tab.locator('html')).toHaveAttribute('lang', page.lang);
      await expect(tab.getByRole('heading', { level: 1 })).toHaveText('Giovanni S. Mariano');
      await expect(tab.getByRole('heading', { name: page.section })).toBeVisible();
      await tab.waitForLoadState('networkidle');
      expect(errors).toEqual([]);
    });

    for (const theme of ['dark', 'light'] as const) {
      test(`has no WCAG A/AA violations in the ${theme} theme`, async ({ page: tab }) => {
        await tab.addInitScript((value) => localStorage.setItem('theme', value), theme);
        await tab.goto(page.path);
        await expect(tab.locator('html')).toHaveAttribute('data-theme', theme);
        const results = await new AxeBuilder({ page: tab }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual(
          [],
        );
      });
    }

    test('serves its resume PDF', async ({ request }) => {
      const response = await request.get(page.cv);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('pdf');
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

test('work sample tabs switch with mouse and keyboard', async ({ page }) => {
  await page.goto('/');
  const tabs = page.getByRole('tab');
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toHaveCount(1);
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.nth(2)).toBeFocused();
});

test('draft samples never ship in the production build', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('tab')).toHaveCount(3);
  await expect(page.getByText('FICTIONAL DRAFT')).toHaveCount(0);
});

test('machine-readable resume files are served', async ({ request }) => {
  const resume = await (await request.get('/resume.json')).json();
  expect(resume.basics.name).toBe('Giovanni S. Mariano');
  expect(resume.basics.label).toBe('Game QA Analyst');
  const llms = await (await request.get('/llms.txt')).text();
  expect(llms).toContain('# Giovanni S. Mariano — Game QA Analyst');
});
