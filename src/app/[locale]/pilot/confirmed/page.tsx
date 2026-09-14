import { use } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Callout, Panel, StatusPill } from '@/components/pilot-ui';

const BOOKING_REF = 'MTR-2031';
const FINAL_QUOTE = 148000;

/** Ported from `confirmedPage()` in dawwar-pilot.js. */
export default function PilotConfirmedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Pilot');
  const v = useTranslations('Venue');
  const format = useFormatter();

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <Panel className="text-center">
        <div
          aria-hidden
          className="mx-auto grid size-14 place-items-center rounded-full bg-status-green-bg text-2xl text-status-green"
        >
          ✓
        </div>
        <div className="mt-4">
          <StatusPill>{t('confirmed_by_customer_venue')}</StatusPill>
        </div>
        <h1 className="mt-3 text-3xl font-bold text-navy">
          {t('booking_confirmed')}
        </h1>
        <div className="mt-2 text-lg font-semibold tracking-wide text-burgundy">
          {BOOKING_REF}
        </div>
        <p className="mt-2 text-sm text-muted">
          Royal Garden · 15 Oct 2027 ·{' '}
          {v('price', { value: format.number(FINAL_QUOTE) })}
        </p>

        <Callout>{t('deposit_was_paid_directly_to_the_venue')}</Callout>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/pilot/commission"
            className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
          >
            {t('see_the_venue_side')}
          </Link>
          <Link
            href="/account"
            className="rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-line"
          >
            {t('customer_account')}
          </Link>
        </div>
      </Panel>
    </main>
  );
}
