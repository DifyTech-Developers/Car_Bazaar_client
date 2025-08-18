"use client"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Mail } from "lucide-react"
import styles from "./CarDetailsModal.module.css"

export default function CarDetailsModal({ vehicle, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!vehicle) return null

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
  }

  const handleBookNow = () => {
    alert(`Booking request for ${vehicle.name} has been submitted!`)
  }

  const handleContact = () => {
    window.location.href = `mailto:info@luxdrive.com?subject=Inquiry about ${vehicle.name}&body=I'm interested in learning more about the ${vehicle.name}.`
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.modalContent}>
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img
                src={vehicle.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${vehicle.name} - Image ${currentImageIndex + 1}`}
                className={styles.mainImage}
              />

              {vehicle.images.length > 1 && (
                <>
                  <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevImage}>
                    <ChevronLeft size={20} />
                  </button>
                  <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextImage}>
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className={styles.imageIndicators}>
                {vehicle.images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ""}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {vehicle.images.length > 1 && (
              <div className={styles.thumbnails}>
                {vehicle.images.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ""}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.header}>
              <h2 className={styles.vehicleName}>{vehicle.name}</h2>
              <div className={styles.price}>{formatPrice(vehicle.price)}</div>
            </div>

            <div className={styles.basicInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Year:</span>
                <span className={styles.infoValue}>{vehicle.year}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Driven:</span>
                <span className={styles.infoValue}>{vehicle.driven}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Fuel Type:</span>
                <span className={styles.infoValue}>{vehicle.fuelType}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Transmission:</span>
                <span className={styles.infoValue}>{vehicle.transmission}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Ownership:</span>
                <span className={styles.infoValue}>{vehicle.ownership}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Color:</span>
                <span className={styles.infoValue}>{vehicle.color}</span>
              </div>
            </div>

            {vehicle.specs && (
              <div className={styles.specsSection}>
                <h3 className={styles.specsTitle}>Specifications</h3>
                <div className={styles.specsGrid}>
                  {Object.entries(vehicle.specs).map(([key, value]) => (
                    <div key={key} className={styles.specItem}>
                      <span className={styles.specLabel}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}:
                      </span>
                      <span className={styles.specValue}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.actions}>
              <button className={styles.bookButton} onClick={handleBookNow}>
                Book Now
              </button>
              <button className={styles.contactButton} onClick={handleContact}>
                <Mail size={18} />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
