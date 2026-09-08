import type { Metadata } from 'next';
import { RootLocaleRedirect } from '@/components/RootLocaleRedirect';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Dawwar',
  robots: { index: false, follow: false },
};

// Static export cannot negotiate a locale on the server, so `/` is a prerendered
// shell that forwards to the visitor's stored or preferred locale on the client.
export default function RootPage() {
  return (
    <html lang={routing.defaultLocale} dir="rtl">
      <body>
        <RootLocaleRedirect />
      </body>
    </html>
  );
}
