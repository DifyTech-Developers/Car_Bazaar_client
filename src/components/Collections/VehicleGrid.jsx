import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import CarCard from "../CarCard/CarCard"
import CollectionsHeader from "./CollectionsHeader"
import styles from "./VehicleGrid.module.css"
import toast from "react-hot-toast"
import { vehicleService } from "../../services/vehicleService"

export default function VehicleGrid() {
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    make: "",
    year: "",
    priceRange: "",
    fuelType: "",
  })
  const [isVisible, setIsVisible] = useState(false)

  const {
    data: vehicles = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: vehicleService.getAllVehicles,
  })

  useEffect(() => {
    if (isError) {
      toast.error(error.message || "Failed to fetch vehicles")
    }
  }, [isError, error])

  useEffect(() => {
    setIsVisible(true)

    let filtered = vehicles

    if (searchTerm) {
      filtered = filtered.filter(
        (vehicle) =>
          vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filters.make) {
      filtered = filtered.filter((vehicle) => vehicle.make === filters.make)
    }

    if (filters.year) {
      filtered = filtered.filter(
        (vehicle) => vehicle.year.toString() === filters.year
      )
    }

    if (filters.priceRange) {
      filtered = filtered.filter((vehicle) => {
        const price = vehicle.price
        switch (filters.priceRange) {
          case "Under $200k":
            return price < 200000
          case "$200k - $300k":
            return price >= 200000 && price <= 300000
          case "$300k - $400k":
            return price >= 300000 && price <= 400000
          case "Above $400k":
            return price > 400000
          default:
            return true
        }
      })
    }

    if (filters.fuelType) {
      filtered = filtered.filter(
        (vehicle) => vehicle.fuelType === filters.fuelType
      )
    }

    setFilteredVehicles(filtered)
  }, [vehicles, searchTerm, filters])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleFilter = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <>
      <CollectionsHeader
        onSearch={handleSearch}
        onFilter={handleFilter}
        filters={filters}
        searchTerm={searchTerm}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.resultsHeader}>
            <p className={styles.resultsCount}>
              {filteredVehicles.length} vehicle
              {filteredVehicles.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* ✅ Loading State */}
          {isLoading ? (
            <div className={styles.loading}>Loading vehicles...</div>
          ) : filteredVehicles.length > 0 ? (
            <div
              className={`${styles.grid} ${isVisible ? styles.visible : ""}`}
            >
              {filteredVehicles.map((vehicle, index) => (
                <div
                  key={vehicle.id}
                  className={styles.cardWrapper}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CarCard vehicle={vehicle} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <h3 className={styles.noResultsTitle}>No vehicles found</h3>
              <p className={styles.noResultsText}>
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
