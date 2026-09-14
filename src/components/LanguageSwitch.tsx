'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';

const STORAGE_KEY = 'matrah-locale';

/**
 * Swaps the locale segment in place, preserving the rest of the path so the
 * visitor stays on the screen they were reading. The choice is remembered for
 * the root redirect, replacing the legacy `hh-lang` preference.
 */
export function LanguageSwitch({ locale }: { locale: string }) {
  const t = useTranslations('Language');
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Remembering the choice is optional; navigating is not.
    }

    const segments = pathname.split('/');
    const localeIndex = segments.findIndex((segment) =>
      (routing.locales as readonly string[]).includes(segment),
    );
    if (localeIndex === -1) {
      router.push(`/${next}/`);
      return;
    }

    segments[localeIndex] = next;
    router.push(segments.join('/') || `/${next}/`);
  };

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="flex items-center gap-0.5 rounded-full bg-surface p-1"
    >
      {routing.locales.map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          onClick={() => switchTo(option)}
          aria-pressed={locale === option}
          className="rounded-full px-2.5 py-1 text-xs font-semibold text-muted transition-colors hover:text-navy aria-pressed:bg-navy aria-pressed:text-paper"
        >
          {t(option)}
        </button>
      ))}
    </div>
  );
}
