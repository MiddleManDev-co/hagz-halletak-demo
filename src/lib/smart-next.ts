import type { Persona } from './demo-state';

/**
 * The `Suggested next` hint, generated from `smartNext()` in navigator.js.
 *
 * Outside a guided tour this is what keeps the demo moving: from any screen it
 * names the single most useful next step and which persona it belongs to.
 */
export type SmartNext = {
  route: string;
  persona: Persona;
  /** Key inside the `Navigator` namespace. */
  key: string;
};

const NEXT_BY_ROUTE: Record<string, SmartNext> = {
  'home': { route: 'explore', persona: 'customer', key: 'see_venues' },
  'explore': { route: 'venue/royal-garden', persona: 'customer', key: 'open_a_venue' },
  'venue/royal-garden': { route: 'pilot/request/royal-garden', persona: 'customer', key: 'send_request' },
  'pilot/request/royal-garden': { route: 'pilot/quote/royal-garden', persona: 'customer', key: 'see_venue_reply' },
  'pilot/quote/royal-garden': { route: 'pilot/confirmed', persona: 'customer', key: 'confirm_booking' },
  'pilot/confirmed': { route: 'venue-os/visits', persona: 'venue', key: 'see_venue_visit_view' },
  'venue-os/overview': { route: 'venue-os/calendar', persona: 'venue', key: 'see_dates' },
  'venue-os/calendar': { route: 'venue-os/leads', persona: 'venue', key: 'see_requests' },
  'venue-os/leads': { route: 'venue-os/visits', persona: 'venue', key: 'see_visits' },
  'venue-os/visits': { route: 'venue-os/bookings', persona: 'venue', key: 'see_bookings' },
  'venue-os/bookings': { route: 'pilot/commission', persona: 'venue', key: 'see_dawwar_fee' },
  'pilot/commission': { route: 'pilot/ops', persona: 'admin', key: 'see_admin_side' },
  'pilot/ops': { route: 'admin/verification', persona: 'admin', key: 'check_a_venue' },
  'admin/verification': { route: 'admin/bookings', persona: 'admin', key: 'see_bookings' },
  'admin/bookings': { route: 'admin/support', persona: 'admin', key: 'see_support' },
  'admin/support': { route: 'vision', persona: 'investor', key: 'see_what_comes_later' },
  'vision': { route: 'investor', persona: 'investor', key: 'see_business_story' },
};

/** `route` is locale-free, e.g. "venue-os/leads". */
export function smartNext(route: string): SmartNext | null {
  return NEXT_BY_ROUTE[route.replace(/^\/|\/$/g, '')] ?? null;
}
