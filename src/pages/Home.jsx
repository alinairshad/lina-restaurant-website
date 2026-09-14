import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import SignatureDishes from '../components/sections/SignatureDishes'
import Testimonials from '../components/sections/Testimonials'
import Location from '../components/sections/Location'
import Reservation from '../components/sections/Reservation'

export default function Home() {
  return (
    <>
      <Hero />
      <About compact />
      <SignatureDishes />
      <Testimonials />
      <Location />
      <Reservation compact />
    </>
  )
}