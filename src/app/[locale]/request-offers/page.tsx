import { use } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { FutureVisionBanner } from '@/components/FutureVisionBanner';
import { REVERSE_OFFERS } from '@/lib/future-data';

const FIELD =
  'w-full rounded-md border border-line bg-ivory px-3 py-2 text-sm text-ink';
const LABEL = 'mb-1 block text-xs font-semibold text-muted';

/** Ported from `requestOffersPage()` in extras.js. */
export default function RequestOffersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Future');
  const v = useTranslations('Venue');
  const s = useTranslations('Search');
  const format = useFormatter();

  return (
    <>
      <FutureVisionBanner />
      <main className="mx-auto max-w-(--container-page) px-5 py-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold tracking-wide text-burgundy uppercase">
            {t('offers_kicker')}
          </div>
          <h1 className="mt-2 text-3xl font-bold text-navy">
            {t('offers_title')}
          </h1>
          <p className="mt-3 text-muted">{t('offers_lede')}</p>
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
          <section className="rounded-md border border-line bg-paper p-5 shadow-card">
            <h2 className="font-bold text-navy">{t('offers_brief')}</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {(
                [
                  [s('date'), '15 October 2027'],
                  [t('offers_place'), 'New Cairo'],
                  [s('guests'), '300'],
                  [s('budget'), '140,000'],
                ] as const
              ).map(([label, value]) => (
                <div key={label}>
                  <dt className={LABEL}>{label}</dt>
                  <dd className={FIELD}>{value}</dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className={LABEL}>{t('offers_needs')}</dt>
                <dd className={FIELD}>{t('offers_needs_value')}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="font-bold text-navy">{t('offers_received')}</h2>
            <ul className="mt-4 space-y-3">
              {REVERSE_OFFERS.map((offer) => (
                <li
                  key={offer.name}
                  className="rounded-md border border-line bg-paper p-4 shadow-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <strong className="block text-navy">{offer.name}</strong>
                      <span className="text-xs text-muted">{offer.extra}</span>
                    </div>
                    <strong className="shrink-0 text-navy">
                      {v('price', { value: format.number(offer.price) })}
                    </strong>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-surface px-2.5 py-1 text-muted">
                      {t('offers_replied_in', { time: offer.time })}
                    </span>
                    <span className="rounded-full bg-status-green-bg px-2.5 py-1 font-semibold text-status-green">
                      {t('offers_match', { score: offer.score })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
