import { Link } from 'react-router-dom'
import { Waves, Instagram, Facebook, MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'
import Ornament from '../ui/Ornament'

export default function Footer() {
  return (
    <footer className="bg-ink-dark bg-grain pt-24 text-parchment/80">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-y-14 gap-x-10 pb-16 md:grid-cols-[1.3fr_0.9fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 text-parchment">
              <Waves size={22} strokeWidth={1.75} className="text-gold" />
              <span className="font-display text-[1.5rem]">Lina</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-parchment/55">
              Coastal cooking over an open wood fire, built around whatever
              the market gives us that morning.
            </p>
            <div className="mt-7 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Lina on Instagram"
                className="group rounded-full border border-parchment/15 p-3 text-parchment/70 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold hover:-translate-y-0.5"
              >
                <Instagram size={17} strokeWidth={1.75} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Lina on Facebook"
                className="group rounded-full border border-parchment/15 p-3 text-parchment/70 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold hover:-translate-y-0.5"
              >
                <Facebook size={17} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-parchment/90">
              <span className="h-px w-4 bg-gold/60" />
              Explore
            </h4>
            <ul className="space-y-3.5 text-sm text-parchment/55">
              <li><Link to="/menu" className="transition-colors hover:text-gold">Menu</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-gold">Our story</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-gold">Reservations</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-gold">Private dining</Link></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-parchment/90">
              <span className="h-px w-4 bg-gold/60" />
              Hours
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2.5">
                <Clock size={14} className="mt-0.5 shrink-0 text-gold" />
                <div className="flex flex-col">
                  <span className="text-parchment/85">Tue – Thu</span>
                  <span className="text-parchment/50">5:30pm – 10pm</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={14} className="mt-0.5 shrink-0 text-gold/40" />
                <div className="flex flex-col">
                  <span className="text-parchment/85">Fri – Sat</span>
                  <span className="text-parchment/50">5:30pm – 11pm</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={14} className="mt-0.5 shrink-0 text-gold/40" />
                <div className="flex flex-col">
                  <span className="text-parchment/85">Sun</span>
                  <span className="text-parchment/50">5pm – 9pm · Closed Mon</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Find us */}
          <div>
            <h4 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-parchment/90">
              <span className="h-px w-4 bg-gold/60" />
              Find us
            </h4>
            <ul className="space-y-3.5 text-sm text-parchment/55">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
                <span>214 Harbor Row, Dockside District</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-gold" />
                <span>(555) 019-2847</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-gold" />
                <span>hello@lina-table.com</span>
              </li>
            </ul>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="group relative mt-6 flex h-28 w-full items-center justify-center overflow-hidden rounded-xl border border-parchment/10 bg-ink-light/40 transition-colors hover:border-gold/40"
            >
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(212,175,109,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,109,1) 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
              />
              <div className="relative flex flex-col items-center gap-1.5 text-parchment/45 transition-colors group-hover:text-gold">
                <Navigation size={16} strokeWidth={1.75} />
                <span className="text-[0.65rem] uppercase tracking-[0.2em]">
                  View on map
                </span>
              </div>
            </a>
          </div>
        </div>

        <Ornament className="h-4 w-full text-gold/25" />

        <p className="py-6 text-center text-[0.7rem] uppercase tracking-[0.3em] text-parchment/35">
          Coastal Table · Wood Fire · Good Company
        </p>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-parchment/10 py-7 text-xs text-parchment/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Lina. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <a href="/privacy" className="transition-colors hover:text-gold">Privacy</a>
            <span className="text-parchment/20">·</span>
            <a href="/accessibility" className="transition-colors hover:text-gold">Accessibility</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
