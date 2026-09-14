import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { menuCategories, menuItems } from '../../data/menu'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { ArrowRight } from 'lucide-react'

function MenuRow({ item }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group py-5"
    >
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-xl text-ink sm:text-[1.35rem]">
          {item.name}
          {item.tag && (
            <span className="ml-2.5 align-middle text-[0.65rem] font-body font-semibold uppercase tracking-wide2 text-wine">
              {item.tag}
            </span>
          )}
        </h3>
        <span className="flex-1 border-b border-dotted border-char/25 translate-y-[-4px]" />
        <span className="font-display text-lg text-ink">${item.price}</span>
      </div>
      <p className="mt-1.5 max-w-lg text-[0.95rem] leading-relaxed text-char/60">
        {item.description}
      </p>
    </motion.li>
  )
}

export default function Menu({ preview = false }) {
  const [active, setActive] = useState('Starters')
  const navigate = useNavigate()

  const items = useMemo(
    () => menuItems.filter((item) => item.category === active),
    [active]
  )

  const visibleItems = preview ? items.slice(0, 3) : items

  return (
    <section className="bg-ink bg-grain py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          kicker="The menu"
          title="Shaped by the tide, not the season"
          description="A living menu that shifts with the market. These are the dishes that rarely leave it."
          tone="light"
          align="center"
        />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative rounded-full px-5 py-2.5 text-sm tracking-wide transition-colors duration-300 ${
                active === cat ? 'text-ink' : 'text-parchment/60 hover:text-parchment'
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="menu-pill"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative">{cat}</span>
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-parchment px-7 py-3 shadow-soft sm:px-10">
          <ul className="divide-y divide-char/10">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item) => (
                <MenuRow key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </ul>
        </div>

        {preview && (
          <div className="mt-12 flex justify-center">
            <Button variant="outline" icon={ArrowRight} onClick={() => navigate('/menu')}>
              See the full menu
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
