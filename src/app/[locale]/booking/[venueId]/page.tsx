import { use } from 'react';
import { notFound } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getVenue, venues } from '@/lib/venues';
import { FutureVisionBanner } from '@/components/FutureVisionBanner';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    venues.map((venue) => ({ locale, venueId: venue.id })),
  );
}

const FIELD =
  'w-full rounded-md border border-line bg-ivory px-3 py-2 text-sm text-ink';
const LABEL = 'mb-1 block text-xs font-semibold text-muted';

/**
 * Full checkout, ported from `booking()` in app.js. Marked Future Vision: the
 * pilot deliberately stops at a request-to-book with the deposit paid directly
 * to the venue.
 */
export default function BookingPage({
  params,
}: {
  params: Promise<{ locale: string; venueId: string }>;
}) {
  const { locale, venueId } = use(params);
  setRequestLocale(locale);

  const venue = getVenue(venueId);
  if (!venue) notFound();

  const t = useTranslations('Checkout');
  const v = useTranslations('Venue');
  const s = useTranslations('Search');
  const format = useFormatter();

  const deposit = 30000;

  return (
    <>
      <FutureVisionBanner />
      <main className="mx-auto max-w-(--container-page) px-5 py-8">
        <nav className="text-xs text-soft">
          <Link href={`/venue/${venue.id}`} className="hover:text-navy">
            {venue.name}
          </Link>
          {' / '}
          {t('breadcrumb_checkout')}
        </nav>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div className="space-y-4">
            {(
              [
                ['1', 'step_event', 'step_event_note'],
                ['2', 'step_customer', 'step_customer_note'],
                ['3', 'step_payment', 'step_payment_note'],
              ] as const
            ).map(([num, title, note]) => (
              <section
                key={num}
                className="rounded-md border border-line bg-paper p-5 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid size-7 place-items-center rounded-full bg-navy text-xs font-bold text-paper"
                  >
                    {num}
                  </span>
                  <div>
                    <strong className="block text-navy">{t(title)}</strong>
                    <span className="text-xs text-soft">{t(note)}</span>
                  </div>
                </div>

                {num === '1' && (
                  <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className={LABEL}>{s('date')}</dt>
                      <dd className={FIELD}>15 October 2027</dd>
                    </div>
                    <div>
                      <dt className={LABEL}>{s('guests')}</dt>
                      <dd className={FIELD}>300</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className={LABEL}>{t('field_package')}</dt>
                      <dd className={FIELD}>
                        Wedding Plus — {format.number(145000)}
                      </dd>
                    </div>
                  </dl>
                )}

                {num === '2' && (
                  <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className={LABEL}>{t('field_name')}</dt>
                      <dd className={FIELD}>{t('customer_name')}</dd>
                    </div>
                    <div>
                      <dt className={LABEL}>{t('field_mobile')}</dt>
                      <dd className={FIELD}>0100 123 4567</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className={LABEL}>{t('field_notes')}</dt>
                      <dd className={FIELD}>{t('notes_value')}</dd>
                    </div>
                  </dl>
                )}

                {num === '3' && (
                  <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                    {(['pay_card', 'pay_instapay', 'pay_transfer'] as const).map(
                      (key) => (
                        <li
                          key={key}
                          className="rounded-md border border-line bg-ivory px-3 py-2 text-center text-sm font-medium text-navy"
                        >
                          {t(key)}
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <aside className="rounded-md border border-line bg-paper p-5 shadow-card lg:sticky lg:top-20">
            <strong className="text-navy">{t('summary')}</strong>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{t('total')}</dt>
                <dd className="font-semibold text-navy">
                  {v('price', { value: format.number(venue.priceFrom) })}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{t('deposit')}</dt>
                <dd className="font-semibold text-navy">
                  {v('price', { value: format.number(deposit) })}
                </dd>
              </div>
            </dl>

            <Link
              href="/success"
              className="mt-5 block rounded-md bg-navy px-4 py-2.5 text-center text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
            >
              {t('confirm')}
            </Link>
          </aside>
        </div>
      </main>
    </>
  );
}
