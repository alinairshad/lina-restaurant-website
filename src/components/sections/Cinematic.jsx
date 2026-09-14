import { motion } from 'framer-motion'

// Reuses an image already present in the project (AboutPage hero) rather
// than introducing a new, unverified asset.
const CINEMATIC_IMAGE =
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2000&auto=format&fit=crop'

export default function Cinematic() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-ink sm:min-h-[80vh]">
      <div className="absolute inset-0">
        <img
          src={CINEMATIC_IMAGE}
          alt="The dining room at Lina, lit low before service"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />
      </div>

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-xs uppercase tracking-wide2 text-gold"
        >
          The open kitchen
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance font-display text-6xl leading-[0.95] text-parchment sm:text-7xl lg:text-8xl"
        >
          From fire
          <br />
          to table
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-8 max-w-md text-[1.05rem] leading-relaxed text-parchment/70"
        >
          Every dish leaves the same six feet of open flame it was cooked
          over. Nothing travels far to reach the table.
        </motion.p>
      </div>
    </section>
  )
}
