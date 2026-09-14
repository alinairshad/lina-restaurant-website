import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button'

// Your own footage — kept muted/looping/inline for a graceful autoplay,
// with a poster fallback if the video can't load or reduced-motion is on.
const HERO_VIDEO = '/videos/lina-hero.mp4'
const HERO_POSTER =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop'

const heading = { fontFamily: "'Baloo 2', sans-serif" }

function BlockText({ children, className = '' }) {
  const depth = Array.from({ length: 11 })
    .map((_, i) => `${i + 1}px ${i + 1}px 0 #2A1D54`)
    .join(', ')

  return (
    <h1
      style={{
        ...heading,
        fontWeight: 800,
        color: '#FBF1E6',
        WebkitTextStroke: '3px #2A1D54',
        textShadow: depth,
      }}
      className={`select-none uppercase leading-[0.82] tracking-tight ${className}`}
    >
      {children}
    </h1>
  )
}

export default function Hero() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)
    const handler = (e) => setReducedMotion(e.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [])

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      {/* full-bleed illustrated/video background — unchanged, only the overlay is lighter now */}
      <div className="absolute inset-0">
        {!reducedMotion ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img src={HERO_POSTER} alt="Lina's dining room" className="h-full w-full object-cover" />
        )}
        {/* lighter overlay: illustration reads through more, still dark enough at the
            top/bottom edges for the nav and CTAs to stay legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/55" />
        {/* faint warm coastal tint instead of a flat dark wash */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F4633A]/10 via-transparent to-transparent" />
      </div>

      <div className="container-page relative z-10 w-full py-32 sm:py-40">
        {/* top micro-info — quieter, premium, off the main body font */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-parchment/70 sm:text-xs"
        >
          <span>Open tonight · 5:30pm – 10pm</span>
          <span className="text-parchment/30">·</span>
          <button
            onClick={() =>
              window.open(
                'https://www.google.com/maps/search/?api=1&query=214+Harbor+Row+Dockside+District',
                '_blank',
                'noreferrer'
              )
            }
            className="inline-flex items-center gap-1.5 transition-colors hover:text-parchment"
          >
            214 Harbor Row, Dockside District
            <ArrowUpRight size={13} />
          </button>
        </motion.div>

        {/* giant wordmark — the clear focal point */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 sm:mt-9"
        >
          <BlockText className="text-[4.25rem] sm:text-[7.5rem] lg:text-[10.5rem]">
            Lina
          </BlockText>
        </motion.div>

        {/* sticker badges — smaller and in a row now, so they support the wordmark
            instead of competing with it */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3"
        >
          <span
            className="-rotate-1 rounded-lg bg-[#C6E86B] px-3.5 py-1.5 text-base font-extrabold uppercase text-[#2A1D54] sm:text-lg"
            style={heading}
          >
            Wood
          </span>
          <span
            className="rotate-1 rounded-lg bg-[#F4633A] px-3.5 py-1.5 text-base font-extrabold uppercase text-[#FBF1E6] sm:text-lg"
            style={heading}
          >
            &amp; Fire
          </span>
          <span
            className="-rotate-1 rounded-lg bg-[#FF8FD8] px-4 py-1.5 text-base font-extrabold uppercase text-[#2A1D54] sm:text-lg"
            style={heading}
          >
            Coastal Table
          </span>
        </motion.div>

        {/* positioning statement — elegant serif, distinct from the playful badges,
            this is the new "premium" beat the brief asked for */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-6 max-w-md font-display text-xl italic leading-snug text-parchment/90 sm:mt-7 sm:text-2xl"
        >
          Seasonal coastal cooking shaped by wood, fire &amp; tide.
        </motion.p>

        {/* CTAs — one clear primary, one quiet secondary; no competing reservation card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12"
        >
          <Button variant="primary" icon={ArrowRight} onClick={() => navigate('/contact')}>
            Reserve a table
          </Button>
          <Button
  variant="outline"
  onClick={() => navigate('/menu')}
  className="!border-parchment/40 !text-parchment hover:!border-gold hover:!bg-gold/10 hover:!text-gold"
>
  View the menu
</Button>
        </motion.div>
      </div>

      {/* soft fade into the next section instead of an abrupt cut */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-b from-transparent to-parchment sm:h-28" />

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-parchment/60 sm:flex"
      >
        <span className="h-7 w-px animate-pulse bg-parchment/40" />
        Scroll
      </motion.div>
    </section>
  )
}
