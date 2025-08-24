"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Car Bazaar
        </Link>
        <div className={styles.navLinks}>
          <Link to={'/'} onClick={() => handleScrollToSection("home")} className={styles.navLink}>
            Home
          </Link>
          <Link to="/collections" className={styles.navLink}>
            Collections
          </Link>
        </div>
      </div>
    </nav>
  )
}
