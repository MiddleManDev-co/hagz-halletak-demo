'use client';

import { useTranslations } from 'next-intl';
import { useDemoState } from '@/lib/demo-state';

export function ShortlistButton({ venueId }: { venueId: string }) {
  const t = useTranslations('Venue');
  const { shortlist, toggleShortlist } = useDemoState();
  const shortlisted = shortlist.includes(venueId);

  return (
    <button
      type="button"
      onClick={() => toggleShortlist(venueId)}
      aria-pressed={shortlisted}
      className="shrink-0 rounded-md border border-line bg-paper px-3.5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-surface aria-pressed:border-burgundy aria-pressed:text-burgundy"
    >
      <span aria-hidden>{shortlisted ? '♥ ' : '♡ '}</span>
      {t(shortlisted ? 'remove_shortlist' : 'add_shortlist')}
    </button>
  );
}
