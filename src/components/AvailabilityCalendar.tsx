'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * October 2027 availability grid, ported from `venueDetails()` in app.js.
 *
 * The legacy build derived each day's state from its index (`d % 6`, `d % 5`),
 * so the same arithmetic is kept here to preserve the demo's familiar shape.
 */
function dayState(day: number): 'available' | 'booked' | 'hold' {
  if (day % 6 === 0) return 'booked';
  if (day % 5 === 0) return 'hold';
  return 'available';
}

const STATE_CLASS = {
  available: 'border-line bg-paper text-navy hover:border-navy-3',
  hold: 'border-status-orange-bg bg-status-orange-bg text-status-orange',
  booked: 'border-status-red-bg bg-status-red-bg text-status-red line-through',
} as const;

const HIGHLIGHTED_DAY = 15;

export function AvailabilityCalendar() {
  const t = useTranslations('Venue');
  const [selected, setSelected] = useState(HIGHLIGHTED_DAY);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {(['available', 'hold', 'booked'] as const).map((state) => (
          <span
            key={state}
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${STATE_CLASS[state]}`}
          >
            {t(
              state === 'hold'
                ? 'availability_hold'
                : state === 'booked'
                  ? 'availability_booked'
                  : 'availability_available',
            )}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {Array.from({ length: 28 }, (_, index) => {
          const day = index + 1;
          const state = dayState(day);
          const isSelected = day === selected;
          const disabled = state === 'booked';

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              onClick={() => setSelected(day)}
              className={`rounded-md border py-2 text-center text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-paper ${STATE_CLASS[state]}`}
            >
              <strong className="block leading-none">{day}</strong>
              {day === HIGHLIGHTED_DAY && (
                <small className="text-[10px] opacity-80">145K</small>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
