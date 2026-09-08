import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { IBM_Plex_Sans_Arabic, Source_Sans_3 } from 'next/font/google';
import { localeDirection, routing } from '@/i18n/routing';
import { pickClientMessages } from '@/i18n/client-namespaces';
import { LegacyHashRedirect } from '@/components/LegacyHashRedirect';
import { Topbar } from '@/components/Topbar';
import { DemoRibbon } from '@/components/DemoRibbon';
import { MobileNav } from '@/components/MobileNav';
import { DemoNavigator } from '@/components/DemoNavigator';
import '../globals.css';

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  const brand = await getTranslations({ locale, namespace: 'Brand' });

  return {
    title: brand('name') + ' | ' + t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  // Ship only the namespaces client components read; the rest is resolved
  // during the export and never reaches the browser.
  const clientMessages = pickClientMessages(await getMessages());
  const t = await getTranslations({ locale, namespace: 'Common' });

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      data-scroll-behavior="smooth"
      className={plexArabic.variable + ' ' + sourceSans.variable}
    >
      <body className="flex min-h-dvh flex-col bg-ivory text-ink antialiased">
        <NextIntlClientProvider messages={clientMessages}>
          <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
            >
              {t('skipToContent')}
            </a>
            <LegacyHashRedirect locale={locale} />
            <Topbar locale={locale} />
            <DemoRibbon />
            <div id="main" className="flex-1">
              {children}
            </div>
            <DemoNavigator locale={locale} />
            <MobileNav locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
