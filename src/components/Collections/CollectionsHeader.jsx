import { useEffect, useState } from "react"
import { Search, Filter, ChevronDown } from "lucide-react"
import styles from "./CollectionsHeader.module.css"
import { vehicleService } from "../../services/vehicleService"

export default function CollectionsHeader({ onSearch, onFilter, filters, searchTerm }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    make: "",
    year: "",
    priceRange: "",
    fuelType: "",
  })

  const makes = ["All", "Lamborghini", "Ferrari", "Porsche", "McLaren"]
  const years = ["All", "2023", "2022", "2021", "2020"]
  const priceRanges = ["All", "Under $200k", "$200k - $300k", "$300k - $400k", "Above $400k"]
  const fuelTypes = ["All", "Petrol", "Electric", "Hybrid"]

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value }
    setActiveFilters(newFilters)
    onFilter(newFilters)
  }


  const clearFilters = () => {
    const clearedFilters = {
      make: "",
      year: "",
      priceRange: "",
      fuelType: "",
    }
    setActiveFilters(clearedFilters)
    onFilter(clearedFilters)
  }

  return (
    <section className={styles.header}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Our Collection</h1>
          <p className={styles.subtitle}>Discover luxury vehicles that define excellence</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search vehicles..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className={styles.filterContainer}>
            <button
              className={`${styles.filterButton} ${isFilterOpen ? styles.active : ""}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} />
              Filters
              <ChevronDown className={`${styles.chevron} ${isFilterOpen ? styles.rotated : ""}`} size={16} />
            </button>

            {isFilterOpen && (
              <div className={styles.filterDropdown}>
                <div className={styles.filterGrid}>
                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Make</label>
                    <select
                      className={styles.filterSelect}
                      value={activeFilters.make}
                      onChange={(e) => handleFilterChange("make", e.target.value)}
                    >
                      {makes.map((make) => (
                        <option key={make} value={make === "All" ? "" : make}>
                          {make}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Year</label>
                    <select
                      className={styles.filterSelect}
                      value={activeFilters.year}
                      onChange={(e) => handleFilterChange("year", e.target.value)}
                    >
                      {years.map((year) => (
                        <option key={year} value={year === "All" ? "" : year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Price Range</label>
                    <select
                      className={styles.filterSelect}
                      value={activeFilters.priceRange}
                      onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                    >
                      {priceRanges.map((range) => (
                        <option key={range} value={range === "All" ? "" : range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Fuel Type</label>
                    <select
                      className={styles.filterSelect}
                      value={activeFilters.fuelType}
                      onChange={(e) => handleFilterChange("fuelType", e.target.value)}
                    >
                      {fuelTypes.map((type) => (
                        <option key={type} value={type === "All" ? "" : type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.filterActions}>
                  <button className={styles.clearButton} onClick={clearFilters}>
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
