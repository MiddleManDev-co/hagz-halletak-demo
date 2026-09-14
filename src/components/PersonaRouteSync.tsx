'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDemoState } from '@/lib/demo-state';
import { personaForPathname } from '@/lib/personas';

/** Keeps direct and shared URLs aligned with the perspective shown in the demo chrome. */
export function PersonaRouteSync() {
  const pathname = usePathname();
  const { persona, setPersona } = useDemoState();

  useEffect(() => {
    const routePersona = personaForPathname(pathname);
    if (routePersona !== persona) setPersona(routePersona);
  }, [pathname, persona, setPersona]);

  return null;
}
