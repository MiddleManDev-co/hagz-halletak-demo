'use client';

import { useTranslations } from 'next-intl';
import { useDemoState } from '@/lib/demo-state';
import { PERSONA_ICON, RIBBON_KEY } from '@/lib/personas';

/**
 * The strip under the topbar that says what this persona is here to do,
 * ported from `renderRibbon()` in persona-ui.js.
 */
export function DemoRibbon() {
  const t = useTranslations('PersonaUi');
  const persona = useTranslations('Persona');
  const { persona: role } = useDemoState();

  return (
    <div className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-(--container-page) flex-wrap items-center gap-x-3 gap-y-1 px-5 py-2 text-sm">
        <strong className="text-navy">
          <span aria-hidden>{PERSONA_ICON[role]} </span>
          {persona(role)}:
        </strong>
        <span className="text-muted">{t(RIBBON_KEY[role])}</span>
      </div>
    </div>
  );
}
