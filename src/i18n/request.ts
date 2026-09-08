import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // Pinned so a build machine's timezone cannot change rendered dates; the
    // demo's story is set in Cairo.
    timeZone: 'Africa/Cairo',
    messages: (await import(`../../messages/${locale}.json`)).default,
    // next-intl's default is to log a missing message and render the raw key,
    // which would let a typo ship as visible UI text. A missing key is a broken
    // screen, so make it fail the export instead.
    onError(error) {
      throw error;
    },
  };
});
