import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { FlowList, Panel, Stat, StatusPill } from '@/components/pilot-ui';

/** Ported from `opsPage()` in dawwar-pilot.js. */
export default function PilotOpsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Pilot');

  return (
    <main className="mx-auto max-w-(--container-page) px-5 py-8">
      <Panel>
        <StatusPill>{t('admin_ops_pilot')}</StatusPill>
        <h1 className="mt-3 text-2xl font-bold text-navy">
          {t('operate_the_marketplace_before_heavy_automation')}
        </h1>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label={t('verified_venues')} value="24" />
          <Stat label={t('fresh_availability')} value="91%" />
          <Stat label={t('pending_enquiries')} value="7" />
          <Stat label={t('commission_due')} value={t('demo')} />
        </div>

        <FlowList
          rows={[
            {
              marker: '1',
              title: t('verification_queue'),
              detail: t('only_verified_venues_enter_customer_search'),
            },
            {
              marker: '2',
              title: t('stale_availability_queue'),
              detail: t('ops_follows_up_before_stale_inventory_damages'),
            },
            {
              marker: '3',
              title: t('booking_attribution'),
              detail: `DWR-2031 ← RQ-8142 ← ${t('dawwar_search')}`,
            },
            {
              marker: '4',
              title: t('commission_reconciliation'),
              detail: t('due_paid_waived_disputed_reversed_with_audit'),
            },
          ]}
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/admin/verification"
            className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
          >
            {t('open_verification')}
          </Link>
          <Link
            href="/vision"
            className="rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-line"
          >
            {t('future_vision')}
          </Link>
        </div>
      </Panel>
    </main>
  );
}
