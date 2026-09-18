// Compact marquee ticker using the site's Baloo 2 sticker-badge style
// (same look as the Hero's WOOD / & FIRE / COASTAL TABLE badges):
// bold rotated colored chips, thick dark-purple border, hard offset shadow
// that "presses in" on hover. No background band — badges float directly
// on the page background, only the row of chips scrolls.

const MARQUEE_ITEMS = [
  { label: "Fresh Ingredients", bg: "bg-[#C6E86B]" },
  { label: "Seasonal Dishes", bg: "bg-[#F4633A]" },
  { label: "Wood-Fired Flavor", bg: "bg-[#FF8FD8]" },
  { label: "Local Produce", bg: "bg-gold" },
  { label: "Good Food", bg: "bg-[#C6E86B]" },
];

// One full pass of the badge list. Duplicated twice in the DOM (see below)
// so the scrolling loop has no visible jump.
const MarqueeTrack = ({ ariaHidden = false }) => (
  <div className="flex shrink-0 items-center gap-4 md:gap-5 px-2" aria-hidden={ariaHidden}>
    {MARQUEE_ITEMS.map((item, i) => (
      <span
        key={i}
        className={`
          ${item.bg} ${i % 2 === 0 ? "-rotate-2" : "rotate-2"}
          inline-flex items-center whitespace-nowrap
          px-3 py-1.5 md:px-4 md:py-2
          rounded-xl border-[3px] border-[#2A1D54]
          font-['Baloo_2'] font-bold uppercase text-[11px] md:text-xs
          text-[#2A1D54] tracking-wide
          shadow-[3px_3px_0px_#2A1D54]
          transition-transform duration-200 ease-soft
          hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#2A1D54]
          cursor-default
        `}
      >
        {item.label}
      </span>
    ))}
  </div>
);

export default function FoodMarquee() {
  return (
    <section
      className="relative w-full py-4 md:py-5 overflow-hidden group"
      aria-label="Restaurant highlights"
    >
      {/* Soft edge fade into the parchment page background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-20 bg-gradient-to-r from-parchment to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-20 bg-gradient-to-l from-parchment to-transparent z-10" />

      <div className="flex items-center animate-marquee-text group-hover:[animation-play-state:paused]">
        <MarqueeTrack />
        <MarqueeTrack ariaHidden />
      </div>
    </section>
  );
}