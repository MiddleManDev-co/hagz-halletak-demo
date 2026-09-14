import { useTranslations } from 'next-intl';
import { DashHead } from '@/components/venue-os/views';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-line bg-paper p-4 shadow-card">
      {children}
    </div>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: 'green' | 'orange' | 'blue';
  children: React.ReactNode;
}) {
  const classes = {
    green: 'bg-status-green-bg text-status-green',
    orange: 'bg-status-orange-bg text-status-orange',
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

/** Ported from `visitsPage()` in audit.js. */
export function CustomerVisits() {
  const t = useTranslations('Audit');
  const v = useTranslations('Venue');

  const visits = [
    ['Royal Garden', 'thursday_october_14', '5:00 PM', 'confirmed', 'green'],
    ['Luma Hall', 'friday_3_30_pm', '', 'pick_a_slot', 'orange'],
  ] as const;

  return (
    <>
      <DashHead
        title={t('from_discovery_to_a_confirmed_visit_without')}
        subtitle={t('the_customer_picks_a_clear_slot_and')}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {visits.map(([name, dayKey, time, statusKey, tone]) => (
          <Card key={name}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <strong className="block text-navy">{name}</strong>
                <span className="text-xs text-muted">
                  {v('area_new-cairo')}
                </span>
              </div>
              <Badge tone={tone}>{t(statusKey)}</Badge>
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-3 rounded-md bg-ivory px-3 py-2">
              <strong className="text-sm text-navy">{t(dayKey)}</strong>
              <span className="text-sm text-muted">{time}</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

/** Ported from `messagesPage()` in audit.js. */
export function CustomerMessages() {
  const t = useTranslations('Audit');

  const threads = [
    ['Royal Garden', 'MTR-2031 · ', 'confirmed'],
    ['Luma Hall', '', 'visit_friday'],
    ['Support', '', 'payment_question'],
  ] as const;

  return (
    <>
      <DashHead
        title={t('messages_stay_attached_to_the_booking_not')}
        subtitle={t('structured_messaging')}
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-[280px_1fr]">
        <ul className="space-y-2">
          {threads.map(([name, prefix, statusKey], index) => (
            <li key={name}>
              <div
                aria-current={index === 0 ? 'true' : undefined}
                className="rounded-md border border-line bg-paper px-3 py-2 aria-[current]:border-navy aria-[current]:bg-surface"
              >
                <strong className="block text-sm text-navy">{name}</strong>
                <span className="text-xs text-muted">
                  {prefix}
                  {t(statusKey)}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <Card>
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <strong className="text-navy">Royal Garden</strong>
            <span className="text-xs text-soft">
              {t('usually_replies_within_18_minutes')}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted">
            {t('demo-only_conversation_no_real_message_is_sent')}
          </p>
        </Card>
      </div>
    </>
  );
}

/** Ported from `customerAccount()` in audit.js. */
export function CustomerAccount() {
  const t = useTranslations('Audit');

  return (
    <>
      <DashHead
        title={t('everything_about_the_event_in_one_place')}
        subtitle={t('bookings_visits_payments_messages_and_alerts_without')}
        action={
          <span className="shrink-0 rounded-full bg-status-blue-bg px-2.5 py-1 text-xs font-semibold text-status-blue">
            {t('connected_demo_data')}
          </span>
        }
      />
    </>
  );
}
