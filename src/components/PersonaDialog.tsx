'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { PERSONAS, useDemoState, type Persona } from '@/lib/demo-state';
import { PERSONA_HOME, PERSONA_ICON } from '@/lib/personas';

/**
 * Persona picker for viewports where the topbar switcher is hidden.
 *
 * The legacy demo opened an equivalent modal from the ☰ button; without it a
 * phone visitor cannot change perspective at all, which is most of what this
 * demo is for. Uses a native <dialog> so focus trapping and Escape come from
 * the platform.
 */
export function PersonaDialog() {
  const t = useTranslations('PersonaUi');
  const personaT = useTranslations('Persona');
  const common = useTranslations('Common');
  const { persona, setPersona } = useDemoState();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const choose = (next: Persona) => {
    setPersona(next);
    setOpen(false);
    router.push(PERSONA_HOME[next]);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('choose_a_dawwar_view')}
        className="rounded-md border border-line px-2.5 py-1.5 text-sm text-navy transition-colors hover:bg-surface lg:hidden"
      >
        <span aria-hidden>☰</span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label={t('choose_a_dawwar_view')}
        className="m-auto w-[min(28rem,92vw)] rounded-md border border-line bg-paper p-5 text-ink backdrop:bg-black/40"
      >
        <h2 className="text-lg font-bold text-navy">
          {t('choose_a_dawwar_view')}
        </h2>

        <ul className="mt-4 grid gap-2">
          {PERSONAS.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => choose(option)}
                aria-pressed={persona === option}
                className="flex w-full items-center gap-3 rounded-md border border-line px-3 py-2.5 text-start transition-colors hover:bg-surface aria-pressed:border-navy aria-pressed:bg-surface"
              >
                <span aria-hidden className="text-xl">
                  {PERSONA_ICON[option]}
                </span>
                <span className="font-semibold text-navy">
                  {personaT(option)}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-4 w-full rounded-md bg-surface px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-line"
        >
          {common('close')}
        </button>
      </dialog>
    </>
  );
}
