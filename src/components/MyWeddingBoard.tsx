'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useDemoState } from '@/lib/demo-state';
import { getVenue } from '@/lib/venues';

/**
 * The shared family shortlist, ported from `myWedding()` in app.js. Client-side
 * because it reflects the visitor's own shortlist.
 */
export function MyWeddingBoard() {
  const t = useTranslations('Customer');
  const v = useTranslations('Venue');
  const format = useFormatter();
  const { shortlist } = useDemoState();

  const picked = shortlist.flatMap((id) => {
    const venue = getVenue(id);
    return venue ? [venue] : [];
  });

  if (picked.length === 0) {
    return (
      <div className="mt-8 rounded-md border border-dashed border-line bg-paper p-8 text-center">
        <strong className="block text-navy">{t('empty_shortlist')}</strong>
        <p className="mt-1 text-sm text-muted">{t('empty_shortlist_hint')}</p>
        <Link
          href="/explore"
          className="mt-4 inline-block rounded-md bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
        >
          {t('browse_venues')}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {picked.map((venue, index) => (
        <article
          key={venue.id}
          className="rounded-md border border-line bg-paper p-4 shadow-card"
        >
          <div className="flex items-start justify-between gap-3">
            <strong className="text-navy">{venue.name}</strong>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                index === 0
                  ? 'bg-status-green-bg text-status-green'
                  : 'bg-surface text-muted'
              }`}
            >
              {t('votes', { count: Math.max(8 - index * 2, 0) })}
            </span>
          </div>

          <p className="mt-1 text-xs text-muted">
            {v(`area_${venue.area}`)} ·{' '}
            {v('price', { value: format.number(venue.priceFrom) })}
          </p>

          <ul className="mt-3 flex gap-1.5 text-xs">
            {(
              [
                ['👍', Math.max(5 - index, 0)],
                ['🤔', 2 + index],
                ['👎', index],
              ] as const
            ).map(([glyph, count]) => (
              <li
                key={glyph}
                className="rounded-full bg-surface px-2.5 py-1 text-muted"
              >
                <span aria-hidden>{glyph}</span> {count}
              </li>
            ))}
          </ul>

          <p className="mt-3 text-sm text-ink">
            “{t(index === 0 ? 'note_first' : 'note_other')}”
          </p>
        </article>
      ))}
    </div>
  );
}
