import Navbar from "../components/Navbar/Navbar"
import Hero from "../components/Hero/Hero"
import LatestCollection from "../components/LatestCollection/LatestCollection"
import AboutUs from "../components/AboutUs/AboutUs"
import Footer from "../components/Footer/Footer"
import ScrollToTop from "../components/ScrollToTop/ScrollToTop"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LatestCollection />
      <AboutUs />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
