import type { Persona } from './demo-state';

/**
 * Persona-scoped navigation, ported from persona-ui.js.
 *
 * The legacy build made this a deliberate design point: each perspective sees
 * only its own routes, because five different scripts used to append to the
 * sidebar and options appeared and disappeared while navigating. Keeping one
 * table here preserves that "single owner" property.
 */
export type NavItem = {
  href: string;
  /** Decorative glyph; the label carries the accessible name. */
  icon: string;
  /** Key inside the `PersonaUi` message namespace. */
  labelKey: string;
};

export const PERSONA_NAV: Record<Persona, NavItem[]> = {
  customer: [
    { href: '/', icon: '⌂', labelKey: 'home' },
    { href: '/explore', icon: '⌕', labelKey: 'venues' },
    { href: '/my-wedding', icon: '♥', labelKey: 'my_picks' },
    { href: '/visits', icon: '◷', labelKey: 'visits' },
    { href: '/messages', icon: '✉', labelKey: 'messages' },
    { href: '/account', icon: '◎', labelKey: 'account' },
  ],
  venue: [
    { href: '/venue-os', icon: '⌂', labelKey: 'today' },
    { href: '/venue-os/calendar', icon: '▦', labelKey: 'dates' },
    { href: '/venue-os/leads', icon: '◎', labelKey: 'requests' },
    { href: '/venue-os/visits', icon: '◷', labelKey: 'visits_2' },
    { href: '/venue-os/bookings', icon: '✓', labelKey: 'bookings' },
    { href: '/venue-os/team', icon: '♙', labelKey: 'team' },
  ],
  admin: [
    { href: '/pilot/ops', icon: '⌂', labelKey: 'operations' },
    { href: '/admin/verification', icon: '✓', labelKey: 'venue_checks' },
    { href: '/admin/venues', icon: '▦', labelKey: 'venues' },
    { href: '/admin/bookings', icon: '◎', labelKey: 'bookings' },
    { href: '/admin/support', icon: '✉', labelKey: 'support' },
    { href: '/admin/economics', icon: '₤', labelKey: 'platform_economics' },
    {
      href: '/admin/marketplace-health',
      icon: '◎',
      labelKey: 'market_health',
    },
  ],
  investor: [
    { href: '/investor', icon: '📈', labelKey: 'story' },
    { href: '/vision', icon: '✦', labelKey: 'vision' },
    { href: '/strategy-simulator', icon: '↗', labelKey: 'growth_scenarios' },
  ],
};

/** Where a persona's story starts — the brand link target for that role. */
export const PERSONA_HOME: Record<Persona, string> = {
  customer: '/',
  venue: '/venue-os',
  admin: '/pilot/ops',
  investor: '/investor',
};

export const PERSONA_ICON: Record<Persona, string> = {
  customer: '💍',
  venue: '🏛',
  admin: '🛡',
  investor: '📈',
};

/** The four items each persona gets in the mobile bottom bar. */
export const PERSONA_MOBILE_NAV: Record<Persona, string[]> = {
  customer: ['/', '/explore', '/my-wedding', '/visits'],
  venue: [
    '/venue-os',
    '/venue-os/calendar',
    '/venue-os/leads',
    '/venue-os/visits',
  ],
  admin: [
    '/pilot/ops',
    '/admin/verification',
    '/admin/bookings',
    '/admin/support',
  ],
  investor: ['/investor', '/vision', '/strategy-simulator'],
};

/** Personas whose screens render inside the dashboard sidebar shell. */
export const DASHBOARD_PERSONAS = ['venue', 'admin'] as const;

/** `PersonaUi` key for the sidebar title of a dashboard persona. */
export const SIDEBAR_TITLE_KEY: Record<
  (typeof DASHBOARD_PERSONAS)[number],
  string
> = {
  venue: 'royal_garden',
  admin: 'platform_admin',
};

/** `PersonaUi` key for the demo ribbon line shown to each persona. */
export const RIBBON_KEY: Record<Persona, string> = {
  customer: 'find_a_venue_compare_send_a_request',
  venue: 'see_dates_customer_requests_visits_and_bookings',
  admin: 'review_venues_dates_bookings_and_fees_in',
  investor: 'see_the_problem_the_business_model_and',
};

export function navItemsFor(persona: Persona): NavItem[] {
  return PERSONA_NAV[persona];
}

export function mobileNavItemsFor(persona: Persona): NavItem[] {
  const byHref = new Map(PERSONA_NAV[persona].map((item) => [item.href, item]));
  return PERSONA_MOBILE_NAV[persona].flatMap((href) => {
    const item = byHref.get(href);
    return item ? [item] : [];
  });
}
