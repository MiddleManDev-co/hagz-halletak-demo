import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { FutureVisionBanner } from '@/components/FutureVisionBanner';

/** Ported from `success()` in app.js; Future Vision, like the checkout it ends. */
export default function SuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Checkout');

  return (
    <>
      <FutureVisionBanner />
      <main className="mx-auto max-w-2xl px-5 py-12 text-center">
        <div
          aria-hidden
          className="mx-auto grid size-14 place-items-center rounded-full bg-status-green-bg text-2xl text-status-green"
        >
          ✓
        </div>
        <h1 className="mt-4 text-3xl font-bold text-navy">
          {t('success_title')}
        </h1>
        <p className="mt-3 text-muted">{t('success_lede')}</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
        >
          {t('success_next')}
        </Link>
      </main>
    </>
  );
}
