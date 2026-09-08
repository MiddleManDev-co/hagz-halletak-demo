import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { venues } from '@/lib/venues';
import { VenueCard } from '@/components/VenueCard';
import { SearchPanel } from '@/components/SearchPanel';

/**
 * Ported from `pilotHome()` in dawwar-pilot.js — which replaced app.js's
 * `home()` wholesale at runtime, so the pilot story is what visitors actually
 * saw.
 */
export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Pilot');

  return (
    <main>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-(--container-page) gap-10 px-5 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-status-green-bg px-3 py-1 text-xs font-semibold text-status-green">
              {t('pilot_mvp_trusted_venue_marketplace')}
            </span>

            <h1 className="mt-4 text-4xl leading-tight font-bold text-navy sm:text-5xl">
              {t('find_a_venue')}{' '}
              <span className="text-burgundy">
                {t('that_is_actually_available')}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-muted">
              {t('instead_of_calling_venue_after_venue_enter')}
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-navy-2">
              {(
                [
                  'free_for_customers',
                  'free_venue_onboarding_during_pilot',
                  'success_commission_only',
                ] as const
              ).map((key) => (
                <li key={key} className="flex items-center gap-1.5">
                  <span aria-hidden className="text-status-green">
                    ✓
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/explore"
                className="rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
              >
                {t('see_matching_venues')}
              </Link>
              <Link
                href="/venue-os"
                className="rounded-md border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-line"
              >
                {t('i_own_a_venue')}
              </Link>
            </div>
          </div>

          <SearchPanel />
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-(--container-page) gap-6 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ['customer_promise', 'faster_credible_venue_shortlist'],
              ['venue_promise', 'qualified_leads_pay_on_success'],
              ['launch_revenue', 'simple_success_commission'],
              ['not_launch_scope', 'payments_360_ai'],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <div className="text-xs font-semibold tracking-wide text-soft uppercase">
                {t(label)}
              </div>
              <strong className="mt-1 block text-navy">{t(value)}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-(--container-page) px-5 py-14">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-wide text-burgundy uppercase">
              {t('pilot_flow')}
            </div>
            <h2 className="mt-2 text-3xl font-bold text-navy">
              {t('booking_does_not_need_to_be_instant')}
            </h2>
            <p className="mt-3 text-muted">
              {t('weddings_involve_negotiation_visits_and_package_changes')}
            </p>
          </div>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {(
              [
                ['search', 'date_area_guests_budget'],
                ['shortlist', 'verified_venues_with_availability_and_price_context'],
                ['request', 'venue_receives_a_qualified_lead_and_responds'],
                ['visit_agree', 'customer_visits_or_finalizes_details_and_final'],
                ['confirm', 'deposit_goes_directly_to_the_venue_both'],
              ] as const
            ).map(([title, body], index) => (
              <li
                key={title}
                className="rounded-md border border-line bg-ivory p-4 shadow-card"
              >
                <span className="grid size-7 place-items-center rounded-full bg-navy text-xs font-bold text-paper">
                  {index + 1}
                </span>
                <strong className="mt-3 block text-navy">{t(title)}</strong>
                <p className="mt-1 text-sm text-muted">{t(body)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-ivory">
        <div className="mx-auto max-w-(--container-page) px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold tracking-wide text-burgundy uppercase">
                {t('venueos_lite')}
              </div>
              <h2 className="mt-2 text-3xl font-bold text-navy">
                {t('a_lightweight_operating_tool_that_keeps_supply')}
              </h2>
              <p className="mt-3 text-muted">
                {t('for_pilot_venues_need_calendar_leads_visits')}
              </p>
            </div>
            <Link
              href="/venue-os"
              className="rounded-md border border-line bg-paper px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-surface"
            >
              {t('open_venueos_lite')}
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ['calendar', 'online_offline_availability_in_one_place'],
                ['leads', 'every_enquiry_response_time_and_status'],
                ['visits_bookings', 'visit_to_negotiation_to_confirmed_booking'],
                ['commission', 'transparent_commission_due_to_dawwar'],
              ] as const
            ).map(([title, body]) => (
              <div
                key={title}
                className="rounded-md border border-line bg-paper p-4 shadow-card"
              >
                <strong className="block text-navy">{t(title)}</strong>
                <p className="mt-1 text-sm text-muted">{t(body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-(--container-page) px-5 py-14">
          <h2 className="text-3xl font-bold text-navy">
            {t('verified_venues_with_availability_and_price_context')}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {venues.slice(0, 3).map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
