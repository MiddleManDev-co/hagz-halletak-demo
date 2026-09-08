import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { CompareTable } from '@/components/CompareTable';

export default function ComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Compare');

  return (
    <main className="mx-auto max-w-(--container-page) px-5 py-8">
      <nav className="text-xs text-soft">{t('breadcrumb')}</nav>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wide text-burgundy uppercase">
            {t('kicker')}
          </div>
          <h1 className="mt-2 text-3xl font-bold text-navy">{t('title')}</h1>
          <p className="mt-2 text-muted">{t('lede')}</p>
        </div>
        <Link
          href="/my-wedding"
          className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
        >
          {t('family_shortlist')}
        </Link>
      </div>

      <CompareTable />

      <div className="mt-6 rounded-md border border-line bg-status-blue-bg p-4">
        <strong className="text-navy">
          <span aria-hidden>💡 </span>
          {t('smart_suggestion')}
        </strong>
        <p className="mt-1 text-sm text-muted">{t('suggestion_copy')}</p>
      </div>
    </main>
  );
}
