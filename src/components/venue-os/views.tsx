import { useFormatter, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Stat } from '@/components/pilot-ui';

/** Heading block shared by every dashboard view (`.dash-head` in app.js). */
export function DashHead({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-navy">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-line bg-paper p-4 shadow-card">
      {children}
    </div>
  );
}

export function VenueOverview() {
  const t = useTranslations('VenueOs');

  return (
    <>
      <DashHead title={t('greeting')} subtitle={t('greeting_sub')} />

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label={t('stat_bookings')} value="18" />
        <Stat label={t('stat_revenue')} value="1.80M" />
        <Stat label={t('stat_open_leads')} value="42" />
        <Stat label={t('stat_occupancy')} value="72%" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between gap-3">
            <strong className="text-navy">{t('calendar_health')}</strong>
            <span className="rounded-full bg-status-green-bg px-2.5 py-1 text-xs font-semibold text-status-green">
              82 / 100
            </span>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>⚠ {t('health_dates')}</li>
            <li>◷ {t('health_holds')}</li>
            <li>◎ {t('health_leads')}</li>
          </ul>
          <Link
            href="/venue-os/calendar"
            className="mt-4 inline-block rounded-md bg-surface px-3.5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-line"
          >
            {t('fix_calendar')}
          </Link>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-3">
            <strong className="text-navy">{t('latest_activity')}</strong>
            <span className="rounded-full bg-status-green-bg px-2.5 py-1 text-xs font-semibold text-status-green">
              {t('live')}
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {(
              [
                ['activity_visit', 'activity_visit_meta'],
                ['activity_lead', 'activity_lead_meta'],
              ] as const
            ).map(([title, meta]) => (
              <li
                key={title}
                className="rounded-md border border-line bg-ivory px-3 py-2"
              >
                <strong className="block text-sm text-navy">{t(title)}</strong>
                <span className="text-xs text-soft">{t(meta)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

/** October 2027, matching the legacy 35-cell grid and its index arithmetic. */
export function VenueCalendar() {
  const t = useTranslations('VenueOs');
  const v = useTranslations('Venue');

  return (
    <>
      <DashHead title={t('calendar_title')} subtitle={t('calendar_sub')} />

      <Card>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <strong className="text-navy">{t('october_2027')}</strong>
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            <span className="rounded-full bg-status-green-bg px-2.5 py-1 text-status-green">
              {v('availability_available')}
            </span>
            <span className="rounded-full bg-status-orange-bg px-2.5 py-1 text-status-orange">
              {v('availability_hold')}
            </span>
            <span className="rounded-full bg-status-red-bg px-2.5 py-1 text-status-red">
              {v('availability_booked')}
            </span>
            <span className="rounded-full bg-status-blue-bg px-2.5 py-1 text-status-blue">
              {t('legend_visit')}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }, (_, index) => {
            const day = index + 1;
            const inMonth = day <= 31;
            const pill = !inMonth
              ? null
              : day % 6 === 0
                ? 'bg-status-red-bg text-status-red'
                : day % 5 === 0
                  ? 'bg-status-orange-bg text-status-orange'
                  : day % 7 === 0
                    ? 'bg-status-blue-bg text-status-blue'
                    : null;

            return (
              <div
                key={day}
                className="min-h-16 rounded-md border border-line bg-paper p-1.5"
              >
                <div className="text-xs text-soft">{inMonth ? day : ''}</div>
                {pill && (
                  <div className={`mt-1 rounded px-1 py-0.5 text-[10px] ${pill}`}>
                    ●
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-4 rounded-md border border-line bg-status-blue-bg p-4">
        <strong className="text-navy">{t('conflict_prevention')}</strong>
        <p className="mt-1 text-sm text-muted">{t('conflict_copy')}</p>
      </div>
    </>
  );
}

const PIPELINE = [
  { stage: 'stage_new', leads: ['Omar & Mariam', 'Nour & Ahmed'] },
  { stage: 'stage_contacted', leads: ['Sara & Mostafa'] },
  { stage: 'stage_visit', leads: ['Mona & Ali', 'Hana & Youssef'] },
  { stage: 'stage_offer', leads: ['Yara & Adam'] },
  { stage: 'stage_won', leads: ['Mahmoud & Salma'] },
] as const;

export function VenueLeads() {
  const t = useTranslations('VenueOs');

  return (
    <>
      <DashHead title={t('leads_title')} subtitle={t('leads_sub')} />

      <div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-5">
        {PIPELINE.map((column) => {
          const won = column.stage === 'stage_won';
          return (
            <div key={column.stage} className="rounded-md bg-surface p-2">
              <div className="flex items-center justify-between px-1 pb-2 text-xs font-semibold text-muted">
                <span>{t(column.stage)}</span>
                <span>{column.leads.length}</span>
              </div>
              <ul className="space-y-2">
                {column.leads.map((lead, leadIndex) => (
                  <li
                    key={lead}
                    className="rounded-md border border-line bg-paper p-3"
                  >
                    <strong className="block text-sm text-navy">{lead}</strong>
                    <p className="mt-0.5 text-xs text-muted">
                      {t('lead_meta', {
                        guests: won ? 300 : 350,
                        budget: won ? '145K' : '160K',
                      })}
                    </p>
                    <div className="mt-2 flex justify-between text-[11px] text-soft">
                      <span>
                        {['New Cairo', 'Maadi', 'Zayed'][leadIndex % 3]}
                      </span>
                      <span>{won ? t('lead_won') : t('lead_ago')}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

const BOOKINGS = [
  ['DWR-2031', 'Mahmoud & Salma', '15 Oct', 145000, 30000, 'confirmed'],
  ['DWR-2028', 'Mona & Ali', '09 Oct', 128000, 40000, 'confirmed'],
  ['DWR-2021', 'Sara & Mostafa', '02 Oct', 160000, 50000, 'confirmed'],
  ['DWR-2017', 'Omar & Mariam', '28 Sep', 135000, null, 'hold'],
] as const;

export function VenueBookings() {
  const t = useTranslations('VenueOs');
  const format = useFormatter();

  return (
    <>
      <DashHead title={t('bookings_title')} subtitle={t('bookings_sub')} />

      <div className="mt-6 overflow-x-auto rounded-md border border-line bg-paper">
        <table className="w-full min-w-2xl text-start text-sm">
          <thead className="bg-surface text-xs text-muted">
            <tr>
              {(
                [
                  'col_booking',
                  'col_customer',
                  'col_date',
                  'col_total',
                  'col_paid',
                  'col_status',
                ] as const
              ).map((key) => (
                <th key={key} className="px-3 py-2 text-start font-semibold">
                  {t(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map(([ref, customer, date, total, paid, status]) => (
              <tr key={ref} className="border-t border-line">
                <td className="px-3 py-2 font-semibold text-navy">{ref}</td>
                <td className="px-3 py-2">{customer}</td>
                <td className="px-3 py-2">{date}</td>
                <td className="px-3 py-2">{format.number(total)}</td>
                <td className="px-3 py-2">
                  {paid === null ? '—' : format.number(paid)}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      status === 'hold'
                        ? 'bg-status-orange-bg text-status-orange'
                        : 'bg-status-green-bg text-status-green'
                    }`}
                  >
                    {t(status === 'hold' ? 'status_hold' : 'status_confirmed')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const VISITS = [
  ['3:30 PM', 'Mahmoud & Salma', '300 · Wedding', 'arrived', 'green'],
  ['5:00 PM', 'Mona & Ali', '250 · Engagement', 'confirmed', 'blue'],
] as const;

export function VenueVisits() {
  const t = useTranslations('Audit');

  return (
    <>
      <DashHead
        title={t('visit_schedule')}
        subtitle={t('every_marketplace_visit_appears_here_with_customer')}
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label={t('today')} value="5" />
        <Stat label={t('this_week')} value="18" />
        <Stat label={t('converted')} value="31%" />
        <Stat label={t('no-show_rate')} value="8%" />
      </div>

      <div className="mt-5 overflow-x-auto rounded-md border border-line bg-paper">
        <table className="w-full min-w-xl text-start text-sm">
          <thead className="bg-surface text-xs text-muted">
            <tr>
              {(['time', 'customer', 'event', 'status'] as const).map((key) => (
                <th key={key} className="px-3 py-2 text-start font-semibold">
                  {t(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VISITS.map(([time, customer, event, status, tone]) => (
              <tr key={time} className="border-t border-line">
                <td className="px-3 py-2">{time}</td>
                <td className="px-3 py-2 font-semibold text-navy">{customer}</td>
                <td className="px-3 py-2">{event}</td>
                <td className="px-3 py-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      tone === 'green'
                        ? 'bg-status-green-bg text-status-green'
                        : 'bg-status-blue-bg text-status-blue'
                    }`}
                  >
                    {t(status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const HALLS = [
  ['Royal Garden Main', '250_450_guests'],
  ['Royal Garden Terrace', '120_220_guests'],
] as const;

const TEAM = [
  ['Mariam Hassan', 'sales_manager_full_booking_access', 'Manager'],
  ['Ahmed Samir', 'reception_visits_quick_booking', 'Reception'],
] as const;

export function VenueTeam() {
  const t = useTranslations('Audit');

  return (
    <>
      <DashHead
        title={t('halls_team')}
        subtitle={t('manage_multiple_halls_staff_permissions_and_availability')}
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-bold text-navy">{t('halls')}</h2>
          <ul className="mt-3 space-y-2">
            {HALLS.map(([name, capacityKey]) => (
              <li
                key={name}
                className="flex items-center justify-between gap-3 rounded-md border border-line bg-ivory px-3 py-2"
              >
                <span>
                  <strong className="block text-sm text-navy">{name}</strong>
                  <span className="text-xs text-muted">{t(capacityKey)}</span>
                </span>
                <span className="shrink-0 rounded-full bg-status-green-bg px-2.5 py-1 text-xs font-semibold text-status-green">
                  {t('synced')}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-bold text-navy">{t('team_permissions')}</h2>
          <ul className="mt-3 space-y-2">
            {TEAM.map(([name, roleKey, badge]) => (
              <li
                key={name}
                className="flex items-center gap-3 rounded-md border border-line bg-ivory px-3 py-2"
              >
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-paper"
                >
                  {name[0]}
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-sm text-navy">{name}</strong>
                  <span className="text-xs text-muted">{t(roleKey)}</span>
                </span>
                <span className="shrink-0 rounded-full bg-status-blue-bg px-2.5 py-1 text-xs font-semibold text-status-blue">
                  {badge}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
