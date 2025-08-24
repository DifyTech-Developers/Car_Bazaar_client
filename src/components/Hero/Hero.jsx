"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./Hero.module.css"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleWhatsApp = () => {
    const phoneNumber = "917879740513"; // no + sign
    const message = `Hi, I'm interested in this vehicle`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroBackground}>
        <img
          src="Demo1.jpg?height=800&width=1200"
          alt="Luxury car background"
          className={styles.backgroundImage}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={`${styles.heroContent} ${isVisible ? styles.visible : ""}`}>
        <h1 className={styles.heroTitle}>Experience Luxury Redefined</h1>
        <p className={styles.heroSubtitle}>Discover the world's most exclusive collection of premium vehicles</p>
        <div className={styles.heroButtons}>
          <Link to="/collections" className={styles.primaryButton}>
            All Collections
          </Link>
          <button onClick={handleWhatsApp} className={styles.secondaryButton}>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  )
}
