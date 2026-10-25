import { motion } from 'framer-motion'

export default function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className = '',
}) {
  const isCenter = align === 'center'
  const kickerColor = tone === 'dark' ? 'text-wine' : 'text-gold'
  const titleColor = tone === 'dark' ? 'text-ink' : 'text-parchment'
  const descColor = tone === 'dark' ? 'text-char/70' : 'text-parchment/70'

  return (
    <div className={`${isCenter ? 'mx-auto text-center' : ''} ${className}`}>
      {kicker && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mb-3 font-display text-lg italic ${kickerColor}`}
        >
          {kicker}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={`text-balance text-4xl leading-[1.1] sm:text-5xl ${titleColor}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mt-5 max-w-prose2 text-[1.05rem] leading-relaxed ${descColor} ${isCenter ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
