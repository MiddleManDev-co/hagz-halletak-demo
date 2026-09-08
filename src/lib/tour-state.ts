'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { isTourId, TOURS, type TourId, type TourStep } from './tours';

/** Same storage keys as the legacy navigator.js, so a tour survives the migration. */
const STORAGE = {
  tour: 'hh-guide-tour',
  step: 'hh-guide-step',
} as const;

export type TourState = {
  tourId: TourId | null;
  stepIndex: number;
};

const IDLE: TourState = { tourId: null, stepIndex: 0 };

function read(): TourState {
  try {
    const tourId = window.localStorage.getItem(STORAGE.tour);
    if (!tourId || !isTourId(tourId)) return IDLE;

    const raw = Number(window.localStorage.getItem(STORAGE.step) ?? 0);
    const lastIndex = TOURS[tourId].steps.length - 1;
    const stepIndex = Number.isFinite(raw)
      ? Math.min(Math.max(0, Math.trunc(raw)), lastIndex)
      : 0;

    return { tourId, stepIndex };
  } catch {
    return IDLE;
  }
}

function write(state: TourState) {
  try {
    if (state.tourId) {
      window.localStorage.setItem(STORAGE.tour, state.tourId);
      window.localStorage.setItem(STORAGE.step, String(state.stepIndex));
    } else {
      window.localStorage.removeItem(STORAGE.tour);
      window.localStorage.removeItem(STORAGE.step);
    }
  } catch {
    // Resuming a tour later is a nicety, not a requirement.
  }
}

let snapshot: TourState | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): TourState {
  snapshot ??= read();
  return snapshot;
}

function getServerSnapshot(): TourState {
  return IDLE;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function set(next: TourState) {
  snapshot = next;
  write(next);
  for (const notify of listeners) notify();
}

export function currentStep(state: TourState): TourStep | null {
  if (!state.tourId) return null;
  return TOURS[state.tourId].steps[state.stepIndex] ?? null;
}

export function useTourState() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const start = useCallback((tourId: TourId) => {
    set({ tourId, stepIndex: 0 });
  }, []);

  const stop = useCallback(() => set(IDLE), []);

  const goTo = useCallback((stepIndex: number) => {
    const current = getSnapshot();
    if (!current.tourId) return;

    const lastIndex = TOURS[current.tourId].steps.length - 1;
    set({
      tourId: current.tourId,
      stepIndex: Math.min(Math.max(0, stepIndex), lastIndex),
    });
  }, []);

  return { ...state, start, stop, goTo, step: currentStep(state) };
}

export const TOUR_STORAGE_KEYS = STORAGE;
