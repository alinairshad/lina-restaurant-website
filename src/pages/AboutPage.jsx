import { motion } from 'framer-motion'
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

export default function AboutPage() {
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

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {team.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="mx-auto h-64 w-full max-w-[220px] overflow-hidden rounded-xl">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl text-parchment">{person.name}</h3>
                <p className="mt-1 text-sm text-gold/80">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Gallery />
    </>
  )
}
