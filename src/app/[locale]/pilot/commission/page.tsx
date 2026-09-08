import { use } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { FlowList, Panel, Stat, StatusPill } from '@/components/pilot-ui';

const FINAL_QUOTE = 148000;

/** Ported from `commissionPage()` in dawwar-pilot.js. */
export default function PilotCommissionPage({
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
    <main className="mx-auto max-w-(--container-page) px-5 py-8">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <Panel>
          <StatusPill>{t('venueos_lite')}</StatusPill>
          <h1 className="mt-3 text-2xl font-bold text-navy">
            {t('booking_dwr-2031_won')}
          </h1>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Stat
              label={t('final_venue_value')}
              value={v('price', { value: format.number(FINAL_QUOTE) })}
            />
            <Stat label={t('deposit')} value={t('received')} />
          </div>

          <FlowList
            rows={[
              {
                marker: '✓',
                title: t('lead_from_dawwar'),
                detail: t('request_rq-8142'),
              },
              {
                marker: '✓',
                title: t('customer_confirmed'),
                detail: t('28_aug_2026'),
              },
              {
                marker: '✓',
                title: t('venue_confirmed_deposit'),
                detail: t('booking_now_counts_as_platform-sourced'),
              },
            ]}
          />

          <Link
            href="/venue-os/leads"
            className="mt-5 inline-block rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-line"
          >
            {t('open_leads_crm')}
          </Link>
        </Panel>

        <div>
          <div className="rounded-md bg-navy p-5 text-paper shadow-card">
            <small className="block text-xs opacity-80">
              {t('success_commission_pilot_rule')}
            </small>
            <strong className="mt-1 block text-3xl font-bold">{t('due')}</strong>
            <p className="mt-2 text-sm opacity-85">
              {t('the_rule_is_configurable_versioned_the_permanent')}
            </p>
          </div>

          <Panel className="mt-4">
            <h2 className="font-bold text-navy">{t('why_the_venue_pays')}</h2>
            <p className="mt-2 text-sm text-muted">
              {t('dawwar_sourced_a_qualified_lead_and_tracked')}
            </p>
            <Link
              href="/pilot/ops"
              className="mt-4 block rounded-md bg-navy px-4 py-2.5 text-center text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
            >
              {t('see_admin_reconciliation')}
            </Link>
          </Panel>
        </div>
      </div>
    </main>
  );
}
