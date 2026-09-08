'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { freshness } from '@/lib/freshness';
import type { Venue } from '@/lib/venues';

/**
 * The pilot booking sidebar, ported from `enhanceVenue()` in dawwar-pilot.js —
 * which replaced app.js's hold-and-pay box entirely. There is deliberately no
 * hold and no platform payment: the pilot ends at a request-to-book.
 */
export function VenueBookingPanel({ venue }: { venue: Venue }) {
  const t = useTranslations('Pilot');
  const v = useTranslations('Venue');
  const format = useFormatter();
  const fresh = freshness(venue.updatedDaysAgo);

  return (
    <aside className="rounded-md border border-line bg-paper p-5 shadow-card lg:sticky lg:top-20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs text-soft">{t('starting_price')}</span>
          <div className="text-2xl font-bold text-navy">
            {v('price', { value: format.number(venue.priceFrom) })}
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-status-green-bg px-2.5 py-1 text-xs font-semibold text-status-green">
          {v('verified')}
        </span>
      </div>

      <div className="mt-4 rounded-md border border-line bg-ivory p-3">
        <strong className="block text-sm text-navy">
          {t('pilot_availability_is_venue-confirmed')}
        </strong>
        <p className="mt-1 text-xs text-muted">
          {t('demo_freshness_current_send_a_request-to-book_to')}
        </p>
        <p
          className={`mt-2 text-xs ${fresh.tone === 'stale' ? 'font-semibold text-status-orange' : 'text-soft'}`}
        >
          <span aria-hidden>◷ </span>
          {fresh.key === 'fresh_yesterday'
            ? v(fresh.key)
            : v(fresh.key, { days: fresh.days })}
        </p>
      </div>

      <p className="mt-3 text-xs text-soft">
        {v('responds_in', { hours: venue.respondsInHours })}
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Link
          href="/visits"
          className="rounded-md border border-line bg-surface px-4 py-2.5 text-center text-sm font-semibold text-navy transition-colors hover:bg-line"
        >
          {t('schedule_visit_first')}
        </Link>
        <Link
          href={`/pilot/request/${venue.id}`}
          className="rounded-md bg-navy px-4 py-2.5 text-center text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
        >
          {t('request_booking_cta')}
        </Link>
      </div>

      <p className="mt-3 text-xs text-soft">
        {t('no_online_hold_or_platform_payment_in')}
      </p>
    </aside>
  );
}
