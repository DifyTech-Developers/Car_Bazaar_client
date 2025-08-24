import { Link } from "react-router-dom"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Car Bazaar</h3>
            <p className={styles.description}>
              At Car Bazaar Pathalgaon, we specialize in the sale and purchase of four-wheeler vehicles.
              Our showroom, located at Palidih Chowk, Pathalgaon (District Jashpur, Chhattisgarh),
              provides customers with a seamless car buying and selling experience.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/carbazaar_pathalgaon?igsh=MWNoMmc0ZHVrOHNwdA%3D%3D&ut" className={styles.socialLink} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              {/* youtube logo  */}
              <a href="https://youtube.com/@umeshgupta126?si=rvvaC__c8TaNKWJv" className={styles.socialLink} aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <div className={styles.links}>
              <Link to="/" className={styles.link}>
                Home
              </Link>
              <Link to="/collections" className={styles.link}>
                Collections
              </Link>


            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Services</h4>
            <div className={styles.links}>
              <a href="" className={styles.link}>
                Vehicle Sales
              </a>
              <a href="" className={styles.link}>
                Financing
              </a>
              <a href="" className={styles.link}>
                Insurance
              </a>
              <a href="" className={styles.link}>
                Maintenance
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact Info</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>Palidih Chowk, Jashpur Road, Pathalgaon, District Jashpur, Chhattisgarh – 496118</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>+91 7879740513 , +91 9343157516</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>gumesh734@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2024 CarBazaar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
