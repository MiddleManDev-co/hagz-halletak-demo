import { expect, test } from '@playwright/test';
import { TOURS, TOUR_IDS } from '../../src/lib/tours';

/**
 * `?tour=<id>` links are published in DEMO-LINKS.md, so each one must land on
 * its first step. The ids are a compatibility contract, not an internal detail.
 */
test.describe('guided tours', () => {
  for (const id of TOUR_IDS) {
    test(`?tour=${id} starts at its first step`, async ({ page }) => {
      const first = TOURS[id].steps[0]!;

      await page.goto(`en/?tour=${id}`);

      // The tour drives the route, so the first step's screen should open.
      const expected = first.route === 'home' ? '/en/' : `/en/${first.route}/`;
      await page.waitForURL(new RegExp(expected.replace(/\//g, '\\/')));

      await expect(page.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        '1',
      );
      await expect(page.getByRole('progressbar')).toHaveAttribute(
        'aria-valuemax',
        String(TOURS[id].steps.length),
      );
    });
  }

  test('the tour param is dropped so a reload does not restart it', async ({
    page,
  }) => {
    await page.goto('en/?tour=customer');
    await page.waitForURL(/\/en\/$/);
    expect(page.url()).not.toContain('tour=');
  });

  test('walking forward advances the step and the route', async ({ page }) => {
    await page.goto('en/?tour=customer');
    await page.waitForURL(/\/en\/$/);

    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForURL(/\/en\/explore\//);
    await expect(page.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '2',
    );

    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForURL(/\/en\/$/);
    await expect(page.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '1',
    );
  });

  test('a tour survives a reload mid-way', async ({ page }) => {
    await page.goto('en/?tour=customer');
    await page.waitForURL(/\/en\/$/);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForURL(/\/en\/explore\//);

    await page.reload();
    await expect(page.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '2',
    );
  });

  test('the venue tour switches persona along with the route', async ({
    page,
  }) => {
    await page.goto('en/?tour=venue');
    await page.waitForURL(/\/en\/venue-os\//);

    // Step one of the venue tour is the venue persona's own overview.
    await expect(
      page
        .getByRole('navigation', { name: /· (mobile )?navigation$/ })
        .getByRole('link', { name: /Dates|Today/ })
        .first(),
    ).toBeVisible();
  });

  test('suggested-next appears outside a tour and moves the demo on', async ({
    page,
  }) => {
    await page.goto('en/');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForURL(/\/en\/explore\//);
  });
});
