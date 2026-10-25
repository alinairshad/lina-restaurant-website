import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, MotionConfig } from 'framer-motion'
import { Instagram, Facebook, MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'
import Ornament from '../ui/Ornament'
import { FoodIcon } from './FallingElements'

// Baloo 2 forced via inline style so it always wins, regardless of whether
// the Tailwind arbitrary-value class (font-['Baloo_2']) is being picked up
// correctly in this build — the font itself IS loaded (navbar proves that),
// this just guarantees these specific elements use it.
const balooFont = { fontFamily: "'Baloo 2', sans-serif" }

// The falling "LINA" letters, plus a few food icons falling alongside them —
// all land on the SAME bottom baseline (with small variance) so it reads as
// one natural pile instead of a neat row. zIndex is set explicitly (not by
// array order) so the thin "I" always sits on top and never gets swallowed
// by "N" next to it.
const fallingItems = [
  { kind: 'letter', char: 'L', color: '#6EC3F0', size: 'text-8xl sm:text-9xl lg:text-[10rem]', bottom: '0%', left: '0%', rotate: -14, delay: 0, z: 2 },
  { kind: 'letter', char: 'N', color: '#FF4FA0', size: 'text-9xl sm:text-[10rem] lg:text-[13rem]', bottom: '2%', left: '14%', rotate: -6, delay: 0.36, z: 1 },
  { kind: 'letter', char: 'I', color: '#9B6FE0', size: 'text-7xl sm:text-8xl lg:text-[9rem]', bottom: '16%', left: '42%', rotate: 10, delay: 0.18, z: 4 },
  { kind: 'letter', char: 'A', color: '#6EC3F0', size: 'text-9xl sm:text-[11rem] lg:text-[14rem]', bottom: '4%', left: '56%', rotate: 14, delay: 0.54, z: 3 },
  { kind: 'food', food: 'tomato', px: 60, bottom: '32%', left: '4%', rotate: -18, delay: 0.7, z: 5 },
  { kind: 'food', food: 'cherry', px: 66, bottom: '36%', left: '36%', rotate: 16, delay: 0.85, z: 5 },
  { kind: 'food', food: 'leaf', px: 52, bottom: '48%', left: '66%', rotate: -10, delay: 1.0, z: 5 },
]

function FallingLina() {
  const containerRef = useRef(null)
  const [triggered, setTriggered] = useState(false)

  // Manual scroll-into-view detector instead of Framer Motion's
  // whileInView — this guarantees the fall only starts the moment the
  // visitor genuinely scrolls this section into view, once, ever.
  useEffect(() => {
    const el = containerRef.current
    if (!el || triggered) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [triggered])

  return (
    <div ref={containerRef} className="relative h-96 w-full sm:h-[28rem] lg:h-full lg:min-h-[480px]">
      {/* Faint ground line the pile appears to land on */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-parchment/10" />

      {/* reducedMotion="never" forces this animation to always play, even if
          the visitor's OS/browser has "reduce motion" turned on. */}
      <MotionConfig reducedMotion="never">
        {fallingItems.map((it) => (
          <motion.div
            key={it.kind === 'letter' ? it.char : it.food}
            initial={{ y: -260, opacity: 0, rotate: it.rotate * 2 }}
            animate={triggered ? { y: 0, opacity: 1, rotate: it.rotate } : undefined}
            transition={{ type: 'spring', bounce: 0.55, duration: 1.3, delay: it.delay }}
            style={{ bottom: it.bottom, left: it.left, zIndex: it.z }}
            className="absolute select-none drop-shadow-[6px_6px_0px_rgba(42,29,84,0.35)]"
          >
            {it.kind === 'letter' ? (
              <span
                style={{ ...balooFont, color: it.color, WebkitTextStroke: '3px #2A1D54' }}
                className={`font-extrabold uppercase leading-none ${it.size}`}
              >
                {it.char}
              </span>
            ) : (
              <FoodIcon type={it.food} size={it.px} />
            )}
          </motion.div>
        ))}
      </MotionConfig>
    </div>
  )
}

// Small Baloo 2 sticker badge — straight by default now (no rotation), same
// recipe used for the hero tags and other chips across the site otherwise.
function StickerLabel({ children, bg, rotate = 0 }) {
  return (
    <span
      className={`inline-block rounded-full border-[3px] border-[#2A1D54] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#2A1D54] shadow-[3px_3px_0px_#2A1D54] ${bg}`}
      style={{ ...balooFont, transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      {children}
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-x-hidden bg-ink-dark text-parchment/80">
      {/* Full food image across the whole footer, with a dark gradient on top
          so all the text and badges stay readable over it. */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/footer-food-bg.jpg')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-dark/75 via-ink-dark/88 to-ink-dark" />

      <div className="container-page relative z-10 pt-32 sm:pt-40">
        <div className="grid grid-cols-1 gap-y-14 gap-x-10 pb-16 lg:grid-cols-[1.5fr_1fr] lg:items-stretch">
          {/* Left side — all four info blocks compressed into a 2x2 grid */}
          <div className="grid grid-cols-1 gap-y-14 gap-x-10 sm:grid-cols-2">
            {/* Brand — icon/"lines" removed, wordmark now big, bold, capital */}
            <div>
              <Link to="/" className="inline-block text-parchment">
                <span className="font-display text-[2.75rem] font-bold uppercase leading-none tracking-wide sm:text-[3.25rem]">
                  Lina
                </span>
              </Link>
              <div className="mt-4">
                <StickerLabel bg="bg-gold">Coastal Table</StickerLabel>
              </div>
              <p className="mt-5 max-w-xs font-display text-[0.95rem] italic leading-relaxed text-parchment/60">
                Coastal cooking over an open wood fire, built around whatever
                the market gives us that morning.
              </p>
              <div className="mt-7 flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Lina on Instagram"
                  className="group rounded-full border border-parchment/15 p-3 text-parchment/70 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold hover:-translate-y-0.5"
                >
                  <Instagram size={17} strokeWidth={1.75} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Lina on Facebook"
                  className="group rounded-full border border-parchment/15 p-3 text-parchment/70 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold hover:-translate-y-0.5"
                >
                  <Facebook size={17} strokeWidth={1.75} />
                </a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="mb-6">
                <StickerLabel bg="bg-[#F4633A]">Explore</StickerLabel>
              </h4>
              <ul className="space-y-3.5 text-sm text-parchment/60">
                <li><Link to="/menu" className="transition-colors hover:text-gold">Menu</Link></li>
                <li><Link to="/about" className="transition-colors hover:text-gold">Our story</Link></li>
                <li><Link to="/contact" className="transition-colors hover:text-gold">Reservations</Link></li>
                <li><Link to="/contact" className="transition-colors hover:text-gold">Private dining</Link></li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="mb-6">
                <StickerLabel bg="bg-[#C6E86B]">Hours</StickerLabel>
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-2.5">
                  <Clock size={14} className="mt-0.5 shrink-0 text-gold" />
                  <div className="flex flex-col">
                    <span className="text-parchment/85">Tue – Thu</span>
                    <span className="text-parchment/50">5:30pm – 10pm</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock size={14} className="mt-0.5 shrink-0 text-gold/40" />
                  <div className="flex flex-col">
                    <span className="text-parchment/85">Fri – Sat</span>
                    <span className="text-parchment/50">5:30pm – 11pm</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock size={14} className="mt-0.5 shrink-0 text-gold/40" />
                  <div className="flex flex-col">
                    <span className="text-parchment/85">Sun</span>
                    <span className="text-parchment/50">5pm – 9pm · Closed Mon</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Find us */}
            <div>
              <h4 className="mb-6">
                <StickerLabel bg="bg-[#FF8FD8]">Find us</StickerLabel>
              </h4>
              <ul className="space-y-3.5 text-sm text-parchment/60">
                <li className="flex items-start gap-2.5">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
                  <span>214 Harbor Row, Dockside District</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={15} className="shrink-0 text-gold" />
                  <span>(555) 019-2847</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={15} className="shrink-0 text-gold" />
                  <span>hello@lina-table.com</span>
                </li>
              </ul>

              {/* Map preview — badge now sits OUTSIDE the clipped inner layer,
                  so it never gets cut off at the box edge like before. Only
                  the image itself is clipped to the rounded corners. */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="group relative mt-7 flex h-40 w-full items-center justify-center rounded-[20px] border-[3px] border-[#2A1D54] shadow-[5px_5px_0px_#2A1D54] transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-[17px] bg-ink-light/20 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/footer-map.jpg')" }}
                >
                  <div className="absolute inset-0 bg-ink-dark/35 transition-opacity group-hover:bg-ink-dark/15" />
                </div>
                <span
                  className="absolute -top-3 left-4 z-10 whitespace-nowrap rounded-full border-[3px] border-[#2A1D54] bg-[#C6E86B] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-[#2A1D54] shadow-[3px_3px_0px_#2A1D54]"
                  style={balooFont}
                >
                  Get Directions
                </span>
                <div className="relative z-10 flex flex-col items-center gap-1.5 text-parchment/80 transition-colors group-hover:text-gold">
                  <Navigation size={20} strokeWidth={1.75} />
                  <span className="text-[0.7rem] uppercase tracking-[0.2em]">
                    View on map
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right side — reserved space where LINA + food icons fall and pile up */}
          <FallingLina />
        </div>

        <Ornament className="h-4 w-full text-gold/25" />

        <p className="py-6 text-center text-[0.7rem] uppercase tracking-[0.3em] text-parchment/35">
          Coastal Table · Wood Fire · Good Company
        </p>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-parchment/10 py-7 text-xs text-parchment/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Lina. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <a href="/privacy" className="transition-colors hover:text-gold">Privacy</a>
            <span className="text-parchment/20">·</span>
            <a href="/accessibility" className="transition-colors hover:text-gold">Accessibility</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
