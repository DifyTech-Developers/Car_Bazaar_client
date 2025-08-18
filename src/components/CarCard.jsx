
import '../styles/components.css'
export default function CarCard({ car, onClick }) {
  return (
    <div className="car-card" onClick={onClick}>
      <div className="car-card-image-wrapper">
        <img
          src={car.image || "/placeholder.svg?height=400&width=600&query=luxury%20car"}
          alt={`${car.make} ${car.model}`}
          fill
          className="car-card-image"
        />
      </div>
      <div className="car-card-content">
        <h3 className="car-card-name">{car.name}</h3>
        <p className="car-card-details">
          {car.make} {car.model} ({car.year})
        </p>
        <div className="car-card-footer">
          <span className="car-card-price">{car.price}</span>
        </div>
      </div>
    </div>
  )
}