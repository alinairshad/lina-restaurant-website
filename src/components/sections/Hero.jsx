import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button'

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
    // min-h eased back up to 95svh (was 92svh — too tight, pushed the top
    // line under the fixed navbar). Top/bottom padding restored close to
    // the original (py-28/py-36 vs. original py-32/py-40) — enough
    // clearance below the navbar, just slightly more compact overall.
    <section className="relative flex min-h-[95svh] items-center overflow-hidden bg-ink">
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
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F4633A]/10 via-transparent to-transparent" />
      </div>

      <div className="container-page relative z-10 w-full py-28 sm:py-36">
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 sm:mt-9"
        >
          <BlockText className="text-[4rem] sm:text-[7rem] lg:text-[9.5rem]">
            Lina
          </BlockText>
        </motion.div>

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

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-6 max-w-md font-display text-xl italic leading-snug text-parchment/90 sm:mt-7 sm:text-2xl"
        >
          Seasonal coastal cooking shaped by wood, fire &amp; tide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-5 sm:mt-12"
        >
          <Button
            variant="primary"
            icon={ArrowRight}
            onClick={() => navigate('/contact')}
            style={heading}
            whileHover={{ x: 3, y: 3, rotate: 0 }}
            whileTap={{ x: 4, y: 4, scale: 0.98 }}
            className="-rotate-1 !rounded-xl !border-[3px] !border-[#2A1D54] !text-[0.85rem] !font-extrabold !uppercase !tracking-wide !shadow-[4px_4px_0_0_#2A1D54] transition-shadow duration-200 hover:!shadow-[1px_1px_0_0_#2A1D54]"
          >
            Reserve a table
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/menu')}
            style={heading}
            whileHover={{ x: 3, y: 3, rotate: 0 }}
            whileTap={{ x: 4, y: 4, scale: 0.98 }}
            className="rotate-1 !rounded-xl !border-[3px] !border-parchment !bg-transparent !text-[0.85rem] !font-extrabold !uppercase !tracking-wide !text-parchment !shadow-[4px_4px_0_0_rgba(251,241,230,0.45)] transition-shadow duration-200 hover:!border-parchment hover:!bg-parchment/10 hover:!shadow-[1px_1px_0_0_rgba(251,241,230,0.45)]"
          >
            View the menu
          </Button>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-b from-transparent to-parchment sm:h-28" />

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