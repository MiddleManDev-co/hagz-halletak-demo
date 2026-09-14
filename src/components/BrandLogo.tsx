import { useTranslations } from 'next-intl';

export function BrandMark({ className = 'size-10' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className={className}
      fill="none"
    >
      <rect width="48" height="48" rx="14" fill="var(--color-navy)" />
      <path
        d="M13 32V21.5C13 14.044 17.925 9 24 9s11 5.044 11 12.5V32"
        stroke="var(--color-paper)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="23" r="4" fill="var(--color-burgundy)" />
      <path
        d="M10 35.5C13.86 39.913 18.527 42 24 42s10.14-2.087 14-6.5"
        stroke="var(--color-gold)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandLogo({
  showTagline = false,
  prominent = false,
}: {
  showTagline?: boolean;
  prominent?: boolean;
}) {
  const brand = useTranslations('Brand');

  return (
    <span className="inline-flex items-center gap-3">
      <BrandMark className={prominent ? 'size-14 sm:size-16' : 'size-9'} />
      <span className="min-w-0">
        <strong
          className={
            prominent
              ? 'block text-2xl leading-none font-extrabold tracking-[0.08em] text-navy rtl:tracking-normal sm:text-3xl'
              : 'block text-lg leading-none font-extrabold tracking-[0.08em] text-navy rtl:tracking-normal'
          }
        >
          {brand('name')}
        </strong>
        {showTagline && (
          <span
            className={
              prominent
                ? 'mt-2 block text-sm font-semibold text-burgundy sm:text-base'
                : 'mt-1 hidden text-[0.68rem] font-semibold text-muted xl:block'
            }
          >
            {brand('tagline')}
          </span>
        )}
      </span>
    </span>
  );
}
