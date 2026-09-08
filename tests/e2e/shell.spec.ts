import { expect, test } from '@playwright/test';

test.describe('static export shell', () => {
  test('serves Arabic RTL at /ar/', async ({ page }) => {
    await page.goto('ar/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'ar');
    await expect(html).toHaveAttribute('dir', 'rtl');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('دوّر');
  });

  test('serves English LTR at /en/', async ({ page }) => {
    await page.goto('en/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
    await expect(html).toHaveAttribute('dir', 'ltr');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Find a venue that is actually available',
    );
  });

  test('root forwards to a locale', async ({ page }) => {
    await page.goto('./');
    await page.waitForURL(/\/(ar|en)\//);
    expect(page.url()).toMatch(/\/(ar|en)\//);
  });
});
