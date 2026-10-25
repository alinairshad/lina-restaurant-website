import { motion } from 'framer-motion'
import Reservation from '../components/sections/Reservation'
import Contact from '../components/sections/Contact'

export default function ContactPage() {
  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-end overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1800&auto=format&fit=crop"
          alt="A table set for two near the window at Lina"
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
            We'll hold your table
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl text-parchment sm:text-5xl"
          >
            Reservations &amp; Contact
          </motion.h1>
        </div>
      </section>

      <Reservation />
      <Contact />
    </>
  )
}
