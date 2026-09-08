'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const FIELD =
  'w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-navy-3';
const LABEL = 'mb-1 block text-xs font-semibold text-muted';

/**
 * The request-to-book form. As in the legacy demo the fields are prefilled and
 * presentational — submitting advances the story to the venue's quote.
 */
export function RequestForm({ venueId }: { venueId: string }) {
  const t = useTranslations('Pilot');
  const router = useRouter();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/pilot/quote/${venueId}`);
      }}
      className="mt-5"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="request-date">
            {t('date')}
          </label>
          <input
            id="request-date"
            type="date"
            defaultValue="2027-10-15"
            className={FIELD}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="request-guests">
            {t('guests')}
          </label>
          <input
            id="request-guests"
            type="number"
            defaultValue={300}
            className={FIELD}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="request-package">
            {t('preferred_package')}
          </label>
          <select id="request-package" className={FIELD}>
            <option>{t('wedding_plus')}</option>
            <option>{t('hall_only')}</option>
            <option>{t('signature')}</option>
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="request-budget">
            {t('budget')}
          </label>
          <input
            id="request-budget"
            defaultValue="100–180K"
            className={FIELD}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="request-notes">
            {t('notes')}
          </label>
          <textarea
            id="request-notes"
            rows={4}
            defaultValue={t('please_confirm_final_price_and_whether_a')}
            className={FIELD}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-2"
      >
        {t('send_request_to_venue')}
      </button>
    </form>
  );
}
