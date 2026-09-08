'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useDemoState } from '@/lib/demo-state';
import { PERSONA_NAV, SIDEBAR_TITLE_KEY } from '@/lib/personas';
import { useIsActive } from './Topbar';

/**
 * Sidebar shell for the VenueOS and Admin screens, ported from
 * `dashboardShell()` in app.js — with the sidebar contents owned here rather
 * than injected by persona-ui.js after render.
 */
export function DashboardShell({
  locale,
  persona,
  children,
}: {
  locale: string;
  persona: 'venue' | 'admin';
  children: ReactNode;
}) {
  const t = useTranslations('PersonaUi');
  const { setPersona } = useDemoState();
  const isActive = useIsActive(locale);

  return (
    <div className="mx-auto flex max-w-(--container-page) flex-col gap-6 px-5 py-6 lg:flex-row">
      <aside className="lg:w-60 lg:shrink-0">
        <div className="text-xs font-semibold tracking-wide text-soft uppercase">
          {t(SIDEBAR_TITLE_KEY[persona])}
        </div>

        <nav className="mt-3 flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {PERSONA_NAV[persona].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-navy aria-[current=page]:bg-navy aria-[current=page]:text-paper"
            >
              <span aria-hidden>{item.icon}</span>
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          onClick={() => setPersona('customer')}
          className="mt-5 hidden rounded-md border border-line px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface lg:block"
        >
          ← {t('customer')}
        </Link>
      </aside>

      <section className="min-w-0 flex-1">{children}</section>
    </div>
  );
}
