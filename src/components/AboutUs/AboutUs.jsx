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
      <div className={styles.content}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className={`text-center mb-12 pt-15 ${styles.fadeIn}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Welcome to <span className="text-[#FF4C29]">CarBazaar Pathalgaon</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Your Premier Destination for Quality Cars in Pathalgaon. We specialize in connecting you with your dream vehicle through our extensive collection and expert guidance.
            </p>
          </div>


          {/* Social Connect Section */}
          <div className={`${styles.socialSection} rounded-xl p-8`}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Follow <span className="text-[#FF4C29]">@carbazaar_pathalgaon</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Stay connected with us on Instagram for the latest arrivals, special offers, and exclusive behind-the-scenes content!
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#FF4C29] rounded-full"></div>
                    <span className="text-gray-300">Latest Car Arrivals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#FF4C29] rounded-full"></div>
                    <span className="text-gray-300">Special Offers & Deals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#FF4C29] rounded-full"></div>
                    <span className="text-gray-300">Customer Success Stories</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#FF4C29] rounded-full"></div>
                    <span className="text-gray-300">Exclusive Events & Updates</span>
                  </div>
                </div>

                <a
                  href="https://www.instagram.com/carbazaar_pathalgaon/?utm_source=ig_web_button_share_sheet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#FF4C29] text-white font-semibold rounded-lg hover:bg-[#FF4C29]/90 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Follow @carbazaar_pathalgaon
                </a>
              </div>

              <div className="relative">
                <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden border border-[#FF4C29]/20">
                  <iframe
                    src="https://www.instagram.com/carbazaar_pathalgaon/embed"
                    width="100%"
                    height="450"
                    className="border-none"
                    allowtransparency="true"
                    allow="encrypted-media"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Statistics */}

        </div>
      </div>
    </section>
  )
}
