import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
] as const;

test.describe('Responsive Layout', () => {
  for (const vp of VIEWPORTS) {
    test(`home page renders at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      await expect(page.locator('footer')).toBeVisible();
    });

    test(`showcase page has ${vp.width >= 1024 ? 3 : vp.width >= 768 ? 2 : 1} cols at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/our-work', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      const heading = page.getByRole('heading', { name: 'Our Services' });
      await expect(heading).toBeVisible();

      const grid = page.locator('div.grid:has(> div.rounded-2xl)');
      const count = await grid.count();
      console.log(`[${vp.name}] Found ${count} grid(s) with cards`);

      const cls = await grid.first().getAttribute('class');
      console.log(`[${vp.name}] Grid:`, cls);

      if (vp.width >= 1024) {
        expect(cls).toContain('lg:grid-cols-3');
      } else if (vp.width >= 768) {
        expect(cls).toContain('md:grid-cols-2');
      } else {
        expect(cls).toContain('grid-cols-1');
      }
    });

    test(`all products page renders at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/products', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await expect(page.getByText('Our All Products')).toBeVisible();
    });

    test(`contact page renders at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/contact', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await expect(page.getByText('Contact Vistaline')).toBeVisible();
    });
  }

  test('no horizontal overflow on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const urls = ['/', '/our-work', '/products', '/contact'];

    for (const url of urls) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);

      const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerW = await page.evaluate(() => window.innerWidth);
      console.log(`[${url}] scrollWidth=${scrollW}, innerWidth=${innerW}`);
      expect(scrollW <= innerW + 2).toBeTruthy();
    }
  });
});
