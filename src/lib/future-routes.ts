/**
 * Screens that exist to show product direction but are explicitly NOT pilot
 * launch requirements, ported from `futureRoute()` in dawwar-pilot.js.
 *
 * Keeping the list in one place matters: the README frames the pilot's scope
 * discipline as a product decision, and the banner is how a viewer can tell
 * which screens are in scope from which are aspiration.
 */
const FUTURE_PREFIXES = [
  'booking',
  'success',
  'refund',
  'package-builder',
  'flexible-dates',
  'datedrop',
  'request-offers',
  'states',
  'venue-os/datedrop',
  'venue-os/analytics',
  'venue-os/business-center',
  'venue-os/revenue-intelligence',
  'venue-os/action-center',
  'venue-os/360-manager',
  'admin/disputes',
  'admin/payouts',
  'admin/analytics',
  'admin/economics',
  'admin/marketplace-health',
  'admin/content-quality',
  'strategy-simulator',
  'investor',
];

/** `route` is locale-free, e.g. "venue-os/analytics". */
export function isFutureVision(route: string): boolean {
  const normalized = route.replace(/^\/|\/$/g, '');
  return FUTURE_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  );
}
