import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

// Same playful display font as the Hero wordmark, reused here at a much
// smaller scale so the two sections read as one voice, not two brands.
const heading = { fontFamily: "'Baloo 2', sans-serif" }

// Same pattern as the Hero video: autoplay/muted/loop, with a poster image
// fallback for reduced-motion users or if the video fails to load.
const ABOUT_VIDEO = '/videos/about-kitchen.mp4'
const ABOUT_POSTER =
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1400&auto=format&fit=crop'

export default function About({ compact = false }) {
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
    <section className="relative overflow-hidden bg-parchment py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
        {/* video — wide, landscape framing, with a small rotated sticker
            caption echoing the Hero's badge treatment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
            {!reducedMotion ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={ABOUT_VIDEO}
                poster={ABOUT_POSTER}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={ABOUT_POSTER}
                alt="Chef preparing a dish in Lina's open kitchen"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <span
            className="absolute -bottom-4 -right-3 -rotate-3 rounded-lg bg-[#F4633A] px-4 py-1.5 text-sm font-extrabold uppercase text-[#FBF1E6] shadow-card sm:-right-4 sm:text-base"
            style={heading}
          >
            Since 2016
          </span>
        </motion.div>

        {/* copy — Baloo 2 heading, color badge row, then the same quiet
            body copy and CTA as before */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span
              className="rotate-1 rounded-lg bg-[#C6E86B] px-3 py-1 text-xs font-extrabold uppercase text-[#2A1D54] sm:text-sm"
              style={heading}
            >
              Open kitchen
            </span>
            <span
              className="-rotate-1 rounded-lg bg-[#FF8FD8] px-3 py-1 text-xs font-extrabold uppercase text-[#2A1D54] sm:text-sm"
              style={heading}
            >
              Raw bar
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{ ...heading, fontWeight: 800 }}
            className="mt-4 text-balance text-3xl leading-[1.05] text-ink sm:text-[2.6rem]"
          >
            A kitchen built around the morning's catch
          </motion.h2>

          {compact ? (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-6 max-w-md font-display text-lg italic leading-relaxed text-char/70"
            >
              Lina opened in 2016 with one idea: cook simply, cook honestly,
              and let good ingredients do most of the talking. Whole fish
              over an open flame, a raw bar built on the morning's catch,
              and a wine list chosen for the table, not the trend.
            </motion.p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-6 max-w-md space-y-5 text-[1.02rem] leading-relaxed text-char/70"
            >
              <p className="font-display text-lg italic text-char/80">
                Lina opened its doors in 2016 in a converted net-repair shed
                two blocks from the harbor, with a single wood-fired grill
                and a menu written fresh each morning.
              </p>
              <p>
                That habit never left. Our chefs still walk the docks before
                sunrise, and the kitchen still plans dinner service around
                what's actually good that day rather than what a laminated
                menu says it should be.
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-8"
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}