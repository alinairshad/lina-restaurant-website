// A single recurring motif tying back to "Lina" (tide) — used sparingly
// as the one bold, memorable device rather than scattered decoration.
export default function Ornament({ className = '', color = 'currentColor' }) {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 12c14 0 14-9 28-9s14 9 28 9 14-9 28-9 14 9 28 9 14-9 28-9 14 9 28 9 14-9 28-9 14 9 28 9 14-9 28-9"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
