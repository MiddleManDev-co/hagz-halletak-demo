import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { legacyHashToPath } from '@/components/LegacyHashRedirect';
import { routing } from '@/i18n/routing';

/**
 * Every route the vanilla demo could reach must still resolve after the
 * migration. These are the hashes in DEMO-LINKS.md and in whatever anyone has
 * already shared, so a missing page here is a broken published link.
 *
 * Reads the built export, so it only means anything after `next build`.
 */
const OUT = join(process.cwd(), 'out');
const BUILT = existsSync(OUT);

/** Every route reachable in the legacy build, from its own route dispatchers. */
const LEGACY_ROUTES = [
  'home',
  'explore',
  'compare',
  'my-wedding',
  'account',
  'visits',
  'messages',
  'notifications',
  'booking-details',
  'refund',
  'states',
  'package-builder',
  'map',
  'vision',
  'investor',
  'strategy-simulator',
  'flexible-dates',
  'datedrop',
  'request-offers',
  '360-manager',
  'content-quality',
  'success',
  'venue/royal-garden',
  'booking/royal-garden',
  'pilot/request/royal-garden',
  'pilot/quote/royal-garden',
  'pilot/confirmed',
  'pilot/commission',
  'pilot/ops',
  'venue-os',
  'venue-os/calendar',
  'venue-os/leads',
  'venue-os/visits',
  'venue-os/bookings',
  'venue-os/team',
  'venue-os/business-center',
  'venue-os/revenue-intelligence',
  'venue-os/action-center',
  'venue-os/360-manager',
  'venue-os/quick-booking',
  'admin',
  'admin/verification',
  'admin/venues',
  'admin/bookings',
  'admin/support',
  'admin/economics',
  'admin/marketplace-health',
  'admin/disputes',
  'admin/payouts',
  'admin/promotions',
  'admin/reviews',
  'admin/content-quality',
];

function pageExists(locale: string, route: string): boolean {
  const mapped = legacyHashToPath(`#/${route}`);
  const segments = [locale, ...(mapped ? mapped.split('/') : [])];
  return existsSync(join(OUT, ...segments, 'index.html'));
}

describe.skipIf(!BUILT)('route coverage', () => {
  for (const locale of routing.locales) {
    it(`renders every legacy route in ${locale}`, () => {
      const missing = LEGACY_ROUTES.filter(
        (route) => !pageExists(locale, route),
      );
      expect(missing).toEqual([]);
    });
  }

  it('ships the static assets Pages needs', () => {
    // Without .nojekyll a Jekyll pass would drop the _next/ directory.
    expect(existsSync(join(OUT, '.nojekyll'))).toBe(true);
    // review.html is carried over unported and must keep its URL.
    expect(existsSync(join(OUT, 'review.html'))).toBe(true);
  });

  it('serves the locale root and the redirect shell', () => {
    expect(existsSync(join(OUT, 'index.html'))).toBe(true);
    for (const locale of routing.locales) {
      expect(existsSync(join(OUT, locale, 'index.html'))).toBe(true);
    }
  });
});
