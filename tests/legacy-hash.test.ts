import { describe, expect, it } from 'vitest';
import { legacyHashToPath } from '@/components/LegacyHashRedirect';

/**
 * These hashes are the URLs published in DEMO-LINKS.md and already shared, so
 * the mapping is a compatibility contract, not an implementation detail.
 */
describe('legacyHashToPath', () => {
  it('maps the legacy home hash to the locale root', () => {
    expect(legacyHashToPath('#/home')).toBe('');
  });

  it.each([
    ['#/explore', 'explore'],
    ['#/venue/royal-garden', 'venue/royal-garden'],
    ['#/venue-os/leads', 'venue-os/leads'],
    ['#/admin/overview', 'admin/overview'],
    ['#/pilot/request/royal-garden', 'pilot/request/royal-garden'],
    ['#/pilot/quote/royal-garden', 'pilot/quote/royal-garden'],
    ['#/pilot/commission', 'pilot/commission'],
    ['#/my-wedding', 'my-wedding'],
  ])('maps %s to %s', (hash, expected) => {
    expect(legacyHashToPath(hash)).toBe(expected);
  });

  it('passes through routes with no explicit mapping', () => {
    expect(legacyHashToPath('#/marketplace-health')).toBe('marketplace-health');
    expect(legacyHashToPath('#/strategy-simulator')).toBe('strategy-simulator');
  });

  it('ignores a bare or empty hash', () => {
    expect(legacyHashToPath('#/')).toBeNull();
    expect(legacyHashToPath('')).toBeNull();
  });

  it('does not confuse a prefix with a longer sibling segment', () => {
    // `venue` must not swallow `venue-os`.
    expect(legacyHashToPath('#/venue-os')).toBe('venue-os');
  });
});
