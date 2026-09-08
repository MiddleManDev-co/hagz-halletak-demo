import { defineRouting } from 'next-intl/routing';

// Static export cannot negotiate a locale on the server (no proxy/middleware
// runs), so the prefix is always present and detection happens client-side at
// the root redirect.
export const routing = defineRouting({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always',
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeDirection: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  en: 'ltr',
};
