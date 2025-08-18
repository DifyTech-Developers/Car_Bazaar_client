
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import '../../styles/modals.css'

export default function CarDetailsModal({ car, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen || !car) return null

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">{car.name}</h2>
          <button onClick={onClose} className="modal-close-button" aria-label="Close">
            <X className="icon" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="car-details-modal-content">
          <div className="car-details-image-wrapper">
            <img
              src={car.images[currentImageIndex] || "/placeholder.svg?height=400&width=600&query=luxury%20car"}
              alt={`${car.name} image ${currentImageIndex + 1}`}
              fill
              className="car-details-image"
            />
            {car.images.length > 1 && (
              <>
                <button onClick={prevImage} className="car-details-nav-button left" aria-label="Previous image">
                  <ChevronLeft className="icon" />
                </button>
                <button onClick={nextImage} className="car-details-nav-button right" aria-label="Next image">
                  <ChevronRight className="icon" />
                </button>
              </>
            )}
          </div>

          <div>
            <p className="car-details-price">{car.price}</p>
            <h4 className="car-details-specs-heading">Specifications:</h4>
            <div className="car-details-specs-grid">
              {Object.entries(car.specs).map(([key, value]) => (
                <div key={key} className="car-details-spec-item">
                  <span className="label">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                  <span>{value}</span>
                </div>
              ))}
              <div className="car-details-spec-item">
                <span className="label">Make:</span>
                <span>{car.make}</span>
              </div>
              <div className="car-details-spec-item">
                <span className="label">Model:</span>
                <span>{car.model}</span>
              </div>
              <div className="car-details-spec-item">
                <span className="label">Year:</span>
                <span>{car.year}</span>
              </div>
              <div className="car-details-spec-item">
                <span className="label">Transmission:</span>
                <span>{car.transmission}</span>
              </div>
              <div className="car-details-spec-item">
                <span className="label">Fuel Type:</span>
                <span>{car.fuelType}</span>
              </div>
              <div className="car-details-spec-item">
                <span className="label">Color:</span>
                <span>{car.color}</span>
              </div>
            </div>

            <div className="car-details-actions">
              <button className="car-details-button primary">Book Now</button>
              <button className="car-details-button secondary">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
