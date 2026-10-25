import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'

const heading = { fontFamily: "'Baloo 2', sans-serif" }

const links = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const handleReserve = () => {
    navigate('/contact')
  }

  return (
    // top-10 (40px) reduced to top-5 (20px) so the pill sits closer to the
    // very top of the viewport, giving the Hero content below it a bit
    // more breathing room.
    <header
      className={`fixed inset-x-0 top-5 z-50 px-4 transition-all duration-500 sm:px-6 ${
        scrolled || open ? 'py-3' : 'py-5'
      }`}
    >
      {/* Lina wordmark lives in the Hero section now, not here — nav is
          just links + reserve button. Falling letters/food icons removed
          from this area too, they only fall in the footer now. */}
      <nav
        className={`relative mx-auto flex max-w-3xl items-center justify-between gap-6 rounded-full border px-5 py-2.5 shadow-soft backdrop-blur-md transition-all duration-500 sm:gap-8 sm:px-6 ${
          scrolled || open
            ? 'border-white/10 bg-ink/95 shadow-card'
            : 'border-white/10 bg-ink/30'
        }`}
      >
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={heading}
              className={({ isActive }) =>
                `group relative pb-1 text-[0.92rem] font-bold uppercase tracking-wide transition-colors ${
                  isActive ? 'text-parchment' : 'text-parchment/75 hover:text-parchment'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 right-0 h-px origin-left bg-gold transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden shrink-0 md:block">
          <Button
            variant="primary"
            onClick={handleReserve}
            style={heading}
            className="!rounded-full !py-2.5 !px-6 !text-[0.85rem] !font-extrabold !uppercase !tracking-wide"
          >
            Reserve a table
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 text-parchment md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-3 max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-ink/95 shadow-soft backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-5 px-6 py-6">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  style={heading}
                  className={({ isActive }) =>
                    `text-lg font-bold uppercase tracking-wide ${
                      isActive ? 'text-gold' : 'text-parchment/85'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Button
                variant="primary"
                onClick={handleReserve}
                style={heading}
                className="!rounded-full mt-2 w-fit !font-extrabold !uppercase !tracking-wide"
              >
                Reserve a table
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
