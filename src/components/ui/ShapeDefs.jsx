// Renders the SVG clipPath definitions once. Mount this ONCE near the
// root (e.g. in App.jsx), not inside every card, so the ids stay unique.
export default function ShapeDefs() {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        {/* --- Burger shape --- */}
        <clipPath id="burger-clip" clipPathUnits="objectBoundingBox">
          {/* top bun */}
          <path d="M0.5,0.03 C0.75,0.03 0.9,0.12 0.9,0.22 C0.9,0.28 0.1,0.28 0.1,0.22 C0.1,0.12 0.25,0.03 0.5,0.03 Z" />
          {/* lettuce */}
          <path d="M0.08,0.30 C0.15,0.34 0.2,0.28 0.27,0.33 C0.34,0.28 0.4,0.34 0.47,0.29 C0.54,0.34 0.6,0.28 0.67,0.33 C0.74,0.28 0.8,0.34 0.87,0.30 L0.9,0.38 L0.07,0.38 Z" />
          {/* patty */}
          <rect x="0.08" y="0.38" width="0.84" height="0.16" rx="0.06" />
          {/* cheese drip */}
          <path d="M0.06,0.55 L0.94,0.55 L0.9,0.63 L0.8,0.6 L0.7,0.64 L0.6,0.6 L0.5,0.64 L0.4,0.6 L0.3,0.64 L0.2,0.6 L0.1,0.63 Z" />
          {/* bottom bun */}
          <path d="M0.06,0.66 C0.06,0.62 0.12,0.6 0.5,0.6 C0.88,0.6 0.94,0.62 0.94,0.66 C0.94,0.85 0.8,0.95 0.5,0.95 C0.2,0.95 0.06,0.85 0.06,0.66 Z" />
        </clipPath>

        {/* --- Ice-cream shape --- */}
        <clipPath id="icecream-clip" clipPathUnits="objectBoundingBox">
          {/* scoop */}
          <circle cx="0.5" cy="0.32" r="0.28" />
          {/* cone */}
          <path d="M0.28,0.42 L0.72,0.42 L0.53,0.95 C0.51,0.98 0.49,0.98 0.47,0.95 Z" />
        </clipPath>
      </defs>
    </svg>
  )
}