type KolamDividerProps = {
  /** Sets width and colour (the ornament draws in currentColor). */
  className?: string;
};

/** Thin kolam-style line divider: a looped motif between two hairlines. Decorative only — use sparingly. */
export default function KolamDivider({ className = "" }: KolamDividerProps) {
  return (
    <div aria-hidden="true" className={`flex items-center ${className}`}>
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-current opacity-60" />
      <svg
        viewBox="0 0 72 24"
        className="h-6 w-[4.5rem] shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 12q6-8 12 0t12 0" />
        <path d="M72 12q-6-8-12 0t-12 0" />
        <path d="M36 2c6 6 6 6 12 10-6 4-6 4-12 10-6-6-6-6-12-10 6-4 6-4 12-10z" />
        <circle cx="36" cy="12" r="4.5" />
        <circle cx="36" cy="12" r="1" fill="currentColor" stroke="none" />
      </svg>
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-current opacity-60" />
    </div>
  );
}
