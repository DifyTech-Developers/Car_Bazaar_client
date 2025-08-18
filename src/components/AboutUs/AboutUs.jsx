"use client"
import { useState, useEffect } from "react"
import styles from "./AboutUs.module.css"

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const section = document.getElementById("about")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.imageContainer} ${isVisible ? styles.visible : ""}`}>
            <img src="/Hero.jpg?height=500&width=600" alt="Luxury car showroom" className={styles.image} />
          </div>

          <div className={`${styles.textContainer} ${isVisible ? styles.visible : ""}`}>
            <h2 className={styles.title}>About LuxDrive</h2>
            <p className={styles.description}>
              For over two decades, LuxDrive has been the premier destination for luxury automotive excellence. We
              curate an exclusive collection of the world's finest vehicles, ensuring each car meets our uncompromising
              standards of quality, performance, and prestige.
            </p>
            <p className={styles.description}>
              Our commitment extends beyond sales to provide a complete luxury experience. From personalized
              consultations to comprehensive after-sales service, we ensure every client receives the attention and
              expertise they deserve.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>500+</div>
                <div className={styles.statLabel}>Luxury Vehicles</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>20+</div>
                <div className={styles.statLabel}>Years Experience</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>1000+</div>
                <div className={styles.statLabel}>Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
