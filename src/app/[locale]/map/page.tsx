import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { MapScreen } from '@/components/screens/audit-screens';

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-(--container-page) px-5 py-8">
      <MapScreen />
    </main>
  );
}
