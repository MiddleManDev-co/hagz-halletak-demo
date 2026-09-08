'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { useDemoState } from '@/lib/demo-state';
import { smartNext } from '@/lib/smart-next';
import { useTourState } from '@/lib/tour-state';
import { isTourId, TOURS, TOUR_IDS, type TourId } from '@/lib/tours';
import { ResetDemo } from './ResetDemo';

/** Share-row labels live under different keys than the tour ids. */
const SHARE_LABEL_KEY: Record<TourId, string> = {
  full: 'full_story',
  customer: 'customer',
  venue: 'venue',
  admin: 'admin',
  investor: 'investor',
  business: 'business_intelligence',
};

const TOUR_ICON: Record<TourId, string> = {
  full: '◎',
  customer: '💍',
  venue: '🏛',
  admin: '🛡',
  investor: '📈',
  business: '₤',
};

/**
 * Locale-free current route, e.g. "venue-os/leads".
 *
 * The tour and smart-next tables call the landing screen "home", while the App
 * Router serves it at the locale root, so the two names are reconciled here and
 * in `routeToPath` below.
 */
function useCurrentRoute(locale: string): string {
  const pathname = usePathname();
  const route = pathname
    .replace(new RegExp(`^/${locale}`), '')
    .replace(/^\/|\/$/g, '');
  return route === '' ? 'home' : route;
}

function routeToPath(route: string): string {
  return route === 'home' ? '/' : `/${route}`;
}

/**
 * The guided-demo launcher, step progress, and "suggested next" bar — ported
 * from navigator.js and navigator-share.js.
 *
 * Tour ids are a published contract: DEMO-LINKS.md hands people
 * `?tour=<id>` URLs, so `?tour=` auto-starts the matching tour on load.
 */
