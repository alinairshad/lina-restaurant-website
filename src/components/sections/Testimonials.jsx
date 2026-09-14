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
    <section className="relative overflow-hidden bg-ink bg-grain pt-24 pb-32 sm:pt-32 sm:pb-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#F4633A]/10 blur-3xl" />

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
            className="-rotate-2 inline-block rounded-lg bg-gold px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink"
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
          <Quote size={32} className="mx-auto mb-6 text-gold/50" strokeWidth={1.25} />

          <div className="relative min-h-[170px] sm:min-h-[130px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="text-balance font-display text-xl italic leading-relaxed text-parchment/95 sm:text-2xl">
                  "{current.quote}"
                </p>
                <div className="mt-7 flex flex-col items-center gap-2.5">
                  <RatingStars count={current.rating} />
                  <p className="text-sm">
                    <span className="font-semibold tracking-wide text-parchment">
                      {current.name}
                    </span>
                    <span className="mx-2 text-gold/50">·</span>
                    <span className="text-parchment/50">{current.role}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-center gap-5">
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