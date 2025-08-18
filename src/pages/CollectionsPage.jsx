import Navbar from "../components/Navbar/Navbar"
import VehicleGrid from "../components/Collections/VehicleGrid"
import Footer from "../components/Footer/Footer"
import ScrollToTop from "../components/ScrollToTop/ScrollToTop"

export default function CollectionsPage() {
  return (
    <main>
      <Navbar />
      <VehicleGrid />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
