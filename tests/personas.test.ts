import { describe, expect, it } from 'vitest';
import { personaForPathname } from '@/lib/personas';

describe('personaForPathname', () => {
  it.each([
    ['/hagz-halletak-demo/ar/', 'customer'],
    ['/hagz-halletak-demo/en/venue/royal-garden/', 'customer'],
    ['/hagz-halletak-demo/ar/venue-os/', 'venue'],
    ['/en/pilot/commission/', 'venue'],
    ['/hagz-halletak-demo/en/pilot/ops/', 'admin'],
    ['/ar/admin/verification/', 'admin'],
    ['/hagz-halletak-demo/en/vision/', 'investor'],
    ['/ar/strategy-simulator/', 'investor'],
  ] as const)('maps %s to %s', (pathname, expected) => {
    expect(personaForPathname(pathname)).toBe(expected);
  });
});
