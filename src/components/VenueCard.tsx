'use client';

import Image from 'next/image';
import { useFormatter, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useDemoState } from '@/lib/demo-state';
import { AVAILABILITY_TONE, type Venue } from '@/lib/venues';
import { freshness } from '@/lib/freshness';

const TONE_CLASS = {
  green: 'bg-status-green-bg text-status-green',
  orange: 'bg-status-orange-bg text-status-orange',
  blue: 'bg-status-blue-bg text-status-blue',
  red: 'bg-status-red-bg text-status-red',
} as const;

export function VenueCard({ venue }: { venue: Venue }) {
  const t = useTranslations('Venue');
  const format = useFormatter();
  const { shortlist, toggleShortlist } = useDemoState();

  const shortlisted = shortlist.includes(venue.id);
  const tone = TONE_CLASS[AVAILABILITY_TONE[venue.availability]];
  const fresh = freshness(venue.updatedDaysAgo);

  return (
    <article className="overflow-hidden rounded-md border border-line bg-paper shadow-card transition-shadow hover:shadow-card-lg">
      <div className="relative aspect-16/10">
        <Image
          src={venue.photo}
          alt={venue.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {venue.verified && (
          <span className="absolute start-3 top-3 rounded-full bg-paper/95 px-2.5 py-1 text-xs font-semibold text-navy">
            {t('verified')}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/65 to-transparent p-3 text-xs text-white">
          <span>
            {t('next_date')}
            <br />
            <strong className="text-sm">
              {format.dateTime(new Date(venue.nextDate), {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </strong>
          </span>
          <span className="font-semibold">{t('match', { value: venue.match })}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-semibold text-navy">{venue.name}</div>
            <div className="text-sm text-muted">
              {t(`area_${venue.area}`)} ·{' '}
              {t('capacity', {
                min: venue.capacityMin,
                max: venue.capacityMax,
              })}
            </div>
          </div>
          <strong className="shrink-0 text-sm text-navy">
            ★ {format.number(venue.rating, { minimumFractionDigits: 1 })}
          </strong>
        </div>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {venue.features.map((feature) => (
            <li
              key={feature}
              className="rounded-full bg-surface px-2.5 py-1 text-xs text-muted"
            >
              {t(`feature_${feature}`)}
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}
          >
            {t(`availability_${venue.availability}`)}
          </span>
          <span
            className={`text-xs ${fresh.tone === 'stale' ? 'font-semibold text-status-orange' : 'text-soft'}`}
          >
            <span aria-hidden>◷ </span>
            {fresh.key === 'fresh_yesterday'
              ? t(fresh.key)
              : t(fresh.key, { days: fresh.days })}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <small className="block text-xs text-soft">{t('starts_from')}</small>
            <strong className="text-navy">
              {t('price', { value: format.number(venue.priceFrom) })}
            </strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleShortlist(venue.id)}
              aria-pressed={shortlisted}
              aria-label={t(shortlisted ? 'remove_shortlist' : 'add_shortlist')}
              className="rounded-md border border-line px-2.5 py-1.5 text-sm transition-colors hover:bg-surface aria-pressed:border-burgundy aria-pressed:text-burgundy"
            >
              <span aria-hidden>{shortlisted ? '♥' : '♡'}</span>
            </button>
            <Link
              href={`/venue/${venue.id}`}
              className="rounded-md bg-surface px-3 py-1.5 text-sm font-semibold text-navy transition-colors hover:bg-line"
            >
              {t('details')}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
