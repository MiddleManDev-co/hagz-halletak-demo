import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * Marks a screen as product direction rather than pilot scope, ported from
 * `addFutureBanner()` in dawwar-pilot.js.
 */
export function FutureVisionBanner() {
  const t = useTranslations('Pilot');

  return (
    <div className="border-b border-status-orange-bg bg-status-orange-bg">
      <div className="mx-auto flex max-w-(--container-page) flex-wrap items-center justify-between gap-3 px-5 py-2.5 text-sm">
        <span className="text-status-orange">
          <strong>{t('future_vision')}</strong> ·{' '}
          {t('this_screen_demonstrates_product_direction_it_is')}
        </span>
        <Link
          href="/"
          className="shrink-0 rounded-md border border-status-orange bg-paper px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-surface"
        >
          {t('back_to_pilot')}
        </Link>
      </div>
    </div>
  );
}
