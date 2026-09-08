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

/** Ported from `businessCenter()` in business-intelligence.js. */
export function BusinessCenterScreen() {
  const t = useTranslations('Bi');
  const e = useTranslations('Economics');

  return (
    <>
      <DashHead
        title={t('business_center')}
        subtitle={t('demo_figures_only_not_audited_statements_or')}
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label={e('gmv')} value="1.85M" />
        <Stat label={e('revenue')} value="610K" />
        <Stat label={e('contribution')} value="165K" />
        <Stat label={t('bookings')} value="18" />
      </div>
      <p className="mt-3 text-sm text-status-green">
        {t('break-even_exceeded_by_4_bookings')}
      </p>
    </>
  );
}

/** Ported from `revenueIntelligence()` in business-intelligence.js. */
export function RevenueIntelligenceScreen() {
  const t = useTranslations('Bi');

  return (
    <>
      <DashHead
        title={t('revenue_intelligence')}
        subtitle={t('analyze_profitability_by_package_and_day_then')}
      />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <strong className="block text-navy">
            {t('not_every_expensive_package_is_profitable_and')}
          </strong>
          <p className="mt-2 text-sm text-muted">
            {t('signature_has_the_highest_price_but_a')}
          </p>
        </Card>
        <Card>
          <strong className="block text-navy">
            {t('not_all_lost_revenue_is_recoverable')}
          </strong>
          <p className="mt-2 text-sm text-muted">
            {t('next_see_what_actually_makes_money')}
          </p>
        </Card>
      </div>
    </>
  );
}

/** Ported from `actionCenter()` in business-intelligence.js. */
export function ActionCenterScreen() {
  const t = useTranslations('Bi');

  return (
    <>
      <DashHead
        title={t('action_center')}
        subtitle={t('next_see_what_actually_makes_money')}
      />
    </>
  );
}

/** Ported from `managerPage()` in venue-360.js. */
export function TourManagerScreen() {
  const t = useTranslations('Venue360');

  return (
    <>
      <DashHead
        title={t('virtual_tour')}
        subtitle={t('manage_scenes_hotspots_publishing_and_tour_quality')}
      />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <strong className="block text-navy">{t('tour')}</strong>
          <p className="mt-2 text-sm text-muted">
            {t('reorder_scenes_review_quality_and_manage_hotspots')}
          </p>
        </Card>
        <Card>
          <strong className="block text-navy">
            {t('explore_every_direction_switch_scenes_and_open')}
          </strong>
          <p className="mt-2 text-sm text-muted">
            {t('after_the_virtual_tour_schedule_a_physical')}
          </p>
        </Card>
      </div>
    </>
  );
}

/** Ported from the content-quality view in venue-360.js. */
export function ContentQualityScreen() {
  const t = useTranslations('Venue360');

  return (
    <>
      <DashHead
        title={t('content_quality_360_coverage')}
        subtitle={t('adding_parking_completes_the_coverage_checklist_and')}
      />
    </>
  );
}

/** Ported from `quickBooking()` in polish.js. */
export function QuickBookingScreen() {
  const t = useTranslations('Polish');

  return (
    <>
      <DashHead
        title={t('quick_booking_under_30_seconds')}
        subtitle={t('royal_garden_main_no_active_holds')}
      />
      <p className="mt-4 rounded-md border border-line bg-status-orange-bg p-4 text-sm text-status-orange">
        {t('october_15_is_already_booked_another_booking')}
      </p>
    </>
  );
}

/** Ported from `reviewsPage()` in polish.js. */
export function ReviewsScreen() {
  const t = useTranslations('Polish');

  return (
    <>
      <DashHead
        title={t('review_moderation')}
        subtitle={t('keep_reviews_useful_and_trustworthy_without_suppressing')}
      />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {(
          [
            'great_organization_and_the_final_price_matched',
            'the_package_changed_after_the_deposit_and',
          ] as const
        ).map((key) => (
          <li key={key}>
            <Card>
              <p className="text-sm text-ink">“{t(key)}”</p>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
