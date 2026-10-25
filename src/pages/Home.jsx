import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import FoodMarquee from '../components/sections/FoodMarquee'
import SignatureDishes from '../components/sections/SignatureDishes'
import Testimonials from '../components/sections/Testimonials'
import Location from '../components/sections/Location'
import Reservation from '../components/sections/Reservation'

export default function Home() {
  return (
    <>
      <Hero />
      <About compact />
      <FoodMarquee />
      <SignatureDishes />
      <Testimonials />
      <Location />
      <Reservation compact />
    </>
  )
}