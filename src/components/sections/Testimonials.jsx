import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import RatingStars from '../ui/RatingStars'

const heading = { fontFamily: "'Baloo 2', sans-serif" }

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const go = (dir) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]

  return (
    <section className="group relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40">
      {/* Background video — ambient dining/restaurant footage instead of a flat ink color */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/testimonials-ambience.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay so the white quote card and headings stay readable over the video */}
      <div className="absolute inset-0 bg-ink/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />

      {/* Ambient glow — intensifies on hover so the section feels alive without being loud */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#F4633A]/10 blur-3xl opacity-60 transition-opacity duration-700 ease-soft group-hover:opacity-100" />

      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <span
            style={heading}
            className="-rotate-2 inline-block rounded-lg bg-gold px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink border-2 border-[#2A1D54]"
          >
            Guests
          </span>
          <h2
            style={heading}
            className="mt-4 text-3xl font-extrabold uppercase leading-[0.95] text-parchment sm:text-4xl"
          >
            Words From the Table
          </h2>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-xl">
          <div className="relative min-h-[320px] sm:min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="
                  relative rounded-[28px] border-[3px] border-[#2A1D54] bg-[#FBF1E6]
                  px-6 py-9 sm:px-10 sm:py-11
                  shadow-[6px_6px_0px_#2A1D54]
                  transition-all duration-300 ease-soft
                  hover:-translate-y-1 hover:shadow-[9px_9px_0px_#2A1D54]
                "
              >
                {/* Quote mark chip — small colorful sticker accent, same family as the Hero badges */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF8FD8] border-2 border-[#2A1D54] shadow-[2px_2px_0px_#2A1D54]">
                  <Quote size={16} className="text-[#2A1D54]" strokeWidth={2.5} />
                </span>

                <p
                  style={heading}
                  className="mt-2 text-balance text-center text-lg sm:text-xl font-extrabold leading-snug text-[#2A1D54]"
                >
                  "{current.quote}"
                </p>

                <div className="mt-7 flex flex-col items-center gap-3">
                  <RatingStars count={current.rating} />

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span
                      style={heading}
                      className="-rotate-1 inline-block rounded-lg bg-[#C6E86B] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#2A1D54] border-2 border-[#2A1D54]"
                    >
                      {current.name}
                    </span>
                    <span
                      style={heading}
                      className="rotate-1 inline-block rounded-lg bg-[#F4633A] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#FBF1E6] border-2 border-[#2A1D54]"
                    >
                      {current.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="text-parchment/40 transition-colors hover:text-gold"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === index ? 'w-5 bg-gold' : 'w-1 bg-parchment/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="text-parchment/40 transition-colors hover:text-gold"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}