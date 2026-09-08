import { use } from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { DashboardShell } from '@/components/DashboardShell';
import { FutureVisionBanner } from '@/components/FutureVisionBanner';
import { isFutureVision } from '@/lib/future-routes';
import {
  AdminBookings,
  AdminEconomics,
  AdminMarketplaceHealth,
  AdminOverview,
  AdminSupport,
  AdminVenues,
  AdminVerification,
} from '@/components/admin/views';
import {
  DisputesScreen,
  PayoutsScreen,
  PromotionsScreen,
} from '@/components/screens/audit-screens';
import {
  ContentQualityScreen,
  ReviewsScreen,
} from '@/components/screens/vision-screens';

const TABS = {
  overview: AdminOverview,
  verification: AdminVerification,
  venues: AdminVenues,
  bookings: AdminBookings,
  support: AdminSupport,
  economics: AdminEconomics,
  'marketplace-health': AdminMarketplaceHealth,
  disputes: DisputesScreen,
  payouts: PayoutsScreen,
  promotions: PromotionsScreen,
  reviews: ReviewsScreen,
  'content-quality': ContentQualityScreen,
} as const;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => [
    { locale, tab: [] as string[] },
    ...Object.keys(TABS).map((tab) => ({ locale, tab: [tab] })),
  ]);
}

export default function AdminPage({
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
      {isFutureVision(`admin/${key}`) && <FutureVisionBanner />}
      <DashboardShell locale={locale} persona="admin">
        <View />
      </DashboardShell>
    </>
  );
}
