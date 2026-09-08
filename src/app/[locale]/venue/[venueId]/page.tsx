import { use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getVenue, venues } from '@/lib/venues';
import { AvailabilityCalendar } from '@/components/AvailabilityCalendar';
import { VenueBookingPanel } from '@/components/VenueBookingPanel';
import { ShortlistButton } from '@/components/ShortlistButton';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    venues.map((venue) => ({ locale, venueId: venue.id })),
  );
}

const PACKAGES = [
  ['package_essential', 'package_hall_only', 'package_hall_only_copy', 85000],
  [
    'package_popular',
    'package_wedding_plus',
    'package_wedding_plus_copy',
    145000,
  ],
  ['package_premium', 'package_signature', 'package_signature_copy', 195000],
] as const;

export default function VenuePage({
  params,
}: {
  params: Promise<{ locale: string; venueId: string }>;
}) {
  const { locale, venueId } = use(params);
  setRequestLocale(locale);

  const venue = getVenue(venueId);
  if (!venue) notFound();

  const t = useTranslations('VenueDetail');
  const v = useTranslations('Venue');
  const format = useFormatter();

  return (
    <main className="mx-auto max-w-(--container-page) px-5 py-6">
      <nav className="text-xs text-soft">
        <Link href="/explore" className="hover:text-navy">
          {t('results')}
        </Link>
        {' / '}
        {v(`area_${venue.area}`)}
        {' / '}
        {venue.name}
      </nav>

      <div className="mt-4 grid gap-2 sm:grid-cols-[2fr_1fr]">
        <div className="relative aspect-16/9 overflow-hidden rounded-md">
          <Image
            src={venue.photo}
            alt={venue.name}
            fill
            priority
            sizes="(min-width: 640px) 66vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="grid gap-2">
          {venues
            .filter((other) => other.id !== venue.id)
            .slice(0, 2)
            .map((other) => (
              <div
                key={other.id}
                className="relative hidden aspect-16/9 overflow-hidden rounded-md sm:block"
              >
                <Image
                  src={other.photo}
                  alt=""
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            ))}
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-status-green-bg px-2.5 py-1 text-xs font-semibold text-status-green">
                  {v('verified')}
                </span>
                <span className="rounded-full bg-status-blue-bg px-2.5 py-1 text-xs font-semibold text-status-blue">
                  {t('match', { value: venue.match })}
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-bold text-navy">
                {venue.name}
              </h1>
              <p className="mt-1 text-sm text-muted">
                {v(`area_${venue.area}`)} ·{' '}
                {v('capacity', {
                  min: venue.capacityMin,
                  max: venue.capacityMax,
                })}{' '}
                · ★ {format.number(venue.rating, { minimumFractionDigits: 1 })}
              </p>
            </div>
            <ShortlistButton venueId={venue.id} />
          </div>

          <nav className="mt-5 flex flex-wrap gap-4 border-b border-line pb-3 text-sm font-medium text-muted">
            <a href="#availability" className="hover:text-navy">
              {t('nav_availability')}
            </a>
            <a href="#packages" className="hover:text-navy">
              {t('nav_packages')}
            </a>
            <a href="#facilities" className="hover:text-navy">
              {t('nav_facilities')}
            </a>
            <a href="#reviews" className="hover:text-navy">
              {t('nav_reviews')}
            </a>
          </nav>

          <section id="facilities" className="mt-7">
            <h2 className="text-lg font-bold text-navy">{t('about_heading')}</h2>
            <p className="mt-2 text-sm text-muted">{t('about_copy')}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {venue.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-md border border-line bg-paper px-3 py-2 text-sm font-medium text-navy"
                >
                  <span aria-hidden className="text-status-green">
                    ✓{' '}
                  </span>
                  {v(`feature_${feature}`)}
                </li>
              ))}
            </ul>
          </section>

          <section id="availability" className="mt-9">
            <h2 className="text-lg font-bold text-navy">
              {t('availability_heading')}
            </h2>
            <p className="mt-1 mb-4 text-sm text-muted">
              {t('availability_hint')}
            </p>
            <AvailabilityCalendar />
          </section>

          <section id="packages" className="mt-9">
            <h2 className="text-lg font-bold text-navy">
              {t('packages_heading')}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {PACKAGES.map(([badge, name, copy, price]) => (
                <article
                  key={name}
                  className="rounded-md border border-line bg-paper p-4 shadow-card"
                >
                  <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-muted">
                    {t(badge)}
                  </span>
                  <h3 className="mt-3 font-bold text-navy">{t(name)}</h3>
                  <strong className="mt-1 block text-navy">
                    {v('price', { value: format.number(price) })}
                  </strong>
                  <p className="mt-1 text-sm text-muted">{t(copy)}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="reviews" className="mt-9">
            <h2 className="text-lg font-bold text-navy">
              {t('reviews_heading')}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {(
                [
                  ['★★★★★ 5.0', 'review_one', 'review_one_by'],
                  ['★★★★☆ 4.8', 'review_two', 'review_two_by'],
                ] as const
              ).map(([stars, body, by]) => (
                <article
                  key={by}
                  className="rounded-md border border-line bg-paper p-4"
                >
                  <strong className="text-navy">{stars}</strong>
                  <p className="mt-2 text-sm text-ink">{t(body)}</p>
                  <span className="mt-2 block text-xs text-soft">{t(by)}</span>
                </article>
              ))}
            </div>
          </section>
        </div>

        <VenueBookingPanel venue={venue} />
      </div>
    </main>
  );
}
