import type messages from '../../messages/ar.json';

type Namespace = keyof typeof messages;

/**
 * Only these namespaces are serialized into the RSC payload for client
 * components. Everything else is resolved on the server during the export and
 * never shipped.
 *
 * The full catalog is ~1,250 keys / 88KB; inlining all of it would put that on
 * every one of the ~45 prerendered pages. Add a namespace here only when a
 * component that needs it is actually `'use client'`.
 */
export const CLIENT_NAMESPACES = [
  'Brand',
  'Nav',
  'Persona',
  'Language',
  'DemoRibbon',
  'DemoGuide',
  'Common',
  // VenueCard / SearchPanel are interactive, so their copy must reach the client.
  'Venue',
  'Search',
  'Explore',
  'Customer',
  'Bi',
  'Future',
  'Compare',
  'Navigator',
  'NavigatorShare',
  'Economics',
  'Pilot',
  'PersonaUi',
] as const satisfies readonly Namespace[];

export function pickClientMessages(
  all: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    CLIENT_NAMESPACES.filter((ns) => ns in all).map((ns) => [ns, all[ns]]),
  );
}
