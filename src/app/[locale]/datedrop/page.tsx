import { use } from 'react';
import Image from 'next/image';
import { useFormatter, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { FutureVisionBanner } from '@/components/FutureVisionBanner';
import { DATE_DROPS } from '@/lib/future-data';
import { getVenueOrDefault } from '@/lib/venues';

/** Ported from `dateDropPage()` in extras.js. */
export default function DateDropPage({
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
              {t('drop_kicker')}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-navy">
              {t('drop_title')}
            </h1>
            <p className="mt-3 text-muted">{t('drop_lede')}</p>
          </div>
          <span className="rounded-full bg-status-orange-bg px-3 py-1 text-xs font-semibold text-status-orange">
            {t('drop_badge')}
          </span>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DATE_DROPS.map((deal) => (
            <article
              key={deal.venueId}
              className="overflow-hidden rounded-md border border-line bg-paper shadow-card"
            >
              <div className="relative aspect-16/10">
                <Image
                  src={getVenueOrDefault(deal.venueId).photo}
                  alt={deal.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute start-3 top-3 rounded-full bg-paper/95 px-2.5 py-1 text-xs font-semibold text-navy">
                  <span aria-hidden>🔥 </span>DateDrop
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/65 to-transparent p-3 text-xs text-white">
                  <span>
                    {deal.date}
                    <br />
                    <strong>{v(`area_${deal.area}`)}</strong>
                  </span>
                  <strong>{t('drop_left', { time: deal.left })}</strong>
                </div>
              </div>

              <div className="p-4">
                <div className="font-semibold text-navy">{deal.name}</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <del className="text-sm text-soft">
                    {v('price', { value: format.number(deal.was) })}
                  </del>
                  <strong className="text-xl text-status-green">
                    {v('price', { value: format.number(deal.now) })}
                  </strong>
                </div>
                <Link
                  href={`/venue/${deal.venueId}`}
                  className="mt-4 block rounded-md bg-navy px-3 py-2 text-center text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
                >
                  {v('details')}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
