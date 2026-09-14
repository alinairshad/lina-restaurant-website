import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import Ornament from '../ui/Ornament'

const details = [
  {
    icon: MapPin,
    label: 'Find us',
    value: '214 Harbor Row, Dockside District',
    action: {
      label: 'Get directions',
      href: 'https://www.google.com/maps/search/?api=1&query=214+Harbor+Row+Dockside+District',
    },
  },
  { icon: Phone, label: 'Call ahead', value: '(555) 019-2847' },
  { icon: Mail, label: 'Write to us', value: 'hello@lina-table.com' },
  { icon: Clock, label: 'Open tonight', value: '5:30pm - 10pm' },
]

export default function Contact() {
  return (
    <section className="relative overflow-hidden bg-parchment py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <SectionHeading
            kicker="Say hello"
            title="Come find us at the harbor"
            description="No call center, no chatbot - just the people who'll be seating you tonight."
          />

          <ul className="mt-10 divide-y divide-char/10 border-t border-char/10">
            {details.map((d, i) => (
              <motion.li
                key={d.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group flex items-center gap-4 py-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-char/15 text-wine">
                  <d.icon size={17} strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-wide2 text-char/45">
                    {d.label}
                  </p>
                  <p className="mt-0.5 truncate text-[0.98rem] text-char">{d.value}</p>
                </div>
                {d.action && (
                  <a
                    href={d.action.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden shrink-0 items-center gap-1 text-xs font-semibold uppercase tracking-wide2 text-wine transition-colors hover:text-ink sm:flex"
                  >
                    {d.action.label}
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, rotate: -1 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink bg-grain shadow-card"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 25% 25%, rgba(200,155,60,0.16), transparent 55%), radial-gradient(ellipse at 80% 75%, rgba(200,155,60,0.12), transparent 55%)',
            }}
          />
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="-rotate-2 rounded-lg bg-gold px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide2 text-ink">
              Dockside District
            </span>
            <p className="font-display text-2xl italic leading-snug text-parchment">
              Harbor Row, third door past the fish market
            </p>
            <Ornament className="h-3 w-16 text-gold/50" />
            <Button
              variant="outline"
              icon={ArrowUpRight}
              className="!border-parchment/40 !text-parchment hover:!border-parchment hover:!bg-parchment/10"
              onClick={() =>
                window.open(
                  'https://www.google.com/maps/search/?api=1&query=214+Harbor+Row+Dockside+District',
                  '_blank',
                  'noreferrer'
                )
              }
            >
              Get directions
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
