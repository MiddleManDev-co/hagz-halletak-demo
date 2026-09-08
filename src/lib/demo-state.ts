'use client';

import { useCallback, useSyncExternalStore } from 'react';

export const PERSONAS = ['customer', 'venue', 'admin', 'investor'] as const;
export type Persona = (typeof PERSONAS)[number];

export type DemoState = {
  persona: Persona;
  shortlist: string[];
  bookingConfirmed: boolean;
  visitScheduled: boolean;
  refundRequested: boolean;
};

/**
 * Storage keys are kept identical to the legacy build so a visitor who used the
 * old demo keeps their persona and shortlist across the migration.
 */
const STORAGE_KEYS = {
  persona: 'hh-persona',
  shortlist: 'hh-shortlist',
  bookingConfirmed: 'hh-booking',
  visitScheduled: 'hh-visit',
  refundRequested: 'hh-refund',
} as const;

const DEFAULT_STATE: DemoState = {
  persona: 'customer',
  shortlist: ['royal-garden', 'luma-hall', 'nile-palace'],
  bookingConfirmed: false,
  visitScheduled: false,
  refundRequested: false,
};

function read(): DemoState {
  try {
    const persona = window.localStorage.getItem(STORAGE_KEYS.persona);
    const stored = window.localStorage.getItem(STORAGE_KEYS.shortlist);
    const shortlist: unknown = stored ? JSON.parse(stored) : null;

    return {
      persona: (PERSONAS as readonly string[]).includes(persona ?? '')
        ? (persona as Persona)
        : DEFAULT_STATE.persona,
      shortlist:
        Array.isArray(shortlist) &&
        shortlist.every((id) => typeof id === 'string')
          ? shortlist
          : DEFAULT_STATE.shortlist,
      bookingConfirmed:
        window.localStorage.getItem(STORAGE_KEYS.bookingConfirmed) === '1',
      visitScheduled:
        window.localStorage.getItem(STORAGE_KEYS.visitScheduled) === '1',
      refundRequested:
        window.localStorage.getItem(STORAGE_KEYS.refundRequested) === '1',
    };
  } catch {
    // Private-mode browsers throw on storage access; defaults still work.
    return DEFAULT_STATE;
  }
}

function write(state: DemoState) {
  try {
    const { localStorage } = window;
    localStorage.setItem(STORAGE_KEYS.persona, state.persona);
    localStorage.setItem(
      STORAGE_KEYS.shortlist,
      JSON.stringify(state.shortlist),
    );
    localStorage.setItem(
      STORAGE_KEYS.bookingConfirmed,
      state.bookingConfirmed ? '1' : '0',
    );
    localStorage.setItem(
      STORAGE_KEYS.visitScheduled,
      state.visitScheduled ? '1' : '0',
    );
    localStorage.setItem(
      STORAGE_KEYS.refundRequested,
      state.refundRequested ? '1' : '0',
    );
  } catch {
    // Persistence is a convenience, never a correctness requirement.
  }
}

/**
 * localStorage-backed store read through `useSyncExternalStore`.
 *
 * The server snapshot is the neutral default, which is what gets prerendered
 * into the static export; React swaps in the stored value after hydration
 * without a mismatch. The snapshot is cached because `useSyncExternalStore`
 * requires a stable reference between changes.
 */
let snapshot: DemoState | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): DemoState {
  snapshot ??= read();
  return snapshot;
}

function getServerSnapshot(): DemoState {
  return DEFAULT_STATE;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  // A `storage` event only fires in *other* tabs, which is exactly the
  // cross-tab sync the legacy demo-sync.js provided.
  const onStorage = (event: StorageEvent) => {
    const watched: string[] = Object.values(STORAGE_KEYS);
    if (event.key !== null && !watched.includes(event.key)) return;
    snapshot = null;
    for (const notify of listeners) notify();
  };

  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function update(patch: (current: DemoState) => DemoState) {
  const next = patch(getSnapshot());
  snapshot = next;
  write(next);
  for (const notify of listeners) notify();
}

export function useDemoState() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setPersona = useCallback((persona: Persona) => {
    update((current) => ({ ...current, persona }));
  }, []);

  const toggleShortlist = useCallback((venueId: string) => {
    update((current) => ({
      ...current,
      shortlist: current.shortlist.includes(venueId)
        ? current.shortlist.filter((id) => id !== venueId)
        : [...current.shortlist, venueId],
    }));
  }, []);

  const setBookingConfirmed = useCallback((bookingConfirmed: boolean) => {
    update((current) => ({ ...current, bookingConfirmed }));
  }, []);

  const reset = useCallback(() => {
    update(() => DEFAULT_STATE);
  }, []);

  return { ...state, setPersona, toggleShortlist, setBookingConfirmed, reset };
}

export {
  DEFAULT_STATE as DEMO_DEFAULT_STATE,
  STORAGE_KEYS as DEMO_STORAGE_KEYS,
};

/** Exported for tests, which need a clean store between cases. */
export function resetDemoStoreCache() {
  snapshot = null;
}
