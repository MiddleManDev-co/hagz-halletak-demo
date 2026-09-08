import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { MyWeddingBoard } from '@/components/MyWeddingBoard';

export default function MyWeddingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Customer');

  return (
    <main className="mx-auto max-w-(--container-page) px-5 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-wide text-burgundy uppercase">
            {t('shared_planning')}
          </div>
          <h1 className="mt-2 text-3xl font-bold text-navy">
            {t('wedding_title')}
          </h1>
          <p className="mt-2 max-w-2xl text-muted">{t('wedding_sub')}</p>
        </div>
        <span className="rounded-full bg-status-green-bg px-3 py-1 text-xs font-semibold text-status-green">
          {t('members_online')}
        </span>
      </div>

      <MyWeddingBoard />
    </main>
  );
}
