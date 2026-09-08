/**
 * Platform what-if model, ported verbatim from `platformScenario()` in
 * business-intelligence.js.
 *
 * The sub-linear exponents are deliberate: adding venues grows bookings and GMV
 * less than proportionally, while coverage improves logarithmically and
 * saturates. All outputs are illustrative demo figures, not forecasts.
 */
const BASELINE_VENUES = 184;
const BASELINE_BOOKINGS = 613;
const BASELINE_GMV = 42_000_000;
const TAKE_RATE = 0.055;
const MRR_PER_VENUE = 4_200;

export const VENUE_RANGE = { min: 60, max: 400, step: 4 } as const;
export const FRIDAY_PRICE_RANGE = {
  min: 130_000,
  max: 175_000,
  step: 5_000,
} as const;

function clamp(min: number, max: number, value: number): number {
  return Math.min(max, Math.max(min, value));
}

export type Scenario = {
  bookings: number;
  gmv: number;
  commission: number;
  mrr: number;
  coverage: number;
};

export function platformScenario(venues: number): Scenario {
  const ratio = venues / BASELINE_VENUES;
  const gmv = BASELINE_GMV * Math.pow(ratio, 0.9);

  return {
    bookings: Math.round(BASELINE_BOOKINGS * Math.pow(ratio, 0.92)),
    gmv,
    commission: gmv * TAKE_RATE,
    mrr: venues * MRR_PER_VENUE,
    coverage: clamp(81, 96, 81 + Math.log2(ratio) * 5.5),
  };
}

/** Compact money label, matching the legacy `moneyShort()` output. */
export function moneyShort(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`;
  return String(Math.round(value));
}