export function DemoNavigator({ locale }: { locale: string }) {
  const t = useTranslations('Navigator');
  const share = useTranslations('NavigatorShare');
  const route = useCurrentRoute(locale);
  const router = useRouter();
  const { setPersona } = useDemoState();
  const { tourId, stepIndex, step, start, stop, goTo } = useTourState();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [launcherOpen, setLauncherOpen] = useState(false);
  const autoStarted = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (launcherOpen && !dialog.open) dialog.showModal();
    if (!launcherOpen && dialog.open) dialog.close();
  }, [launcherOpen]);

  // `?tour=` in a shared link starts that tour once, then the param is dropped
  // so a reload does not restart it from step one.
  useEffect(() => {
    if (autoStarted.current) return;
    autoStarted.current = true;

    const requested = new URLSearchParams(window.location.search).get('tour');
    if (!requested || !isTourId(requested)) return;

    start(requested);
    window.history.replaceState(null, '', window.location.pathname);

    // Legacy `startTour()` ran `stepTo(0)`, which navigated. Without this a
    // tour whose first step is not the landing screen would start on whatever
    // page the link happened to open.
    const first = TOURS[requested].steps[0];
    if (!first) return;
    setPersona(first.persona);
    router.push(routeToPath(first.route));
  }, [start, setPersona, router]);

  // Walking a tour drives both the persona and the route.
  const applyStep = (index: number) => {
    if (!tourId) return;
    const next = TOURS[tourId].steps[index];
    if (!next) return;

    goTo(index);
    setPersona(next.persona);
    router.push(routeToPath(next.route));
  };

  const next = smartNext(route);
  const total = tourId ? TOURS[tourId].steps.length : 0;
  const isLastStep = tourId ? stepIndex === total - 1 : false;

  return (
    <>
      {/* Active tour: step counter, progress, and controls. */}
      {tourId && step && (
        <aside className="sticky bottom-0 z-30 border-t border-line bg-navy text-paper">
          <div className="mx-auto max-w-(--container-page) px-5 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs opacity-75">
                  {t('step')} {stepIndex + 1}/{total}
                </span>
                <strong className="ms-2 text-sm">
                  {t(TOURS[tourId].labelKey)}
                </strong>
              </div>
              <button
                type="button"
                onClick={stop}
                aria-label={t('change_tour')}
                className="shrink-0 rounded-md px-2 py-1 text-sm hover:bg-white/10"
              >
                <span aria-hidden>✕</span>
              </button>
            </div>

            <div
              role="progressbar"
              aria-valuenow={stepIndex + 1}
              aria-valuemin={1}
              aria-valuemax={total}
              className="mt-2 h-1 overflow-hidden rounded-full bg-white/20"
            >
              <div
                className="h-full bg-paper transition-[width]"
                style={{ width: `${((stepIndex + 1) / total) * 100}%` }}
              />
            </div>

            <p className="mt-2 text-sm opacity-90">{t(step.key)}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyStep(stepIndex - 1)}
                disabled={stepIndex === 0}
                className="rounded-md bg-white/15 px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
              >
                {t('back')}
              </button>
              <button
                type="button"
                onClick={() => setLauncherOpen(true)}
                className="rounded-md bg-white/15 px-3 py-1.5 text-xs font-semibold"
              >
                {t('change_tour')}
              </button>
              <button
                type="button"
                onClick={() =>
                  isLastStep ? stop() : applyStep(stepIndex + 1)
                }
                className="rounded-md bg-paper px-3 py-1.5 text-xs font-semibold text-navy"
              >
                {isLastStep ? t('done') : t('next')}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* No tour running: suggest the single most useful next screen. */}
      {!tourId && next && (
        <aside className="sticky bottom-0 z-30 border-t border-line bg-surface">
          <div className="mx-auto flex max-w-(--container-page) flex-wrap items-center justify-between gap-3 px-5 py-2.5">
            <span className="text-sm">
              <span className="text-muted">{t('suggested_next')}</span>{' '}
              <strong className="text-navy">{t(next.key)}</strong>
            </span>
            <button
              type="button"
              onClick={() => {
                setPersona(next.persona);
                router.push(routeToPath(next.route));
              }}
              className="shrink-0 rounded-md bg-navy px-3.5 py-1.5 text-xs font-semibold text-paper"
            >
              {t('continue')}
            </button>
          </div>
        </aside>
      )}

      <button
        type="button"
        onClick={() => setLauncherOpen(true)}
        className="fixed bottom-20 end-4 z-30 rounded-full bg-burgundy px-4 py-2.5 text-sm font-semibold text-paper shadow-card-lg"
      >
        <span aria-hidden>◎ </span>
        {t('tours')}
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setLauncherOpen(false)}
        aria-label={t('which_side_of_dawwar_do_you_want')}
        className="m-auto w-[min(34rem,92vw)] rounded-md border border-line bg-paper p-5 text-ink backdrop:bg-black/40"
      >
        <h2 className="text-lg font-bold text-navy">
          {t('which_side_of_dawwar_do_you_want')}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {t('pick_a_short_tour_every_step_tells')}
        </p>

        <ul className="mt-4 grid gap-2">
          {TOUR_IDS.map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => {
                  setLauncherOpen(false);
                  start(id);
                  const first = TOURS[id].steps[0];
                  if (!first) return;
                  setPersona(first.persona);
                  router.push(routeToPath(first.route));
                }}
                className="flex w-full items-start gap-3 rounded-md border border-line px-3 py-2.5 text-start transition-colors hover:bg-surface"
              >
                <span aria-hidden className="text-xl">
                  {TOUR_ICON[id]}
                </span>
                <span>
                  <strong className="block text-sm text-navy">
                    {t(TOURS[id].labelKey)}
                  </strong>
                  <span className="text-xs text-muted">
                    {t(TOURS[id].noteKey)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
          <span className="text-xs font-semibold text-muted">
            {share('direct_presentation_links')}
          </span>
          <ResetDemo />
        </div>
        <div className="mt-2">
          <div className="mt-2 flex flex-wrap gap-2">
            {TOUR_IDS.map((id) => (
              <CopyTourLink key={id} id={id} />
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}

/** Copies a shareable `?tour=<id>` link, as navigator-share.js did. */
function CopyTourLink({ id }: { id: TourId }) {
  const share = useTranslations('NavigatorShare');
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        const url = `${window.location.origin}${window.location.pathname}?tour=${id}`;
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.prompt(share('copy_this_link'), url);
        }
      }}
      className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface"
    >
      <span aria-hidden>{TOUR_ICON[id]} </span>
      {copied ? share('tour_link_copied') : share(SHARE_LABEL_KEY[id])}
    </button>
  );
}
