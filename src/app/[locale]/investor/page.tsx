import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { FutureVisionBanner } from '@/components/FutureVisionBanner';
import { Link } from '@/i18n/navigation';

/** Ported from `investorPage()` in audit.js. */
export default function InvestorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Investor');

  return (
    <>
      <FutureVisionBanner />
    <main className="mx-auto max-w-(--container-page) px-5 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <div className="text-xs font-semibold tracking-wide text-burgundy uppercase">
            {t('kicker')}
          </div>
          <h1 className="mt-3 text-3xl leading-tight font-bold text-navy">
            {t('headline')}
          </h1>
          <p className="mt-4 text-muted">{t('lede')}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/explore"
              className="rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
            >
              {t('start_customer')}
            </Link>
            <Link
              href="/venue-os"
              className="rounded-md border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-line"
            >
              {t('open_venueos')}
            </Link>
          </div>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2">
          {(
            ['fly_demand', 'fly_supply', 'fly_bookings', 'fly_data'] as const
          ).map((key, index) => (
            <li
              key={key}
              className="rounded-md border border-line bg-paper p-4 text-center shadow-card"
            >
              <span
                aria-hidden
                className="mx-auto grid size-7 place-items-center rounded-full bg-navy text-xs font-bold text-paper"
              >
                {index + 1}
              </span>
              <strong className="mt-2 block text-sm text-navy">{t(key)}</strong>
            </li>
          ))}
        </ol>
      </div>
    </main>
    </>
  );
}
