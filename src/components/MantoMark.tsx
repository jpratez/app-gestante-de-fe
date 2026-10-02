/** Desenho delicado (halo + manto) usado nos placeholders e no logo. */
export function MantoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="16" r="8" opacity=".7" />
      <path d="M32 26c-9 0-16 8-18 22 5 4 11 6 18 6s13-2 18-6c-2-14-9-22-18-22Z" />
      <path d="M32 26c-4 8-5 16-4 28M32 26c4 8 5 16 4 28" opacity=".45" />
    </svg>
  )
}
