import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

const heading = { fontFamily: "'Baloo 2', sans-serif" }

const DISHES = [
  {
    video: '/videos/dish-overview.mp4',
    poster:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
    label: '01',
    tag: 'The experience',
    badge: 'bg-[#F4633A] text-[#FBF1E6]',
    rotate: -1.25,
    tapeRotate: -6,
    name: 'A Taste of Lina',
    description:
      'Wood-fired mains, a raw bar built on the morning\u2019s catch, and cocktails poured tableside.',
    cta: 'EXPLORE THE MENU',
  },
  {
    video: '/videos/dish-biryani.mp4',
    poster:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1600&auto=format&fit=crop',
    label: '02',
    tag: 'Kitchen favorite',
    badge: 'bg-[#C6E86B] text-[#2A1D54]',
    rotate: 1.25,
    tapeRotate: 4,
    name: 'Smoked Chicken Biryani',
    description: 'Basmati, charred onions, saffron, smoked chicken, mint yogurt.',
    price: 22,
    cta: 'SEE THE DISH',
  },
  {
    video: '/videos/dish-pasta.mp4',
    poster:
      'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?q=80&w=1600&auto=format&fit=crop',
    label: '03',
    tag: 'Fired to order',
    badge: 'bg-[#FF8FD8] text-[#2A1D54]',
    rotate: -1.25,
    tapeRotate: -3,
    name: 'Charred Tomato Pasta',
    description: 'Hand-rolled pasta, charred tomato, basil oil, aged parmesan.',
    price: 24,
    cta: 'SEE THE DISH',
  },
]

function TapeStrip({ rotate = -4, className = '' }) {
  return (
    <span
      style={{ transform: `translateX(-50%) rotate(${rotate}deg)` }}
      className={`pointer-events-none absolute -top-3 left-1/2 h-6 w-16 rounded-[2px] bg-[#FBF1E6]/75 shadow-sm ${className}`}
    />
  )
}

function DishCard({ dish }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ rotate: 0, y: -6 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ transform: `rotate(${dish.rotate}deg)` }}
      className="group relative flex h-full flex-col bg-parchment p-3 pb-4 shadow-card sm:p-3.5"
    >
      <TapeStrip rotate={dish.tapeRotate} />

      <span
        style={heading}
        className={`absolute -left-2.5 -top-2.5 z-10 -rotate-6 rounded-md px-2 py-1 text-xs font-extrabold ${dish.badge}`}
      >
        {dish.label}
      </span>

      <Link
        to="/menu"
        className="relative block aspect-[4/3] overflow-hidden rounded-[2px]"
      >
        <video
          src={dish.video}
          poster={dish.poster}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-soft group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <span
          style={heading}
          className="-rotate-1 inline-block w-fit rounded-md bg-gold/20 px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-wide text-wine"
        >
          {dish.tag}
        </span>
        <h3
          style={heading}
          className="mt-2.5 text-xl font-extrabold leading-tight text-ink sm:text-2xl"
        >
          {dish.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.85rem] leading-relaxed text-char/70">
          {dish.description}
        </p>

        <div className="mt-4 flex flex-1 items-end justify-between border-t border-char/15 pt-3.5">
          {dish.price != null ? (
            <span
              style={heading}
              className="rounded-md bg-wine/10 px-2.5 py-1 text-base font-extrabold text-wine"
            >
              ${dish.price}
            </span>
          ) : (
            <span />
          )}
          <Link
            to="/menu"
            className="group/link inline-flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-wide2 text-char/70 transition-colors hover:text-wine"
          >
            {dish.cta}
            <ArrowRight
              size={11}
              className="transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function SignatureDishes() {
  const navigate = useNavigate()

  return (
    <section className="bg-parchment py-20 sm:py-28">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] border border-char/10 bg-white px-6 py-14 shadow-soft sm:px-10 sm:py-16 lg:px-14"
        >
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            {/* "House favorites" now uses the Hero's bold Baloo 2 wordmark
                voice instead of thin tracked caps — bigger, chunkier,
                extrabold, matching the big "LINA" weight/feel at kicker
                scale. */}
            <p
              style={heading}
              className="text-base font-extrabold uppercase tracking-wide text-wine sm:text-lg"
            >
              House favorites
            </p>
            <h2
              style={heading}
              className="mt-3 text-4xl font-extrabold uppercase leading-[0.95] text-ink sm:text-5xl"
            >
              Some dishes just belong here.
            </h2>
            <p className="mt-4 text-base text-char/60">
              Some things change with the season. These earned their place.
            </p>
          </div>

          <div className="relative z-10 mx-auto mt-10 grid max-w-5xl grid-cols-1 items-stretch gap-x-8 gap-y-14 sm:mt-12 sm:grid-cols-3">
            {DISHES.map((dish) => (
              <DishCard key={dish.name} dish={dish} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto mt-24 max-w-4xl overflow-hidden rounded-[1.75rem] border border-gold/40 bg-ink px-6 py-12 shadow-soft sm:mt-28 sm:px-10 sm:py-14"
          >
            <TapeStrip rotate={-5} className="bg-parchment/90" />
            <div className="pointer-events-none absolute -left-16 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-[#F4633A]/10 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-14">
              <div className="rounded-2xl bg-parchment p-2 shadow-card sm:p-2.5">
                <video
                  src="/videos/lina-dish.mp4"
                  poster="/images/lina-dish-poster.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-56 w-72 rounded-xl object-cover sm:h-64 sm:w-80"
                />
              </div>
              <div className="max-w-xs text-center sm:text-left">
                <span
                  style={heading}
                  className="-rotate-1 inline-block rounded-lg bg-gold px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-ink"
                >
                  Behind the flame
                </span>
                <h3
                  style={heading}
                  className="mt-3 text-2xl font-extrabold uppercase leading-[0.95] text-parchment sm:text-3xl"
                >
                  Watch it come together.
                </h3>
                <p className="mt-3 text-sm text-parchment/70">
                  A quick look at the grill, plated the way it leaves our kitchen.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="relative z-10 mt-12 flex flex-col items-center sm:mt-14">
            <Button
              variant="outlineDark"
              icon={ArrowRight}
              onClick={() => navigate('/menu')}
              style={heading}
              whileHover={{ x: 3, y: 3, rotate: 0 }}
              whileTap={{ x: 4, y: 4, scale: 0.98 }}
              className="-rotate-1 !rounded-xl !border-[3px] !border-[#2A1D54] !text-[0.85rem] !font-extrabold !uppercase !tracking-wide !shadow-[4px_4px_0_0_#2A1D54] transition-shadow duration-200 hover:!shadow-[1px_1px_0_0_#2A1D54]"
            >
              Come hungry
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}