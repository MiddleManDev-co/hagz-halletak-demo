'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { VENUE_AREAS } from '@/lib/venues';

const FIELD_CLASS =
  'w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-navy-3';
const LABEL_CLASS = 'mb-1 block text-xs font-semibold text-muted';

/**
 * The hero search form. As in the legacy demo the inputs are presentational —
 * submitting always lands on the results page.
 */
export function SearchPanel() {
  const t = useTranslations('Search');
  const venue = useTranslations('Venue');
  const router = useRouter();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push('/explore');
      }}
      className="overflow-hidden rounded-md border border-line border-t-4 border-t-burgundy bg-paper p-5 shadow-card-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-navy">{t('heading')}</h2>
          <p className="mt-1 text-xs text-muted">{t('note')}</p>
        </div>
        <span className="shrink-0 rounded-full bg-status-green-bg px-2.5 py-1 text-xs font-semibold text-status-green">
          {t('availability_first')}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className={LABEL_CLASS} htmlFor="search-date">
            {t('date')}
          </label>
          <input
            id="search-date"
            type="date"
            defaultValue="2027-10-15"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="search-area">
            {t('area')}
          </label>
          <select id="search-area" className={FIELD_CLASS} defaultValue="new-cairo">
            {VENUE_AREAS.map((area) => (
              <option key={area} value={area}>
                {venue(`area_${area}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="search-guests">
            {t('guests')}
          </label>
          <select id="search-guests" className={FIELD_CLASS} defaultValue="300">
            {[300, 200, 500].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="search-budget">
            {t('budget')}
          </label>
          <select id="search-budget" className={FIELD_CLASS}>
            <option>{t('budget_100_180')}</option>
            <option>{t('budget_80_120')}</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL_CLASS} htmlFor="search-event">
            {t('event_type')}
          </label>
          <select id="search-event" className={FIELD_CLASS}>
            <option>{t('event_wedding')}</option>
            <option>{t('event_engagement')}</option>
            <option>{t('event_katb_ketab')}</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
      >
        {t('submit')}
      </button>
    </form>
  );
}
