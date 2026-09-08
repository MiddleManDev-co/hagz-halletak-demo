'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { PERSONAS, useDemoState } from '@/lib/demo-state';
import { PERSONA_HOME, navItemsFor } from '@/lib/personas';
import { LanguageSwitch } from './LanguageSwitch';
import { PersonaDialog } from './PersonaDialog';

export function useIsActive(locale: string) {
  const pathname = usePathname();
  const current = pathname.replace(/\/$/, '');

  return (href: string) => {
    const full = href === '/' ? `/${locale}` : `/${locale}${href}`;
    return href === '/' ? current === full : current.startsWith(full);
  };
}

export function Topbar({ locale }: { locale: string }) {
  const nav = useTranslations('PersonaUi');
  const brand = useTranslations('Brand');
  const personaT = useTranslations('Persona');
  const { persona, setPersona } = useDemoState();
  const isActive = useIsActive(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-(--container-page) items-center gap-4 px-5 py-3">
        <Link
          href={PERSONA_HOME[persona]}
          className="flex shrink-0 items-center gap-2 font-bold text-navy"
          aria-label={brand('name')}
        >
          <span className="grid size-8 place-items-center rounded-md bg-navy text-paper">
            {brand('mark')}
          </span>
          <span className="text-lg">{brand('name')}</span>
        </Link>

        <nav
          aria-label={`${personaT(persona)} · ${nav('navigation')}`}
          className="ms-4 hidden items-center gap-1 md:flex"
        >
          {navItemsFor(persona).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-navy aria-[current=page]:bg-surface aria-[current=page]:text-navy"
            >
              {nav(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <div
            role="group"
            aria-label={personaT('label')}
            className="hidden items-center gap-1 rounded-full bg-surface p-1 lg:flex"
          >
            {PERSONAS.map((option) => (
              <Link
                key={option}
                href={PERSONA_HOME[option]}
                onClick={() => setPersona(option)}
                aria-pressed={persona === option}
                className="rounded-full px-3 py-1 text-xs font-semibold text-muted transition-colors hover:text-navy aria-pressed:bg-navy aria-pressed:text-paper"
              >
                {personaT(option)}
              </Link>
            ))}
          </div>

          <LanguageSwitch locale={locale} />
          <PersonaDialog />
        </div>
      </div>
    </header>
  );
}
