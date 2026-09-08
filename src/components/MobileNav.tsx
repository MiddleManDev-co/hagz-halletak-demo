'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useDemoState } from '@/lib/demo-state';
import { mobileNavItemsFor } from '@/lib/personas';
import { useIsActive } from './Topbar';

export function MobileNav({ locale }: { locale: string }) {
  const nav = useTranslations('PersonaUi');
  const personaT = useTranslations('Persona');
  const { persona } = useDemoState();
  const isActive = useIsActive(locale);
  const items = mobileNavItemsFor(persona);

  return (
    <nav
      aria-label={`${personaT(persona)} · ${nav('mobile_navigation')}`}
      className="sticky bottom-0 z-40 flex border-t border-line bg-paper md:hidden"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(item.href) ? 'page' : undefined}
          className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium text-muted aria-[current=page]:text-navy"
        >
          <span aria-hidden className="text-base leading-none">
            {item.icon}
          </span>
          {nav(item.labelKey)}
        </Link>
      ))}
    </nav>
  );
}
