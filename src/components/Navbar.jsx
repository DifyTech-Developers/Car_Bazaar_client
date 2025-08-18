
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Car, Menu, X } from "lucide-react"
import '../styles/layout.css'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "Admin", href: "/admin" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
  ]

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo-wrapper">
          <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
            <Car className="icon" />
            <span>{"Luxury Motors"}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-desktop-nav">
          <ul className="navbar-desktop-nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className="navbar-desktop-nav-item">
                <Link to={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="navbar-mobile-menu-button-wrapper">
          <button
            className="navbar-mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay and Sidebar */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "" : "hidden"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          ref={mobileMenuRef}
          className={`mobile-menu-sidebar ${isMobileMenuOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-menu-close-button-wrapper">
            <button
              className="mobile-menu-close-button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <X className="icon" />
            </button>
          </div>
          <ul className="mobile-menu-list">
            {navLinks.map((link) => (
              <li key={link.name} className="mobile-menu-list-item">
                <Link to={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
