'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

/**
 * Keeps every link published before the Next.js migration working.
 *
 * The vanilla demo routed on the hash (`#/venue/royal-garden`) and carried the
 * guided tour in a query param (`?tour=full#/home`). Those URLs are in
 * DEMO-LINKS.md and in whatever anyone has already shared, so the App Router
 * build maps them onto real paths on first paint instead of breaking them.
 */

/** Legacy hash prefix -> App Router path, longest prefix wins. */
const ROUTE_MAP: Array<[string, string]> = [
  ['pilot/request', 'pilot/request'],
  ['pilot/quote', 'pilot/quote'],
  ['pilot/confirmed', 'pilot/confirmed'],
  ['pilot/commission', 'pilot/commission'],
  ['pilot/ops', 'pilot/ops'],
  ['venue-os', 'venue-os'],
  ['booking-details', 'booking-details'],
  ['my-wedding', 'my-wedding'],
  ['venue', 'venue'],
  ['admin', 'admin'],
  ['home', ''],
];

export function legacyHashToPath(hash: string): string | null {
  const raw = hash.replace(/^#\/?/, '').trim();
  if (raw === '') return null;

  const match = ROUTE_MAP.find(
    (entry) => raw === entry[0] || raw.startsWith(`${entry[0]}/`),
  );

  if (!match) return raw; // unmapped routes keep their slug 1:1
  const [prefix, replacement] = match;
  const rest = raw.slice(prefix.length).replace(/^\//, '');

  return [replacement, rest].filter(Boolean).join('/');
}

export function LegacyHashRedirect({ locale }: { locale: string }) {
  const router = useRouter();
  // `usePathname` excludes the basePath, which `router.replace` re-adds. Reading
  // `window.location.pathname` here instead would prefix it twice.
  const pathname = usePathname();

  useEffect(() => {
    const { hash, search } = window.location;
    if (!hash.startsWith('#/')) return;

    const target = legacyHashToPath(hash);
    if (target === null) return;

    const base = pathname.replace(/\/$/, '');
    const next = target ? `${base}/${target}/` : `${base}/`;

    router.replace(`${next}${search}`);
  }, [router, pathname, locale]);

  return null;
}
