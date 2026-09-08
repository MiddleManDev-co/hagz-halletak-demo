'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  moneyShort,
  platformScenario,
  VENUE_RANGE,
} from '@/lib/scenario';

/** Ported from `strategySimulator()` in business-intelligence.js. */
export function StrategySimulator() {
  const t = useTranslations('Bi');
  const e = useTranslations('Economics');
  const [venues, setVenues] = useState(184);
  const scenario = platformScenario(venues);

  return (
    <>
      <p className="mt-3 max-w-3xl text-muted">
        {t('combine_finance_operations_and_marketplace_assumptions_into')}
      </p>

      <div className="mt-6 rounded-md border border-line bg-paper p-5 shadow-card">
        <label
          htmlFor="venue-count"
          className="mb-2 block text-sm font-semibold text-navy"
        >
          {e('col_venues')}: {venues}
        </label>
        <input
          id="venue-count"
          type="range"
          min={VENUE_RANGE.min}
          max={VENUE_RANGE.max}
          step={VENUE_RANGE.step}
          value={venues}
          onChange={(event) => setVenues(Number(event.target.value))}
          className="w-full accent-navy"
        />

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [t('bookings'), String(scenario.bookings)],
            [e('gmv'), moneyShort(scenario.gmv)],
            [e('revenue'), moneyShort(scenario.commission)],
            [e('mrr'), moneyShort(scenario.mrr)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-line bg-ivory p-4">
              <small className="block text-xs text-muted">{label}</small>
              <strong className="mt-1 block text-2xl text-navy">{value}</strong>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-soft">
          {t('scenario_result')} · {scenario.coverage.toFixed(1)}%
        </p>
      </div>
    </>
  );
}
