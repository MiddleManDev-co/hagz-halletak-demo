import { defineConfig, globalIgnores } from 'eslint/config';
import next from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
  // The vanilla demo still ships from the repo root until the cutover.
  globalIgnores([
    '.next/**',
    'out/**',
    'node_modules/**',
    'app.js',
    'audit.js',
    'extras.js',
    'polish.js',
    'navigator.js',
    'navigator-share.js',
    'business-intelligence.js',
    'persona-ui.js',
    'venue-360.js',
    'ui-refinement.js',
    'dawwar-pilot.js',
    'locale-legacy-v2.js',
    'dawwar-plain-copy.js',
    'demo-sync.js',
    'i18n.js',
    '*.test.js',
    'review-backend.gs',
  ]),
  next,
  nextCoreWebVitals,
  nextTypescript,
]);
