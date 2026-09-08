import { use } from 'react';
import { notFound } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getVenue, venues } from '@/lib/venues';
import { Callout, FlowList, Panel, StatusPill } from '@/components/pilot-ui';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    venues.map((venue) => ({ locale, venueId: venue.id })),
  );
}

/** The agreed price the venue responds with, from `quotePage()`. */
const FINAL_QUOTE = 148000;

/** Ported from `quotePage()` in dawwar-pilot.js. */
export default function PilotQuotePage({
  params,
}: {
  params: Promise<{ locale: string; venueId: string }>;
}) {
  const { locale, venueId } = use(params);
  setRequestLocale(locale);

  const venue = getVenue(venueId);
  if (!venue) notFound();

  const t = useTranslations('Pilot');
  const v = useTranslations('Venue');
  const format = useFormatter();

  return (
    <main className="mx-auto max-w-(--container-page) px-5 py-8">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <Panel>
          <StatusPill>
            <span aria-hidden>✓ </span>
            {t('venue_responded_available')}
          </StatusPill>
          <h1 className="mt-3 text-2xl font-bold text-navy">{venue.name}</h1>
          <p className="mt-2 text-sm text-muted">
            {t('15_october_2027_is_available_the_venue')}
          </p>

          <div className="mt-5 flex flex-wrap items-baseline gap-2">
            <strong className="text-3xl font-bold text-navy">
              {v('price', { value: format.number(FINAL_QUOTE) })}
            </strong>
            <small className="text-sm text-muted">
              {t('final_agreed_venue_price')}
            </small>
          </div>

          <div className="mt-4 rounded-md border border-line bg-ivory p-4">
            <strong className="block text-navy">{t('wedding_plus')}</strong>
            <p className="mt-1 text-sm text-muted">
              {t('300_guests_buffet_dj_decoration_parking')}
            </p>
          </div>

          <Callout>
            <strong>{t('pilot_payment_model')}</strong>{' '}
            {t('deposit_is_paid_directly_to_the_venue')}
          </Callout>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/visits"
              className="rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-line"
            >
              {t('schedule_visit_first')}
            </Link>
            <Link
              href="/pilot/confirmed"
              className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
            >
              {t('deposit_paid_to_venue_confirm_booking')}
            </Link>
          </div>
        </Panel>

        <Panel>
          <h2 className="font-bold text-navy">{t('why_does_dawwar_track_this')}</h2>
          <p className="mt-2 text-sm text-muted">
            {t('to_preserve_booking_attribution_lead_quote_visit')}
          </p>
          <FlowList
            rows={[
              {
                marker: '✓',
                title: t('source_attribution'),
                detail: t('enquiry_quote_booking'),
              },
              {
                marker: '✓',
                title: t('customer_confirmation'),
                detail: t('customer_confirms_the_booking_happened'),
              },
              {
                marker: '✓',
                title: t('venue_confirmation'),
                detail: t('venue_confirms_deposit_receipt_and_final_value'),
              },
            ]}
          />
        </Panel>
      </div>
    </main>
  );
}
