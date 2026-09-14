import { describe, expect, it } from 'vitest';
import ar from '../messages/ar.json';
import en from '../messages/en.json';
import untranslated from '../messages/untranslated-allowlist.json';

type Catalog = { [key: string]: string | Catalog };

function flatten(catalog: Catalog, prefix = ''): Record<string, string> {
  return Object.entries(catalog).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'string') acc[path] = value;
      else Object.assign(acc, flatten(value, path));
      return acc;
    },
    {},
  );
}

const arFlat = flatten(ar as Catalog);
const enFlat = flatten(en as Catalog);

const ARABIC = /[؀-ۿ]/;
/** Values with no letters at all ("↑ 22%", "MTR-2031") are script-neutral. */
const HAS_LETTERS = /\p{Letter}/u;

/**
 * Brands and venue names stay in Latin script inside Arabic copy on purpose —
 * a venue's actual name is not translated.
 */
const PROPER_NOUNS = [
  'Royal Garden',
  'Luma Hall',
  'Nile Palace',
  'Garden 37',
  'Palm Palace',
  'Lake House',
  'VenueOS',
  'DateDrop',
  'MATRAH',
];

/** A language switcher names each language in its own script. */
const SCRIPT_EXEMPT = new Set(['Language.ar', 'Language.en', 'Brand.mark']);

const knownUntranslated = new Set(untranslated as string[]);

describe('message catalogs', () => {
  it('define exactly the same keys in both locales', () => {
    expect(Object.keys(enFlat).sort()).toEqual(Object.keys(arFlat).sort());
  });

  it('have no empty values', () => {
    for (const [key, value] of [
      ...Object.entries(arFlat),
      ...Object.entries(enFlat),
    ]) {
      expect(value.trim(), `${key} is empty`).not.toBe('');
    }
  });

  it('keeps Arabic script out of the English catalog', () => {
    for (const [key, value] of Object.entries(enFlat)) {
      if (SCRIPT_EXEMPT.has(key)) continue;
      expect(ARABIC.test(value), `${key} leaks Arabic: ${value}`).toBe(false);
    }
  });

  it('has Arabic in every Arabic value that is not a known gap', () => {
    const surprises: string[] = [];

    for (const [key, value] of Object.entries(arFlat)) {
      if (SCRIPT_EXEMPT.has(key)) continue;
      if (ARABIC.test(value)) continue;
      if (!HAS_LETTERS.test(value)) continue;
      if (PROPER_NOUNS.some((noun) => value.trim() === noun)) continue;
      if (knownUntranslated.has(key)) continue;
      surprises.push(`${key}: ${value}`);
    }

    expect(
      surprises,
      'new untranslated Arabic copy — translate it, or add it to messages/UNTRANSLATED.md',
    ).toEqual([]);
  });

  it('shrinks the untranslated backlog rather than growing it', () => {
    const stillMissing = (untranslated as string[]).filter((key) => {
      const value = arFlat[key];
      return value !== undefined && !ARABIC.test(value);
    });

    // Ratchet: this number may only ever go down. Lower it as gaps are filled.
    expect(stillMissing.length).toBeLessThanOrEqual(67);
  });

  it('lists every allowlisted key as a real catalog key', () => {
    for (const key of untranslated as string[]) {
      expect(arFlat[key], `${key} is allowlisted but no longer exists`).toBeDefined();
    }
  });

  it('keeps the visible catalogs on the MATRAH brand', () => {
    expect(Object.values(enFlat).join('\n')).not.toMatch(/Dawwar|DWR-/i);
    expect(Object.values(arFlat).join('\n')).not.toMatch(/دوّر|DWR-/);
    expect(enFlat['Brand.name']).toBe('MATRAH');
    expect(arFlat['Brand.name']).toBe('مَطرح');
  });
});
