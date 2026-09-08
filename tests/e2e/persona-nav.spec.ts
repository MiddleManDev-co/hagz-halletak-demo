import { expect, test, type Page } from '@playwright/test';
import {
  PERSONA_HOME,
  PERSONA_NAV,
  PERSONA_MOBILE_NAV,
} from '../../src/lib/personas';
import { PERSONAS } from '../../src/lib/demo-state';

/**
 * Each persona sees only its own routes (the "single owner" property the legacy
 * build fixed). A nav entry pointing at a route the export never generated is a
 * dead link in the shipped demo, so every destination is checked directly
 * against the built output.
 */
const ALL_HREFS = [
  ...new Set([
    ...PERSONAS.flatMap((persona) => PERSONA_NAV[persona].map((i) => i.href)),
    ...PERSONAS.flatMap((persona) => PERSONA_MOBILE_NAV[persona]),
    ...PERSONAS.map((persona) => PERSONA_HOME[persona]),
  ]),
];

test.describe('persona navigation', () => {
  for (const href of ALL_HREFS) {
    test(`en${href} is a real page`, async ({ page }) => {
      const target = href === '/' ? 'en/' : `en${href}/`.replace(/^\//, 'en/');
      const response = await page.goto(target);

      expect(response?.status(), `${href} should not 404`).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
  }

/**
 * The topbar switcher is desktop-only; smaller viewports get the dialog. Both
 * paths must work, so the helper picks whichever this viewport exposes.
 */
async function switchPersona(page: Page, label: string) {
  const chip = page.getByRole('link', { name: label, exact: true });

  if (await chip.isVisible().catch(() => false)) {
    await chip.click();
    return;
  }

  await page.getByRole('button', { name: 'Choose a Dawwar view' }).click();
  await page
    .getByRole('dialog')
    .getByRole('button', { name: label, exact: true })
    .click();
}

  test('switching persona swaps the visible navigation', async ({ page }) => {
    await page.goto('en/');

    await switchPersona(page, 'Venue');
    await page.waitForURL(/\/en\/venue-os\//);

    // The venue persona has its own vocabulary: Dates/Requests, not Venues.
    const mobileNav = page.getByRole('navigation', {
      name: /· (mobile )?navigation$/,
    });
    await expect(
      mobileNav.getByRole('link', { name: 'Dates' }).first(),
    ).toBeVisible();
  });

  test('the chosen persona survives a reload', async ({ page }) => {
    await page.goto('en/');
    await switchPersona(page, 'Admin');
    await page.waitForURL(/\/en\/pilot\/ops\//);

    await page.reload();
    await expect(
      page
        .getByRole('navigation', { name: /· (mobile )?navigation$/ })
        .getByRole('link', { name: /Venue checks|Operations/ })
        .first(),
    ).toBeVisible();
  });
});
