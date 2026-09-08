import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { RefundScreen } from '@/components/screens/audit-screens';
import { FutureVisionBanner } from '@/components/FutureVisionBanner';

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <FutureVisionBanner />
      <main className="mx-auto max-w-(--container-page) px-5 py-8">
        <RefundScreen />
      </main>
    </>
  );
}
