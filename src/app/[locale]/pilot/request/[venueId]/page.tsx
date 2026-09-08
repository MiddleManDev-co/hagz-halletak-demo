import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getVenue, venues } from '@/lib/venues';
import { notFound } from 'next/navigation';
import { FlowList, Panel, StatusPill } from '@/components/pilot-ui';
import { RequestForm } from '@/components/RequestForm';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    venues.map((venue) => ({ locale, venueId: venue.id })),
  );
}

/** Ported from `requestPage()` in dawwar-pilot.js. */
export default function PilotRequestPage({
  params,
}: {
  params: Promise<{ locale: string; venueId: string }>;
}) {
  const { locale, venueId } = use(params);
  setRequestLocale(locale);

  const venue = getVenue(venueId);
  if (!venue) notFound();

  const t = useTranslations('Pilot');
  const detail = useTranslations('VenueDetail');

  return (
    <main className="mx-auto max-w-(--container-page) px-5 py-8">
      <nav className="text-xs text-soft">
        <Link href="/explore" className="hover:text-navy">
          {detail('results')}
        </Link>
        {' / '}
        <Link href={`/venue/${venue.id}`} className="hover:text-navy">
          {venue.name}
        </Link>
        {' / '}
        {t('request_booking')}
      </nav>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <Panel>
          <StatusPill>{t('pilot_request-to-book')}</StatusPill>
          <h1 className="mt-3 text-2xl font-bold text-navy">
            {t('request_date_confirmation_quote')}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {t('dawwar_sends_a_structured_request_to_the')}
          </p>
          <RequestForm venueId={venue.id} />
        </Panel>

        <Panel>
          <h2 className="font-bold text-navy">{t('what_happens_next')}</h2>
          <FlowList
            rows={[
              {
                marker: '1',
                title: t('qualified_lead'),
                detail: t('venue_receives_date_guests_budget_and_package'),
              },
              {
                marker: '2',
                title: t('tracked_response'),
                detail: t('available_alternative_quote_more_info'),
              },
              {
                marker: '3',
                title: t('visit_or_negotiate'),
                detail: t('finalize_details_and_final_price'),
              },
              {
                marker: '4',
                title: t('both_sides_confirm'),
                detail: t('after_deposit_is_paid_directly_to_the'),
              },
            ]}
          />
        </Panel>
      </div>
    </main>
  );
}
