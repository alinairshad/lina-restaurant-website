import { motion, useReducedMotion } from 'framer-motion'
import About from '../components/sections/About'
import Gallery from '../components/sections/Gallery'
import SectionHeading from '../components/ui/SectionHeading'

const team = [
  {
    name: 'Renata Salas',
    role: 'Executive Chef',
    img: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Idris Bello',
    role: 'Head of Wine',
    img: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Wren Castillo',
    role: 'General Manager',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
  },
]

// Full class strings (not built dynamically) so Tailwind's JIT picks them up.
const CARD_TILTS = ['-rotate-1', 'rotate-1', '-rotate-1']
const BADGE_TILTS = ['rotate-1', '-rotate-2', 'rotate-2']
const BADGE_COLORS = ['bg-[#C6E86B]', 'bg-[#FF8FD8]', 'bg-[#F4633A]'] // lime, pink, orange

export default function AboutPage() {
  const reduceMotion = useReducedMotion()
  const offsetY = reduceMotion ? 0 : 30

  return (
    <>
      <section className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1800&auto=format&fit=crop"
          alt="The Lina dining room, empty before service"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div className="container-page relative z-10 pb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 font-display text-lg italic text-gold"
          >
            Since 2016
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl text-parchment sm:text-5xl"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      <About />

      <section className="bg-ink bg-grain py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            kicker="The people"
            title="Who's in the kitchen tonight"
            tone="light"
            align="center"
          />

          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-3">
            {team.map((person, i) => (
              // Outer wrapper handles the scroll reveal. Rotation lives on the
              // inner card so Framer Motion's inline transform can't override it.
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: offsetY }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: reduceMotion ? 0 : i * 0.08 }}
                className="mx-auto w-full max-w-xs"
              >
                <article
                  className={`group relative ${CARD_TILTS[i % 3]} rounded-2xl border-[3px] border-[#2A1D54] bg-parchment text-center shadow-[6px_6px_0_0_#2A1D54] transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:rotate-0 hover:shadow-[2px_2px_0_0_#2A1D54]`}
                >
                  {/* Tape strip on some cards */}
                  {i % 2 === 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-3 border-2 border-[#2A1D54]/20 bg-gold/80"
                    />
                  )}

                  {/* Photo + role sticker hanging off its bottom edge */}
                  <div className="relative">
                    <div className="overflow-hidden rounded-t-[13px] border-b-[3px] border-[#2A1D54]">
                      <img
                        src={person.img}
                        alt={person.name}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span
                      className={`absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 ${BADGE_TILTS[i % 3]} whitespace-nowrap rounded-lg border-2 border-[#2A1D54] ${BADGE_COLORS[i % 3]} px-3 py-1 text-xs font-extrabold uppercase text-[#2A1D54]`}
                    >
                      {person.role}
                    </span>
                  </div>

                  <h3 className="px-4 pb-6 pt-8 font-display text-2xl font-extrabold uppercase leading-none tracking-tight text-ink">
                    {person.name}
                  </h3>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Gallery />
    </>
  )
}