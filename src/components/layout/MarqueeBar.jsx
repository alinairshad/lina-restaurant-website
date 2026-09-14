import { Sparkles } from 'lucide-react'

const MESSAGE = 'RESERVE YOUR TABLE   ·   WOOD-FIRED EVERY NIGHT   ·   DOCKSIDE DISTRICT'

export default function MarqueeBar() {
  const repeats = Array.from({ length: 6 })

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-10 overflow-hidden bg-[#BFE7FF]">
      <div className="animate-marquee flex h-full w-max items-center whitespace-nowrap">
        {repeats.map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-4 text-xs font-bold uppercase tracking-wide text-[#2A1D54]"
            style={{ fontFamily: "'Baloo 2', sans-serif" }}
          >
            {MESSAGE}
            <Sparkles size={13} className="text-[#2A1D54]" />
          </span>
        ))}
      </div>
    </div>
  )
}
