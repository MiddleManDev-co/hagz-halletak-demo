import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { FutureVisionBanner } from '@/components/FutureVisionBanner';
import { StrategySimulator } from '@/components/StrategySimulator';

export default function StrategySimulatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Bi');

  return (
    <>
      <FutureVisionBanner />
    <main className="mx-auto max-w-(--container-page) px-5 py-8">
      <div className="text-xs font-semibold tracking-wide text-burgundy uppercase">
        {t('scenario_planning')}
      </div>
      <h1 className="mt-2 text-3xl font-bold text-navy">
        {t('strategy_simulator')}
      </h1>
      <StrategySimulator />
    </main>
    </>
  );
}
