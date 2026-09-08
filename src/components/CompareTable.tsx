'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useDemoState } from '@/lib/demo-state';
import { getVenueOrDefault, venues, type Venue } from '@/lib/venues';

/**
 * Side-by-side comparison, ported from `compare()` in app.js — including its
 * behaviour of topping the selection up to three venues when the shortlist is
 * shorter.
 */
export function CompareTable() {
  const t = useTranslations('Compare');
  const v = useTranslations('Venue');
  const format = useFormatter();
  const { shortlist } = useDemoState();

  const selected: Venue[] = shortlist.slice(0, 3).map(getVenueOrDefault);
  while (selected.length < 3) {
    const fallback = venues[selected.length];
    if (!fallback) break;
    selected.push(fallback);
  }

  const rows: Array<[string, (venue: Venue) => string]> = [
    [t('row_price'), (x) => v('price', { value: format.number(x.priceFrom) })],
    [t('row_availability'), (x) => v(`availability_${x.availability}`)],
    [
      t('row_capacity'),
      (x) => v('capacity', { min: x.capacityMin, max: x.capacityMax }),
    ],
    [
      t('row_rating'),
      (x) => `★ ${format.number(x.rating, { minimumFractionDigits: 1 })}`,
    ],
    [v('feature_outdoor'), (x) => (x.features.includes('outdoor') ? '✓' : '—')],
    [v('feature_parking'), (x) => (x.features.includes('parking') ? '✓' : '—')],
    [t('row_match'), (x) => `${x.match}%`],
  ];

  return (
    <div className="mt-6 overflow-x-auto rounded-md border border-line bg-paper">
      <table className="w-full min-w-2xl text-start text-sm">
        <thead className="bg-surface">
          <tr>
            <th className="px-3 py-3 text-start text-xs font-semibold text-muted">
              {t('kicker')}
            </th>
            {selected.map((venue) => (
              <th key={venue.id} className="px-3 py-3 text-start">
                <strong className="block text-navy">{venue.name}</strong>
                <span className="text-xs font-normal text-muted">
                  {v(`area_${venue.area}`)}
                </span>
                <Link
                  href={`/venue/${venue.id}`}
                  className="mt-2 inline-block rounded-md bg-paper px-2.5 py-1 text-xs font-semibold text-navy"
                >
                  {v('details')}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, cell]) => (
            <tr key={label} className="border-t border-line">
              <th className="px-3 py-2 text-start text-xs font-semibold text-muted">
                {label}
              </th>
              {selected.map((venue) => {
                const value = cell(venue);
                return (
                  <td
                    key={venue.id}
                    className={`px-3 py-2 ${value === '✓' ? 'font-semibold text-status-green' : ''}`}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
