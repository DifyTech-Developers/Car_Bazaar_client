import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './CarDetailsPage.module.css';

const CarDetailsPage = () => {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const { state } = useLocation();
  const car = state?.vehicle || {

  };



  const handleWhatsApp = () => {
    const phoneNumber = "917879740513"; // no + sign
    const message = `Hi, I'm interested in ${car.name}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  const handleBookNow = (car) => {
    const phoneNumber = "917879740513"; // no + sign
    const message = `Hi, I'm interested in ${car.name}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.content}>
        {/* Image Gallery */}
        <div className={styles.imageGallery}>
          <img
            src={car.imageUrls[selectedImageIndex]?.url}
            alt={`${car.make} ${car.model}`}
            className={styles.mainImage}
          />
          <div className={styles.thumbnails}>
            {car.imageUrls.map((image, index) => (
              <img
                key={image.publicId}
                src={image.url}
                alt={`${car.make} ${car.model} view ${index + 1}`}
                className={`${styles.thumbnail} ${selectedImageIndex === index ? styles.active : ''}`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Car Details */}
        <div className={styles.details}>
          <h1 className={styles.title}>{car.make} {car.model}</h1>
          <div className={styles.price}>
            {`₹${car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </div>

          <div className={styles.specifications}>
            <div className={styles.specItem}>
              <span className={styles.label}>Year</span>
              <span className={styles.value}>{car.year}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.label}>Driven</span>
              <span className={styles.value}>{car.drivens}k kms</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.label}>Ownership</span>
              <span className={styles.value}>{car.ownership}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.label}>Registration</span>
              <span className={styles.value}>{car.registration}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.label}>Transmission</span>
              <span className={styles.value}>{car.transmission}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.label}>Fuel Type</span>
              <span className={styles.value}>{car.fuelType}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.label}>Color</span>
              <span className={styles.value}>{car.color}</span>
            </div>

          </div>

          <div className={styles.description}>
            <h2>Description</h2>
            <p>{car.description}</p>
          </div>

          {/* <div className={styles.features}>
            <h2>Features</h2>
            <div className={styles.featuresList}>
              {car.features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  {feature}
                </div>
              ))}
            </div>
          </div> */}



          {/* Action Buttons */}
          <div className={styles.actions}>
            <button
              className={`${styles.button} ${styles.whatsappButton}`}
              onClick={handleWhatsApp}
            >
              WhatsApp Inquiry
            </button>
            <button
              className={`${styles.button} ${styles.bookButton}`}
              onClick={handleBookNow}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
