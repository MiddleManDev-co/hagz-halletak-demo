import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// GitHub Pages serves this demo from a repository subpath, so every asset and
// route must be prefixed. `trailingSlash` is load-bearing: without it the export
// emits `ar/explore.html`, which Pages will not serve at `/ar/explore`.
const basePath = '/hagz-halletak-demo';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
