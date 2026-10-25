import { motion } from 'framer-motion'
import Menu from '../components/sections/Menu'

export default function MenuPage() {
  return (
    <>
      <section className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1800&auto=format&fit=crop"
          alt="Ingredients laid out before dinner service"
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
            Updated for tonight's service
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl text-parchment sm:text-5xl"
          >
            The Menu
          </motion.h1>
        </div>
      </section>

      <Menu />
    </>
  )
}
