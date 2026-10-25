import { motion } from 'framer-motion'
import { galleryImages } from '../../data/gallery'
import SectionHeading from '../ui/SectionHeading'

export default function Gallery() {
  return (
    <section className="bg-parchment py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          kicker="Ambience"
          title="An evening at Lina"
          description="Low light, close tables, the smell of woodsmoke drifting out from the open kitchen."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:auto-rows-[220px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className={`group relative overflow-hidden rounded-xl ${img.span || ''} ${
                i === 0 || i === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full min-h-[160px] object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
