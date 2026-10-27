export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" fill="#6D5EF5" />
      <path
        d="M9.5 8.5h8.2l5.3 5.3v10.2a1.8 1.8 0 0 1-1.8 1.8H9.5a1.8 1.8 0 0 1-1.8-1.8V10.3a1.8 1.8 0 0 1 1.8-1.8z"
        fill="#F7F5FF"
      />
      <path d="M17.6 8.6v5.2h5.2" stroke="#6D5EF5" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M11.2 18.2h7.6M11.2 21.4h4.8" stroke="#6D5EF5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
