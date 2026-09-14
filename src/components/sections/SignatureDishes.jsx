import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import ShapedVideoCard from '../ui/ShapedVideoCard'

const heading = { fontFamily: "'Baloo 2', sans-serif" }

const HERO_DISH = {
  image:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
  label: '01',
  
  badge: 'bg-[#F4633A] text-[#FBF1E6]',
  rotate: -1.5,
  tapeRotate: -6,
  name: 'Wood-Fired Branzino',
  description: 'Whole roasted, salsa verde, charred lemon, fennel.',
  price: 38,
  cta: 'FIRED TO ORDER',
  note: 'Best shared. Definitely worth the mess.',
}

const SIDE_DISHES = [
  {
    image:
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1600&auto=format&fit=crop',
    label: '02',
    tag: 'Kitchen favorite',
    badge: 'bg-[#C6E86B] text-[#2A1D54]',
    rotate: 2,
    tapeRotate: 4,
    name: 'Charred Octopus',
    description: 'Smoked paprika, crushed potato, salsa verde, lemon oil.',
    price: 19,
    cta: 'SEE THE DISH',
  },
  {
    image:
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1600&auto=format&fit=crop',
    label: '03',
    tag: 'After hours',
    badge: 'bg-[#FF8FD8] text-[#2A1D54]',
    rotate: -2.5,
    tapeRotate: -3,
    name: 'Smoked Rosemary Negroni',
    description: 'Gin, Campari, sweet vermouth, rosemary smoke.',
    price: 16,
    cta: 'SEE THE POUR',
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

function DishCard({ dish, featured = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ rotate: 0, y: -6 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ transform: `rotate(${dish.rotate}deg)` }}
      className={`group relative bg-parchment p-3 pb-4 shadow-card sm:p-3.5 ${
        featured ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
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
        className={`relative block overflow-hidden ${
          featured ? 'h-48 sm:h-56 lg:h-full lg:min-h-[220px]' : 'h-32 sm:h-36'
        }`}
      >
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[15%] transition-all duration-[900ms] ease-soft group-hover:grayscale-0 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="px-1 pt-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-wide2 text-wine">
          {dish.tag}
        </p>
        <h3
          style={heading}
          className={`mt-1 font-extrabold leading-tight text-ink ${featured ? 'text-xl sm:text-2xl' : 'text-lg'}`}
        >
          {dish.name}
        </h3>
        <p
          className={`mt-1.5 font-medium text-char/75 ${
            featured ? 'max-w-md text-[0.85rem] leading-relaxed' : 'text-[0.75rem] leading-snug'
          }`}
        >
          {dish.description}
        </p>
        {dish.note && (
          <p className="mt-2 font-display text-[0.82rem] italic text-char/55">{dish.note}</p>
        )}

        <div className="mt-3 flex items-baseline justify-between border-t border-char/15 pt-3">
          <span style={heading} className="text-lg font-extrabold text-wine">
            ${dish.price}
          </span>
          <Link
            to="/menu"
            className="group/link inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wide2 text-char/70 transition-colors hover:text-wine"
          >
            {dish.cta}
            <ArrowRight
              size={10}
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
            <p className="text-xs font-semibold uppercase tracking-wide2 text-wine">
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

          <div className="relative z-10 mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-12 lg:grid-cols-3 lg:gap-x-10">
            <DishCard dish={HERO_DISH} featured />
            {SIDE_DISHES.map((dish) => (
              <DishCard key={dish.name} dish={dish} />
            ))}
          </div>

          {/* Behind-the-flame box — clear gap above (mt-24) so it never touches
              the Branzino description; darker ink panel with a gold border and
              a soft radial glow behind the shaped video, plus a tape strip like
              the dish cards so it reads as part of the same visual family
              instead of a plain placeholder box. Shape size bumped up too. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto mt-24 max-w-4xl overflow-hidden rounded-[1.75rem] border border-gold/30 bg-ink px-6 py-12 shadow-soft sm:mt-28 sm:px-10 sm:py-14"
          >
            <TapeStrip rotate={-5} className="bg-parchment/80" />

            {/* faint warm glow behind the shape, echoes Hero's coastal tint */}
            <div className="pointer-events-none absolute -left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#F4633A]/20 blur-3xl sm:h-80 sm:w-80" />

            <div className="relative z-10 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-12">
              <ShapedVideoCard
                shape="burger"
                videoSrc="/videos/lina-dish.mp4"
                posterSrc="/images/lina-dish-poster.jpg"
                className="!w-64 drop-shadow-2xl sm:!w-72 lg:!w-80"
              />
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
            <Button variant="outlineDark" icon={ArrowRight} onClick={() => navigate('/menu')}>
              Come hungry
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}