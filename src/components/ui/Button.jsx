import { motion } from 'framer-motion'

const stickerFont = { fontFamily: "'Baloo 2', sans-serif" }

// All sticker-style variants share the same thick dark-purple border and
// hard offset shadow that "presses in" on hover — the site-wide button DNA.
const variants = {
  // Solid gold fill, for primary actions on any background (light or dark).
  primary:
    'bg-gold text-ink border-[3px] border-[#2A1D54] shadow-[3px_3px_0px_#2A1D54] hover:bg-gold-light hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#2A1D54]',
  // Outlined, parchment border/text — use only on DARK backgrounds (Hero, Testimonials).
  outline:
    'bg-transparent text-parchment border-[3px] border-parchment shadow-[3px_3px_0px_#2A1D54] hover:bg-parchment/10 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#2A1D54]',
  // Outlined, ink border/text — use only on LIGHT backgrounds (About, Location, Reservation).
  outlineDark:
    'bg-transparent text-ink border-[3px] border-[#2A1D54] shadow-[3px_3px_0px_#2A1D54] hover:bg-ink/5 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#2A1D54]',
  // Minimal text link, no border/shadow — for low-emphasis actions.
  ghost: 'text-ink hover:text-wine',
}

export default function Button({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  icon: Icon,
  ...props
}) {
  const Comp = motion[as] || motion.button
  const isSticker = variant !== 'ghost'

  return (
    <Comp
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={isSticker ? stickerFont : undefined}
      className={`
        group inline-flex items-center gap-2.5
        ${isSticker ? 'rounded-xl px-7 py-3.5' : 'rounded-full px-5 py-2.5'}
        ${isSticker ? 'font-bold uppercase text-[0.85rem] tracking-wide' : 'text-[0.94rem] font-medium tracking-[0.01em]'}
        transition-all duration-200 ease-out
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      <span>{children}</span>
      {Icon && (
        <Icon
          size={17}
          strokeWidth={2.5}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </Comp>
  )
}