import { expect, test, type Page } from '@playwright/test';

/**
 * The recommended demo narrative from DEMO-LINKS.md:
 * search -> availability -> request-to-book -> venue quote -> confirmed
 * booking -> VenueOS commission -> Admin/Ops.
 *
 * Asserted in both locales because the Arabic RTL build is the primary one.
 */
const STORY = {
  ar: {
    seeVenues: 'شوف القاعات المناسبة',
    requestBooking: 'اطلب الحجز',
    sendRequest: 'إرسال الطلب للقاعة',
    confirmBooking: 'العربون اتدفع للقاعة',
    bookingConfirmed: 'الحجز اتأكد',
    venueSide: 'شوف نفس الحجز عند القاعة',
    adminSide: 'شوف التسوية عند الإدارة',
    opsHeading: 'تشغيل السوق قبل الأتمتة الثقيلة',
  },
  en: {
    seeVenues: 'See matching venues',
    requestBooking: 'Request booking',
    sendRequest: 'Send request to venue',
    confirmBooking: 'Deposit paid to venue',
    bookingConfirmed: 'Booking confirmed',
    venueSide: 'See the venue side',
    adminSide: 'See admin reconciliation',
    opsHeading: 'Operate the marketplace before heavy automation',
  },
} as const;

async function walkStory(page: Page, locale: keyof typeof STORY) {
  const copy = STORY[locale];

  await page.goto(`${locale}/`);
  await page.getByRole('link', { name: new RegExp(copy.seeVenues) }).click();
  await expect(page).toHaveURL(new RegExp(`/${locale}/explore/`));

  // Availability-first results: every card carries a freshness signal.
  const cards = page.getByRole('article');
  await expect(cards.first()).toBeVisible();

  await page.goto(`${locale}/venue/royal-garden/`);
  await page
    .getByRole('link', { name: new RegExp(copy.requestBooking) })
    .click();
  await expect(page).toHaveURL(
    new RegExp(`/${locale}/pilot/request/royal-garden/`),
  );

  await page.getByRole('button', { name: new RegExp(copy.sendRequest) }).click();
  await expect(page).toHaveURL(
    new RegExp(`/${locale}/pilot/quote/royal-garden/`),
  );

  await page.getByRole('link', { name: new RegExp(copy.confirmBooking) }).click();
  await expect(page).toHaveURL(new RegExp(`/${locale}/pilot/confirmed/`));
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    copy.bookingConfirmed,
  );
  await expect(page.getByText('MTR-2031')).toBeVisible();

  await page.getByRole('link', { name: new RegExp(copy.venueSide) }).click();
  await expect(page).toHaveURL(new RegExp(`/${locale}/pilot/commission/`));

  await page.getByRole('link', { name: new RegExp(copy.adminSide) }).click();
  await expect(page).toHaveURL(new RegExp(`/${locale}/pilot/ops/`));
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    copy.opsHeading,
  );
}

test.describe('pilot demo story', () => {
  test('walks the Arabic narrative end to end', async ({ page }) => {
    await walkStory(page, 'ar');
  });

  test('walks the English narrative end to end', async ({ page }) => {
    await walkStory(page, 'en');
  });
});

test.describe('legacy links', () => {
  test('a published hash link still lands on the venue', async ({ page }) => {
    await page.goto('ar/#/venue/royal-garden');
    await page.waitForURL(/\/ar\/venue\/royal-garden\//);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Royal Garden',
    );
  });

  test('a legacy tour link still starts its tour', async ({ page }) => {
    // The navigator consumes `?tour=` and drops it from the URL, so the
    // contract is that the tour starts — not that the param lingers.
    await page.goto('ar/?tour=full#/explore');

    await expect(page.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '1',
    );
    expect(page.url()).not.toContain('tour=');
  });
});

test.describe('shortlist', () => {
  test('persists across a reload', async ({ page }) => {
    await page.goto('en/venue/royal-garden/');

    const toggle = page.getByRole('button', { name: /shortlist/i });
    const before = await toggle.getAttribute('aria-pressed');
    await toggle.click();
    await expect(toggle).toHaveAttribute(
      'aria-pressed',
      before === 'true' ? 'false' : 'true',
    );

    await page.reload();
    await expect(page.getByRole('button', { name: /shortlist/i })).toHaveAttribute(
      'aria-pressed',
      before === 'true' ? 'false' : 'true',
    );
  });
});
