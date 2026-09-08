import { describe, expect, it } from 'vitest';
import { globSync, readFileSync } from 'node:fs';
import ar from '../messages/ar.json';

type Catalog = Record<string, Record<string, string>>;
const catalog = ar as unknown as Catalog;

/**
 * Static guard against a typo'd message key.
 *
 * `onError` in src/i18n/request.ts already makes a missing key fail the export,
 * but that costs a full build to discover. This finds it in milliseconds, which
 * matters while porting ~45 screens.
 *
 * Two deliberate imprecisions, both safe because the build is the exact check:
 *  - Only literal keys are checked; a computed key like t(`area_${venue.area}`)
 *    cannot be resolved statically.
 *  - A file may bind the same variable name to more than one namespace (one per
 *    component), so a key is accepted if it exists in ANY namespace bound to
 *    that name in that file. A genuine typo still exists in none of them.
 */
const SOURCE_FILES = globSync('src/**/*.{ts,tsx}');

const NAMESPACE_BINDING =
  /const\s+(\w+)\s*=\s*(?:useTranslations|getTranslations)\(\s*(?:\{[^}]*namespace:\s*)?'(\w+)'/g;

function namespacesByVariable(source: string) {
  const bindings = new Map<string, Set<string>>();

  for (const match of source.matchAll(NAMESPACE_BINDING)) {
    const [, variable, namespace] = match;
    if (!variable || !namespace) continue;
    const existing = bindings.get(variable) ?? new Set<string>();
    existing.add(namespace);
    bindings.set(variable, existing);
  }

  return bindings;
}

function literalKeyCalls(source: string, variable: string): string[] {
  const pattern = new RegExp(`\\b${variable}\\(\\s*'([^']+)'`, 'g');
  return [...source.matchAll(pattern)].map((match) => match[1]!);
}

describe('message key usage', () => {
  it('resolves every literal translation key used in src/', () => {
    const missing: string[] = [];

    for (const file of SOURCE_FILES) {
      const source = readFileSync(file, 'utf8');

      for (const [variable, namespaces] of namespacesByVariable(source)) {
        const unknown = [...namespaces].filter((name) => !(name in catalog));
        if (unknown.length > 0) {
          missing.push(`${file}: unknown namespace(s) ${unknown.join(', ')}`);
          continue;
        }

        for (const key of literalKeyCalls(source, variable)) {
          const found = [...namespaces].some(
            (name) => key in (catalog[name] ?? {}),
          );
          if (!found) {
            missing.push(`${file}: ${[...namespaces].join('|')}.${key}`);
          }
        }
      }
    }

    expect(missing).toEqual([]);
  });

  it('finds source files to scan', () => {
    // Guards against a glob change silently making the check above vacuous.
    expect(SOURCE_FILES.length).toBeGreaterThan(10);
  });
});
