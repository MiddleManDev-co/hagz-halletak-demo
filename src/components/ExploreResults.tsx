'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useDemoState } from '@/lib/demo-state';
import { venues } from '@/lib/venues';
import { VenueCard } from './VenueCard';

type Filter = 'all' | 'available' | 'verified' | 'under-150k';

const FILTERS: Array<{ id: Filter; labelKey: string }> = [
  { id: 'all', labelKey: 'filter_all' },
  { id: 'available', labelKey: 'filter_available' },
  { id: 'verified', labelKey: 'filter_verified' },
  { id: 'under-150k', labelKey: 'filter_under_150k' },
];

const PREDICATES: Record<Filter, (venue: (typeof venues)[number]) => boolean> = {
  all: () => true,
  available: (venue) => venue.availability === 'available',
  verified: (venue) => venue.verified,
  'under-150k': (venue) => venue.priceFrom < 150000,
};

export function ExploreResults() {
  const t = useTranslations('Explore');
  const { shortlist } = useDemoState();
  const [filter, setFilter] = useState<Filter>('all');

  // The legacy "peak date" toggle narrowed results to the busiest date; it is
  // additive to the active filter rather than a filter of its own.
  const [peakOnly, setPeakOnly] = useState(false);

  const results = useMemo(
    () =>
      venues
        .filter(PREDICATES[filter])
        .filter((venue) => !peakOnly || venue.nextDate === '2027-10-15'),
    [filter, peakOnly],
  );

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">
            {t('heading', { count: results.length })}
          </h1>
          <p className="mt-1 text-sm text-muted">{t('subtitle')}</p>
        </div>
        <Link
          href="/compare"
          className="rounded-md border border-line bg-paper px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-surface"
        >
          {t('compare', { count: shortlist.length })}
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setFilter(entry.id)}
            aria-pressed={filter === entry.id}
            className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-paper"
          >
            {t(entry.labelKey)}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPeakOnly((value) => !value)}
          aria-pressed={peakOnly}
          className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-paper"
        >
          {t('filter_peak')}
        </button>
      </div>

      {results.length === 0 ? (
        <div className="mt-8 rounded-md border border-dashed border-line bg-paper p-8 text-center">
          <strong className="block text-navy">{t('no_results')}</strong>
          <p className="mt-1 text-sm text-muted">{t('no_results_hint')}</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {results.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </>
  );
}
