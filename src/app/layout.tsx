import type { ReactNode } from 'react';

// Pass-through: `[locale]/layout.tsx` owns <html> so that `lang` and `dir` can
// be set per locale at build time rather than patched on the client.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
