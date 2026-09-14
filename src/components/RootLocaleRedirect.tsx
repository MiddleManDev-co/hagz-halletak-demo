'use client';

import { useEffect } from 'react';
import { routing } from '@/i18n/routing';

const STORAGE_KEY = 'matrah-locale';
const LEGACY_STORAGE_KEY = 'dawwar-locale';
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function preferredLocale(): string {
  try {
    const stored =
      window.localStorage.getItem(STORAGE_KEY) ??
      window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (stored && (routing.locales as readonly string[]).includes(stored)) {
      return stored;
    }
  } catch {
    // Private-mode browsers throw on storage access; fall through to the
    // navigator languages below.
  }

  const fromBrowser = window.navigator.languages.find((lang) =>
    (routing.locales as readonly string[]).includes(lang.split('-')[0] ?? ''),
  );

  return fromBrowser?.split('-')[0] ?? routing.defaultLocale;
}

export function RootLocaleRedirect() {
  useEffect(() => {
    const { search, hash } = window.location;
    window.location.replace(
      `${BASE_PATH}/${preferredLocale()}/${search}${hash}`,
    );
  }, []);

  return null;
}
