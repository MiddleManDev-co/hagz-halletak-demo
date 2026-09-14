import { useFormatter, useTranslations } from 'next-intl';
import { Stat } from '@/components/pilot-ui';
import { DashHead } from '@/components/venue-os/views';
import { venues } from '@/lib/venues';

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
  tone: 'green' | 'orange' | 'red' | 'blue' | 'gray';
  children: React.ReactNode;
}) {
  const classes = {
    green: 'bg-status-green-bg text-status-green',
    orange: 'bg-status-orange-bg text-status-orange',
    red: 'bg-status-red-bg text-status-red',
    blue: 'bg-status-blue-bg text-status-blue',
    gray: 'bg-surface text-muted',
  } as const;

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${classes[tone]}`}
    >
      {children}
    </span>
  );
}

/** Verification queue, ported from `adminVerification()` in audit.js. */
export function AdminVerification() {
  const t = useTranslations('Audit');

  const queue = [
    ['Skyline Hall', 'New Cairo', 'new'],
    ['Olive Garden', 'Sheikh Zayed', 'missing_info'],
    ['Maison 22', 'Heliopolis', 'pricing_review'],
  ] as const;

  const checks = ['identity_ownership', 'location_address'] as const;

  return (
    <>
      <DashHead
        title={t('verification_queue')}
        subtitle={t('venues_enter_the_marketplace_after_identity_location')}
        action={<Badge tone="orange">{t('7_pending')}</Badge>}
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-[280px_1fr]">
        <ul className="space-y-2">
          {queue.map(([name, area, stateKey], index) => (
            <li key={name}>
              <div
                aria-current={index === 0 ? 'true' : undefined}
                className="rounded-md border border-line bg-paper px-3 py-2 aria-[current]:border-navy aria-[current]:bg-surface"
              >
                <strong className="block text-sm text-navy">{name}</strong>
                <span className="text-xs text-muted">
                  {area} · {t(stateKey)}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <Card>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-bold text-navy">Skyline Hall</h2>
              <span className="text-xs text-soft">New Cairo</span>
            </div>
            <Badge tone="orange">{t('in_review')}</Badge>
          </div>

          <ul className="mt-4 space-y-2">
            {checks.map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm">
                <span aria-hidden className="text-status-green">
                  ✓
                </span>
                {t(key)}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

/** Support board, ported from `adminSupport()` in audit.js. */
export function AdminSupport() {
  const t = useTranslations('Audit');

  const tickets = [
    [
      '#SUP-884',
      'payment',
      'customer_sees_the_deposit_twice_on_the',
      'MTR-2031',
      'medium',
      'orange',
    ],
    [
      '#SUP-881',
      'availability',
      'venue_says_the_18th_is_available_while',
      'Royal Garden',
      'high',
      'red',
    ],
    [
      '#SUP-876',
      'visit',
      'customer_needs_to_reschedule_a_venue_visit',
      'Royal Garden',
      'medium',
      'orange',
    ],
  ] as const;

  return (
    <>
      <DashHead
        title={t('support_operations')}
        subtitle={t('support_is_not_a_detached_inbox_every')}
        action={<Badge tone="green">{t('sla_94')}</Badge>}
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tickets.map(([ref, kind, body, link, priority, tone]) => (
          <Card key={ref}>
            <strong className="text-navy">
              {ref} · {t(kind)}
            </strong>
            <p className="mt-2 text-sm text-muted">{t(body)}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="gray">{link}</Badge>
              <Badge tone={tone}>{t(priority)}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

/** Venue operations table, ported from `adminVenues()` in app.js. */
export function AdminVenues() {
  const t = useTranslations('Admin');
  const v = useTranslations('Venue');

  const quality: Record<string, string> = {
    'royal-garden': '82/100',
    'luma-hall': '91/100',
    'nile-palace': '76/100',
    'garden-37': '80/100',
    'palm-palace': '64/100',
    'lake-house': '88/100',
  };

  return (
    <>
      <DashHead title={t('venues_title')} subtitle={t('venues_sub')} />

      <div className="mt-6 overflow-x-auto rounded-md border border-line bg-paper">
        <table className="w-full min-w-2xl text-start text-sm">
          <thead className="bg-surface text-xs text-muted">
            <tr>
              {(
                [
                  'col_venue',
                  'col_area',
                  'col_state',
                  'col_match',
                  'col_quality',
                ] as const
              ).map((key) => (
                <th key={key} className="px-3 py-2 text-start font-semibold">
                  {t(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {venues.map((venue) => (
              <tr key={venue.id} className="border-t border-line">
                <td className="px-3 py-2 font-semibold text-navy">
                  {venue.name}
                </td>
                <td className="px-3 py-2">{v(`area_${venue.area}`)}</td>
                <td className="px-3 py-2">
                  <Badge tone="green">{t('state_verified')}</Badge>
                </td>
                <td className="px-3 py-2">{venue.match}/100</td>
                <td className="px-3 py-2">{quality[venue.id]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const ADMIN_BOOKINGS = [
  ['MTR-2031', 'Royal Garden', 'Mahmoud & Salma', 148000, 'confirmed'],
  ['MTR-2028', 'Luma Hall', 'Mona & Ali', 128000, 'confirmed'],
  ['MTR-2021', 'Nile Palace', 'Sara & Mostafa', 160000, 'confirmed'],
] as const;

/** Booking attribution table, ported from `adminBookings()` in app.js. */
export function AdminBookings() {
  const t = useTranslations('Admin');
  const os = useTranslations('VenueOs');
  const format = useFormatter();

  return (
    <>
      <DashHead title={t('bookings_title')} subtitle={t('bookings_sub')} />

      <div className="mt-6 overflow-x-auto rounded-md border border-line bg-paper">
        <table className="w-full min-w-2xl text-start text-sm">
          <thead className="bg-surface text-xs text-muted">
            <tr>
              {[
                t('col_venue'),
                os('col_customer'),
                os('col_total'),
                t('col_source'),
                os('col_status'),
              ].map((label) => (
                <th key={label} className="px-3 py-2 text-start font-semibold">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ADMIN_BOOKINGS.map(([ref, venue, customer, total]) => (
              <tr key={ref} className="border-t border-line">
                <td className="px-3 py-2 font-semibold text-navy">{venue}</td>
                <td className="px-3 py-2">{customer}</td>
                <td className="px-3 py-2">{format.number(total)}</td>
                <td className="px-3 py-2">{t('source_dawwar')}</td>
                <td className="px-3 py-2">
                  <Badge tone="green">{os('status_confirmed')}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/** Platform overview, ported from `adminOverview()` in app.js. */
export function AdminOverview() {
  const t = useTranslations('Admin');

  return (
    <>
      <DashHead title={t('overview_title')} subtitle={t('overview_sub')} />

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label={t('stat_venues')} value="24" />
        <Stat label={t('stat_bookings')} value="63" />
        <Stat label={t('stat_gmv')} value="8.4M" />
        <Stat label={t('stat_commission')} value="—" />
      </div>
    </>
  );
}

/** Ported from `platformEconomics()` in business-intelligence.js. */
export function AdminEconomics() {
  const t = useTranslations('Economics');

  return (
    <>
      <div className="text-xs font-semibold tracking-wide text-burgundy uppercase">
        {t('kicker')}
      </div>
      <DashHead
        title={t('title')}
        subtitle={t('lede')}
        action={<Badge tone="blue">{t('mock_badge')}</Badge>}
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label={t('gmv')} value="42.0M" />
        <Stat label={t('revenue')} value="2.31M" />
        <Stat label={t('contribution')} value="1.48M" />
        <Stat label={t('mrr')} value="772.8K" />
      </div>

      <p className="mt-3 text-xs text-soft">
        {t('gmv_note')} · {t('revenue_note')} · {t('mrr_note')}
      </p>
    </>
  );
}

const AREAS = [
  ['New Cairo', '13.4M', 52, 'level_high', 'level_low'],
  ['Sheikh Zayed', '9.2M', 38, 'level_high', 'level_medium'],
  ['Maadi', '4.8M', 29, 'level_medium', 'level_high'],
  ['Nasr City', '3.6M', 21, 'level_medium', 'level_medium'],
] as const;

/** Ported from `marketplaceHealth()` in business-intelligence.js. */
export function AdminMarketplaceHealth() {
  const t = useTranslations('Economics');

  return (
    <>
      <div className="text-xs font-semibold tracking-wide text-burgundy uppercase">
        {t('health_kicker')}
      </div>
      <DashHead
        title={t('health_title')}
        subtitle={t('health_lede')}
        action={<Badge tone="green">{t('health_badge')}</Badge>}
      />

      <div className="mt-6 overflow-x-auto rounded-md border border-line bg-paper">
        <table className="w-full min-w-2xl text-start text-sm">
          <thead className="bg-surface text-xs text-muted">
            <tr>
              {[
                t('col_area'),
                t('col_gmv'),
                t('col_venues'),
                t('col_demand'),
                t('col_supply'),
              ].map((label) => (
                <th key={label} className="px-3 py-2 text-start font-semibold">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AREAS.map(([area, gmv, count, demand, supply]) => (
              <tr key={area} className="border-t border-line">
                <td className="px-3 py-2 font-semibold text-navy">{area}</td>
                <td className="px-3 py-2">{gmv}</td>
                <td className="px-3 py-2">{count}</td>
                <td className="px-3 py-2">{t(demand)}</td>
                <td className="px-3 py-2">{t(supply)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
