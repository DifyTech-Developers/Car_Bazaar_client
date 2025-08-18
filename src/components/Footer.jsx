import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Car } from "lucide-react"
import '../styles/layout.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            <Car className="icon" />
            <span>{"Luxury Motors"}</span>
          </Link>
          <p className="footer-description">
            Your premier destination for exquisite luxury automobiles. Experience unparalleled elegance and performance.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">About</h3>
          <ul className="footer-list">
            <li>
              <Link to="#" className="footer-link">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Team
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-list">
            <li>
              <Link to="/collections" className="footer-link">
                View Collections
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Financing
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Service
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-list">
            <li>123 Luxury Lane, Beverly Hills, CA 90210</li>
            <li>info@luxurymotors.com</li>
            <li>+1 (555) 123-4567</li>
          </ul>
          <div className="footer-social-links">
            <Link to="#" aria-label="Facebook" className="footer-social-link">
              <Facebook className="icon" />
            </Link>
            <Link href="#" aria-label="Twitter" className="footer-social-link">
              <Twitter className="icon" />
            </Link>
            <Link href="#" aria-label="Instagram" className="footer-social-link">
              <Instagram className="icon" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="footer-social-link">
              <Linkedin className="icon" />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom-text">
        <p>&copy; {new Date().getFullYear()} Luxury Motors. All rights reserved.</p>
      </div>
    </footer>
  )
}

