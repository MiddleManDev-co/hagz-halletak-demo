import { defineConfig, devices } from '@playwright/test';

// The demo only ever runs as a static export under the GitHub Pages subpath, so
// the e2e suite exercises the built `out/` directory rather than `next dev` —
// that is the artifact that actually ships.
const BASE_PATH = '/hagz-halletak-demo';
const PORT = 4173;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    // Trailing slash matters: specs use basePath-relative paths ('ar/'), so a
    // leading slash would resolve against the origin and skip the basePath.
    baseURL: `http://127.0.0.1:${PORT}${BASE_PATH}/`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `node scripts/serve-export.mjs`,
    env: { PORT: String(PORT) },
    url: `http://127.0.0.1:${PORT}${BASE_PATH}/ar/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
