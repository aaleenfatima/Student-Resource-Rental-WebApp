import React from "react";
import styles from "./headerFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerContent}>
        <div className={styles.companyInfo}>
          <a href="/" className={styles.footerLogo}>
            <div className={styles.receipt} />
            <span>Onest</span>
          </a>

          <address className={styles.contactInfo}>
            <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
            <p>Phone: (405) 555-0128</p>
            <p>Mail: Adfinity@gmail.com</p>
          </address>
        </div>

        <nav className={styles.footerNav}>
          <h2 className={styles.footerNavTitle}>Supports</h2>
          <ul className={styles.footerLinks}>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/faqs">FAQs</a>
            </li>
            <li>
              <a href="/pricing">Pricing Plans</a>
            </li>
            <li>
              <a href="/sitemap">Sitemap</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
