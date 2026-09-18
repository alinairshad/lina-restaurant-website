import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Users, User, Mail, Phone, CheckCircle2 } from 'lucide-react'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'

const heading = { fontFamily: "'Baloo 2', sans-serif" }

// Icon color now responds to the wrapper's focus-within state, so the whole
// field (border + icon) lights up together when the user clicks in — not
// just a flat border-color swap.
const fieldBase =
  'w-full rounded-xl border-2 border-ink/15 bg-white px-4 py-3.5 pl-11 text-[0.95rem] text-char placeholder:text-char/40 outline-none transition-all duration-250 focus:border-gold focus:ring-4 focus:ring-gold/15'

function Field({ icon: Icon, ...props }) {
  return (
    <div className="group relative">
      <Icon
        size={17}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-char/40 transition-colors duration-250 group-focus-within:text-gold-dark"
      />
      <input className={fieldBase} {...props} />
    </div>
  )
}

const initialState = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
}

export default function Reservation({ compact = false }) {
  const [form, setForm] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    // Frontend-only demo: simulate a network round trip before confirming.
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 900)
  }

  const reset = () => {
    setForm(initialState)
    setSubmitted(false)
  }

  return (
    <section className={`relative overflow-hidden bg-parchment-dim ${compact ? 'py-20' : 'py-24 sm:py-32'}`}>
      <div className="container-page grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          {/* Sticker badge — matches the About / Location pattern so this section
              doesn't feel disconnected from the rest of the page. */}
          <span
            style={heading}
            className="-rotate-2 inline-block rounded-lg bg-[#F4633A] px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#FBF1E6] border-2 border-[#2A1D54] shadow-[2px_2px_0px_#2A1D54]"
          >
            Tables Fill Fast
          </span>

          <div className="mt-5">
            <SectionHeading
              kicker="Reservations"
              title={compact ? 'Save your table for tonight' : 'Book your evening at Lina'}
              description={
                !compact &&
                "We hold every table for a full seating — no rushing, no double-booking. Tell us when you'd like to come in and we'll confirm within the hour."
              }
            />
          </div>

          {!compact && (
            <div className="mt-10 space-y-4 border-t border-char/10 pt-8 text-sm text-char/70">
              <p>
                <span className="font-medium text-char">Parties of 8 or more —</span>{' '}
                email us directly for private dining and set menus.
              </p>
              <p>
                <span className="font-medium text-char">Walk-ins —</span>{' '}
                welcome at the raw bar, first come, first served.
              </p>
            </div>
          )}
        </div>

        <div className="relative rounded-[28px] border-[3px] border-[#2A1D54] bg-parchment p-7 shadow-[6px_6px_0px_#2A1D54] transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-[9px_9px_0px_#2A1D54] sm:p-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#2A1D54] bg-[#C6E86B] shadow-[3px_3px_0px_#2A1D54]">
                  <CheckCircle2 size={28} className="text-[#2A1D54]" strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display text-2xl text-ink">Request sent</h3>
                <p className="mt-2 max-w-xs text-sm text-char/60">
                  We'll confirm your table for {form.guests} at {form.time || 'your requested time'} by email shortly.
                </p>
                <button
                  onClick={reset}
                  className="mt-6 text-sm font-medium text-wine underline underline-offset-4"
                >
                  Make another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    icon={User}
                    type="text"
                    placeholder="Full name"
                    required
                    value={form.name}
                    onChange={update('name')}
                  />
                  <Field
                    icon={Phone}
                    type="tel"
                    placeholder="Phone number"
                    required
                    value={form.phone}
                    onChange={update('phone')}
                  />
                </div>

                <Field
                  icon={Mail}
                  type="email"
                  placeholder="Email address"
                  required
                  value={form.email}
                  onChange={update('email')}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <Field
                    icon={Calendar}
                    type="date"
                    required
                    value={form.date}
                    onChange={update('date')}
                  />
                  <Field
                    icon={Clock}
                    type="time"
                    required
                    value={form.time}
                    onChange={update('time')}
                  />
                  <div className="group relative">
                    <Users
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-char/40 transition-colors duration-250 group-focus-within:text-gold-dark"
                    />
                    <select
                      value={form.guests}
                      onChange={update('guests')}
                      className={`${fieldBase} appearance-none`}
                    >
                      {Array.from({ length: 8 }).map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1} {i === 0 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center"
                  disabled={submitting}
                >
                  {submitting ? 'Sending request…' : 'Request reservation'}
                </Button>

                <p className="text-center text-xs text-char/40">
                  This form is a design demo and doesn't send a live booking.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}