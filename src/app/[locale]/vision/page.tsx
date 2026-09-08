import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

/** Ported from `vision()` in app.js. */
export default function VisionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Vision');

  return (
    <main>
      <section className="bg-navy text-paper">
        <div className="mx-auto max-w-(--container-page) px-5 py-16">
          <span className="text-xs font-semibold tracking-wide uppercase opacity-75">
            {t('eyebrow')}
          </span>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-bold">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-3xl opacity-75">{t('lede')}</p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-(--container-page) px-5 py-14">
          <div className="text-xs font-semibold tracking-wide text-burgundy uppercase">
            {t('problem_product')}
          </div>
          <h2 className="mt-2 text-3xl font-bold text-navy">
            {t('same_problem')}
          </h2>

          <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-md border border-line bg-ivory p-5">
              <h3 className="font-bold text-navy">{t('today')}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {(['today_1', 'today_2', 'today_3', 'today_4'] as const).map(
                  (key) => (
                    <li
                      key={key}
                      className="rounded-md border border-line bg-paper px-3 py-2"
                    >
                      {t(key)}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div
              aria-hidden
              className="grid place-items-center text-2xl text-soft"
            >
              →
            </div>

            <div className="rounded-md border-2 border-burgundy bg-paper p-5">
              <h3 className="font-bold text-navy">{t('with_dawwar')}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {(['with_1', 'with_2', 'with_3', 'with_4'] as const).map(
                  (key) => (
                    <li
                      key={key}
                      className="rounded-md border border-line bg-ivory px-3 py-2"
                    >
                      {t(key)}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
