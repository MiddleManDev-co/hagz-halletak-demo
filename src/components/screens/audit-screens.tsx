import { useTranslations } from 'next-intl';
import { DashHead } from '@/components/venue-os/views';
import { Stat } from '@/components/pilot-ui';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-line bg-paper p-4 shadow-card">
      {children}
    </div>
  );
}

function Tone({
  tone,
  children,
}: {
  tone: 'green' | 'orange' | 'red' | 'blue';
  children: React.ReactNode;
}) {
  const classes = {
    green: 'bg-status-green-bg text-status-green',
    orange: 'bg-status-orange-bg text-status-orange',
    red: 'bg-status-red-bg text-status-red',
    blue: 'bg-status-blue-bg text-status-blue',
  } as const;

  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${classes[tone]}`}
    >
      {children}
    </span>
  );
}

/** Ported from `notificationsPage()` in audit.js. */
export function NotificationsScreen() {
  const t = useTranslations('Audit');

  return (
    <>
      <DashHead
        title={t('notification_center')}
        subtitle={t('important_updates_at_the_right_time')}
      />
      <div className="mt-6 space-y-2">
        {(
          [
            ['booking_confirmed', 'green'],
            ['visit_friday', 'blue'],
            ['payment_question', 'orange'],
          ] as const
        ).map(([key, tone]) => (
          <div
            key={key}
            className="flex items-center justify-between gap-3 rounded-md border border-line bg-paper px-4 py-3"
          >
            <span className="text-sm text-navy">{t(key)}</span>
            <Tone tone={tone}>{t('notification_center')}</Tone>
          </div>
        ))}
      </div>
    </>
  );
}

/** Ported from `bookingDetails()` in audit.js. */
export function BookingDetailsScreen() {
  const t = useTranslations('Audit');
  const os = useTranslations('VenueOs');

  return (
    <>
      <DashHead title={t('booking_timeline')} subtitle={t('15_october_2027')} />
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Stat label={os('col_total')} value="148,000" />
        <Stat label={t('deposit')} value="30,000" />
        <Stat label={t('remaining')} value="118,000" />
      </div>
    </>
  );
}

/** Ported from `refundPage()` in audit.js. */
export function RefundScreen() {
  const t = useTranslations('Audit');

  return (
    <>
      <DashHead
        title={t('refund_cancellation')}
        subtitle={t('refund_request_under_review')}
        action={<Tone tone="orange">{t('in_review')}</Tone>}
      />
    </>
  );
}

/** Ported from `recoveryStates()` in audit.js. */
export function RecoveryStatesScreen() {
  const t = useTranslations('Audit');

  return (
    <>
      <DashHead
        title={t('failure_states')}
        subtitle={t('card_was_declined_but_the_hold_is')}
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {(
          [
            ['payment_failed', 'card_was_declined_but_the_hold_is', 'red'],
            ['hold_expired', 'card_was_declined_but_the_hold_is', 'orange'],
          ] as const
        ).map(([title, body, tone]) => (
          <Card key={title}>
            <div className="flex items-start justify-between gap-3">
              <strong className="text-navy">{t(title)}</strong>
              <Tone tone={tone}>{t(title)}</Tone>
            </div>
            <p className="mt-2 text-sm text-muted">{t(body)}</p>
          </Card>
        ))}
      </div>
    </>
  );
}

/** Ported from `packageBuilder()` in audit.js. */
export function PackageBuilderScreen() {
  const t = useTranslations('Audit');

  return (
    <>
      <DashHead
        title={t('package_builder')}
        subtitle={t('interactive_pricing')}
        action={<Tone tone="blue">{t('mock_pricing')}</Tone>}
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {(['buffet', 'floral_stage_tables', 'basic_included_8k'] as const).map(
          (key) => (
            <Card key={key}>
              <strong className="block text-navy">{t(key)}</strong>
              <p className="mt-1 text-sm text-muted">
                {t('standard_premium_dinner')}
              </p>
            </Card>
          ),
        )}
      </div>
    </>
  );
}

/** Ported from `mapPage()` in audit.js. */
export function MapScreen() {
  const t = useTranslations('Audit');

  return (
    <>
      <DashHead
        title={t('map_view')}
        subtitle={t('see_venues_around_the_selected_area')}
        action={<Tone tone="blue">{t('search_by_location')}</Tone>}
      />
      <div className="mt-6 grid place-items-center rounded-md border border-dashed border-line bg-surface py-20 text-sm text-muted">
        {t('map_directions_demo')}
      </div>
    </>
  );
}

/** Ported from `adminDisputes()` in audit.js. */
export function DisputesScreen() {
  const t = useTranslations('Audit');

  return <DashHead title={t('disputes_refunds_2')} subtitle={t('sla_94')} />;
}

/** Ported from `adminPayouts()` in audit.js. */
export function PayoutsScreen() {
  const t = useTranslations('Audit');

  return (
    <DashHead title={t('payouts_platform_fees')} subtitle={t('mock_pricing')} />
  );
}

/** Ported from `adminPromotions()` in audit.js. */
export function PromotionsScreen() {
  const t = useTranslations('Audit');

  return (
    <DashHead
      title={t('promotions_supply_activation')}
      subtitle={t('mock_pricing')}
    />
  );
}
