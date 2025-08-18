import { Link } from "react-router-dom"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>LuxDrive</h3>
            <p className={styles.description}>
              Your premier destination for luxury automotive excellence. Experience the finest collection of premium
              vehicles.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <div className={styles.links}>
              <Link href="/" className={styles.link}>
                Home
              </Link>
              <Link href="/collections" className={styles.link}>
                Collections
              </Link>
              <Link href="#about" className={styles.link}>
                About Us
              </Link>
              <Link href="/admin" className={styles.link}>
                Admin
              </Link>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Services</h4>
            <div className={styles.links}>
              <a href="#" className={styles.link}>
                Vehicle Sales
              </a>
              <a href="#" className={styles.link}>
                Financing
              </a>
              <a href="#" className={styles.link}>
                Insurance
              </a>
              <a href="#" className={styles.link}>
                Maintenance
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact Info</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>123 Luxury Avenue, Premium District, City 12345</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>info@luxdrive.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2024 LuxDrive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
