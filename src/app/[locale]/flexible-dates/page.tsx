import { use } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { FutureVisionBanner } from '@/components/FutureVisionBanner';
import { FLEXIBLE_DATES } from '@/lib/future-data';

const TONE = {
  green: 'bg-status-green-bg text-status-green',
  orange: 'bg-status-orange-bg text-status-orange',
  blue: 'bg-status-blue-bg text-status-blue',
} as const;

/** Ported from `flexibleDatesPage()` in extras.js. */
export default function FlexibleDatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Future');
  const v = useTranslations('Venue');
  const format = useFormatter();

  return (
    <>
      <FutureVisionBanner />
      <main className="mx-auto max-w-(--container-page) px-5 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-wide text-burgundy uppercase">
              {t('flex_kicker')}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-navy">
              {t('flex_title')}
            </h1>
            <p className="mt-3 text-muted">{t('flex_lede')}</p>
          </div>
          <Link
            href="/explore"
            className="rounded-md border border-line bg-paper px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-surface"
          >
            {t('flex_back')}
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FLEXIBLE_DATES.map((entry) => (
            <article
              key={entry.day}
              className="rounded-md border border-line bg-paper p-4 shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs text-soft">2027</span>
                  <h2 className="text-xl font-bold text-navy">{entry.day}</h2>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${TONE[entry.tone]}`}
                >
                  {'count' in entry
                    ? t('avail_venues', { count: entry.count })
                    : t(entry.availability)}
                </span>
              </div>

              <div className="mt-3 text-2xl font-bold text-navy">
                {v('price', { value: format.number(entry.price) })}
              </div>

              <p
                className={`mt-1 text-xs ${entry.saving ? 'text-status-green' : 'text-status-red'}`}
              >
                {entry.saving
                  ? t('flex_saving', {
                      amount: v('price', { value: format.number(entry.saving) }),
                    })
                  : t('flex_peak')}
              </p>

              <Link
                href="/explore"
                className="mt-4 block rounded-md bg-surface px-3 py-2 text-center text-sm font-semibold text-navy transition-colors hover:bg-line"
              >
                {t('flex_see_venues')}
              </Link>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
