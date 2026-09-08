import { defineConfig, globalIgnores } from 'eslint/config';
import next from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'node_modules/**', 'review-backend.gs']),
  next,
  nextCoreWebVitals,
  nextTypescript,
]);
