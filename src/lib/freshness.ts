/**
 * Availability freshness, ported from `freshLine()` in dawwar-pilot.js.
 *
 * Freshness is the product's core trust claim — how recently a venue confirmed
 * its dates — so the staleness threshold lives here rather than being inlined
 * at a render site.
 */
export type Freshness =
  | { tone: 'fresh'; key: 'fresh_yesterday' }
  | { tone: 'fresh'; key: 'fresh_days'; days: number }
  | { tone: 'stale'; key: 'fresh_stale'; days: number };

/** A venue quiet for longer than this needs confirming before it is trusted. */
export const STALE_AFTER_DAYS = 6;

export function freshness(days: number): Freshness {
  if (days <= 1) return { tone: 'fresh', key: 'fresh_yesterday' };
  if (days <= STALE_AFTER_DAYS)
    return { tone: 'fresh', key: 'fresh_days', days };
  return { tone: 'stale', key: 'fresh_stale', days };
}
