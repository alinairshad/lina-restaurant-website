import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, ArrowUpRight, Navigation } from 'lucide-react'
import Button from '../ui/Button'
import Ornament from '../ui/Ornament'

const heading = { fontFamily: "'Baloo 2', sans-serif" }

const hours = [
  ['Tue – Thu', '5:30pm – 10:00pm'],
  ['Fri – Sat', '5:30pm – 11:00pm'],
  ['Sun', '5:00pm – 9:00pm'],
  ['Mon', 'Closed'],
]

function MapSketch() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" fill="none">
      <path
        d="M0,40 C60,70 90,10 150,30 C210,50 230,0 290,20 C330,34 360,20 400,35"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <path
        d="M0,180 C70,150 110,200 170,175 C230,150 260,195 330,170 C360,158 380,168 400,160"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <path
        d="M20,150 C60,120 90,140 130,110 C170,80 200,95 230,75"
        stroke="#12262B"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeDasharray="2 7"
        strokeLinecap="round"
      />
      <circle cx="230" cy="75" r="5" fill="#6B1E23" />
      <circle cx="230" cy="75" r="10" fill="#6B1E23" fillOpacity="0.18" />
      <circle cx="20" cy="150" r="3.5" fill="#12262B" fillOpacity="0.35" />
    </svg>
  )
}

export default function Location() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-parchment pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="container-page grid grid-cols-1 gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Sticker badges — matches the About section's "OPEN KITCHEN" / "RAW BAR" pattern,
              so Location no longer feels like the odd one out in the page rhythm. */}
          <div className="flex flex-wrap gap-2.5">
            <span
              style={heading}
              className="-rotate-2 inline-block rounded-lg bg-[#C6E86B] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#2A1D54] border-2 border-[#2A1D54] shadow-[2px_2px_0px_#2A1D54]"
            >
              Waterfront
            </span>
            <span
              style={heading}
              className="rotate-1 inline-block rounded-lg bg-[#FF8FD8] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#2A1D54] border-2 border-[#2A1D54] shadow-[2px_2px_0px_#2A1D54]"
            >
              Easy Parking
            </span>
          </div>

          <p className="mt-5 font-display text-lg italic text-wine">Find us</p>
          <h2 className="mt-2 text-balance text-4xl leading-[1.1] text-ink sm:text-5xl">
            Dockside District
          </h2>
          <p className="mt-5 flex items-start gap-2.5 text-[1.05rem] leading-relaxed text-char/70">
            <MapPin size={18} className="mt-1 shrink-0 text-wine" />
            214 Harbor Row, Dockside District
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              variant="primary"
              icon={ArrowUpRight}
              onClick={() =>
                window.open(
                  'https://www.google.com/maps/search/?api=1&query=214+Harbor+Row+Dockside+District',
                  '_blank',
                  'noreferrer'
                )
              }
            >
              Get directions
            </Button>
            <Button variant="outlineDark" onClick={() => navigate('/contact')}>
              Reserve a table
            </Button>
          </div>

          <div className="group mt-12 overflow-hidden rounded-2xl border border-char/10 bg-white transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-card">
            <div className="relative h-40 sm:h-48">
              <MapSketch />
              {/* Small sticker pin accent, echoes the Baloo 2 badge family without overwhelming the sketch */}
              <span
                style={heading}
                className="absolute right-4 top-4 -rotate-3 inline-flex items-center gap-1 rounded-lg bg-gold px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-ink border-2 border-[#2A1D54] shadow-[2px_2px_0px_#2A1D54] transition-transform duration-300 ease-soft group-hover:-translate-y-0.5"
              >
                <MapPin size={10} strokeWidth={2.5} />
                Lina
              </span>
            </div>
            <div className="flex items-center gap-2.5 border-t border-char/10 px-5 py-3.5 text-xs text-char/55">
              <Navigation size={13} className="text-wine" />
              5 minutes from the marina · street parking on Harbor Row
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-char/10 bg-white p-8 shadow-card transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-soft sm:p-10"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15">
                <Clock size={15} className="text-wine" />
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wide2">
                Opening hours
              </h3>
            </div>

            {/* Small sticker status chip — same family as the badges above, kept minimal here */}
            <span
              style={heading}
              className="rotate-1 inline-block rounded-lg bg-[#C6E86B] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#2A1D54] border-2 border-[#2A1D54] shadow-[2px_2px_0px_#2A1D54]"
            >
              Open tonight
            </span>
          </div>

          <ul className="mt-7 space-y-4">
            {hours.map(([day, time]) => (
              <li
                key={day}
                className="flex items-center justify-between border-b border-char/10 pb-4 text-sm text-char/65 last:border-0 last:pb-0"
              >
                <span>{day}</span>
                <span className="text-ink/90">{time}</span>
              </li>
            ))}
          </ul>
          <Ornament className="mt-8 h-3 w-16 text-gold/50" />
        </motion.div>
      </div>
    </section>
  )
}