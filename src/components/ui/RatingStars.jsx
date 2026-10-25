import { Star } from 'lucide-react'

export default function RatingStars({ count = 5, className = '' }) {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className={i < count ? 'fill-gold text-gold' : 'text-parchment-deep/50'}
        />
      ))}
    </div>
  )
}
