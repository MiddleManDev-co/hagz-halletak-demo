'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { DEMO_STORAGE_KEYS, useDemoState } from '@/lib/demo-state';
import { TOUR_STORAGE_KEYS, useTourState } from '@/lib/tour-state';

/**
 * Clears simulated state while keeping the selected language, matching
 * `resetDemo()` in navigator.js — a presenter needs this between runs.
 */
export function ResetDemo() {
  const t = useTranslations('Navigator');
  const { reset } = useDemoState();
  const { stop } = useTourState();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        stop();
        reset();
        try {
          for (const key of [
            ...Object.values(DEMO_STORAGE_KEYS),
            ...Object.values(TOUR_STORAGE_KEYS),
          ]) {
            window.localStorage.removeItem(key);
          }
        } catch {
          // Nothing to clear when storage is unavailable.
        }
        router.push('/');
      }}
      className="rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:bg-surface"
    >
      {t('reset')}
    </button>
  );
}
