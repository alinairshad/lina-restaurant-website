import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-gold text-ink hover:bg-gold-light',
  outline: 'border border-parchment/40 text-parchment hover:border-gold hover:bg-gold/10 hover:text-gold',
  outlineDark: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/5',
  ghost: 'text-ink hover:text-wine',
}

export default function Button({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  icon: Icon,
  ...props
}) {
  const Comp = motion[as] || motion.button

  return (
    <Comp
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[0.94rem] font-medium tracking-[0.01em] transition-colors duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {Icon && (
        <Icon
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </Comp>
  )
}
