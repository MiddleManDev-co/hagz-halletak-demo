import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ExploreResults } from '@/components/ExploreResults';

export default function ExplorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Explore');

  return (
    <main className="mx-auto max-w-(--container-page) px-5 py-8">
      <nav aria-label={t('breadcrumb')} className="text-xs text-soft">
        {t('breadcrumb')}
      </nav>
      <div className="mt-4">
        <ExploreResults />
      </div>
    </main>
  );
}
