import { useState, useEffect } from "react"
import CarCard from "../CarCard/CarCard"
import styles from "./LatestCollection.module.css"
import { vehicleService } from "../../services/vehicleService"
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

export default function LatestCollection() {
  const [isVisible, setIsVisible] = useState(false)

  // ✅ Fetch vehicles with React Query
  const {
    data: allVehicles = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: vehicleService.getAllVehicles,
  })

  // ✅ Latest 4 vehicles
  const latestVehicles = allVehicles.slice(0, 4)

  // ✅ Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById("latest-collection")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  // ✅ Error toast
  useEffect(() => {
    if (isError) {
      toast.error(error.message || "Failed to fetch vehicles")
    }
  }, [isError, error])

  return (
    <section id="latest-collection" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.title}>Latest Collection</h2>
          <p className={styles.subtitle}>
            Discover our newest additions to the luxury fleet
          </p>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.visible : ""}`}>
          {isLoading ? (
            <center>Loading vehicles...</center>
          ) : latestVehicles.length > 0 ? (
            latestVehicles.map((vehicle, index) => (
              <div
                key={vehicle._id || vehicle.id}
                className={styles.cardWrapper}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CarCard vehicle={vehicle} />
              </div>
            ))
          ) : (
            <center>No Vehicles are listed</center>
          )}
        </div>
      </div>
    </section>
  )
}
