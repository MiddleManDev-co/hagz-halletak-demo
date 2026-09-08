import { use } from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { DashboardShell } from '@/components/DashboardShell';
import {
  VenueBookings,
  VenueCalendar,
  VenueLeads,
  VenueOverview,
  VenueTeam,
  VenueVisits,
} from '@/components/venue-os/views';
import {
  ActionCenterScreen,
  BusinessCenterScreen,
  QuickBookingScreen,
  RevenueIntelligenceScreen,
  TourManagerScreen,
} from '@/components/screens/vision-screens';
import { FutureVisionBanner } from '@/components/FutureVisionBanner';
import { isFutureVision } from '@/lib/future-routes';

/** Tabs reachable from the venue persona's sidebar. */
const TABS = {
  overview: VenueOverview,
  calendar: VenueCalendar,
  leads: VenueLeads,
  visits: VenueVisits,
  bookings: VenueBookings,
  team: VenueTeam,
  'business-center': BusinessCenterScreen,
  'revenue-intelligence': RevenueIntelligenceScreen,
  'action-center': ActionCenterScreen,
  '360-manager': TourManagerScreen,
  'quick-booking': QuickBookingScreen,
} as const;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => [
    // `/venue-os` itself resolves to the overview, as in the legacy default.
    { locale, tab: [] as string[] },
    ...Object.keys(TABS).map((tab) => ({ locale, tab: [tab] })),
  ]);
}

export default function VenueOsPage({
  params,
}: {
  params: Promise<{ locale: string; tab?: string[] }>;
}) {
  const { locale, tab } = use(params);
  setRequestLocale(locale);

  const key = (tab?.[0] ?? 'overview') as keyof typeof TABS;
  const View = TABS[key];
  if (!View) notFound();

  return (
    <>
      {isFutureVision(`venue-os/${key}`) && <FutureVisionBanner />}
      <DashboardShell locale={locale} persona="venue">
        <View />
      </DashboardShell>
    </>
  );
}
