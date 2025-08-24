import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CarCard.module.css";

export default function CarCard({ vehicle }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const formatKms = (kms) => {
    return `${kms}kms`;
  };

  const handleCardClick = () => {
    navigate(`/car`, {
      state: {
        vehicle
      }
    });
  };


  return (
    <div
      className={`${styles.card} ${isHovered ? styles.hovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className={styles.imageContainer}>
        <img
          src={vehicle.imageUrls[0]?.url || "/placeholder.svg"}
          alt={`${vehicle.make} ${vehicle.model}`}
          className={styles.image}
        />
        <div className={styles.imageOverlay}>
          <div className={styles.quickInfo}>
            <span>{vehicle.fuelType}</span>
            <span>{vehicle.transmission}</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <h3 className={styles.name}>{vehicle.make} {vehicle.model}</h3>
          <div className={styles.price}>{formatPrice(vehicle.price)}</div>
        </div>

        <div className={styles.details}>
          <div className={styles.specRow}>
            <span className={styles.year}>{vehicle.year}</span>
            <span className={styles.bullet}>•</span>
            <span className={styles.driven}>{formatKms(vehicle.drivens)}</span>
          </div>
          <div className={styles.ownership}>{vehicle.ownership}</div>
        </div>
      </div>
    </div>
  );
}
