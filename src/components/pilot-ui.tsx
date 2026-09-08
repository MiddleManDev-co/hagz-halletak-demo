import type { ReactNode } from 'react';

/** Shared shell for the pilot flow screens (dawwar-pilot.js `.dawwar-panel`). */
export function Panel({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-md border border-line bg-paper p-6 shadow-card ${className}`}
    >
      {children}
    </section>
  );
}

/** The small status pill above each pilot heading. */
export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-status-green-bg px-3 py-1 text-xs font-semibold text-status-green">
      {children}
    </span>
  );
}

/** Numbered/ticked step list used across the pilot screens. */
export function FlowList({
  rows,
}: {
  rows: Array<{ marker: string; title: string; detail: string }>;
}) {
  return (
    <ol className="mt-4 space-y-3">
      {rows.map((row) => (
        <li key={row.title} className="flex gap-3">
          <span
            aria-hidden
            className="grid size-6 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-paper"
          >
            {row.marker}
          </span>
          <span>
            <strong className="block text-sm text-navy">{row.title}</strong>
            <span className="text-sm text-muted">{row.detail}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Highlighted note explaining a pilot-scope constraint. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-md border border-line bg-ivory p-3 text-sm text-ink">
      {children}
    </div>
  );
}

/** Small labelled figure used in the commission and ops summaries. */
export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-paper p-4">
      <small className="block text-xs text-muted">{label}</small>
      <strong className="mt-1 block text-2xl text-navy">{value}</strong>
    </div>
  );
}
