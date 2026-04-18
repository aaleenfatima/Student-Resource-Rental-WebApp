import React from "react";
import { Link } from 'react-router-dom';  // Add this import

import styles from "./headerFooter.module.css";

export function SiteHeader() {
  return (
    <header className={styles.siteHeader}>
      <nav className={styles.mainNav}>
        <div className={styles.navLinks}>
          <a href="/" className={styles.logo}>
            <div className={styles.receipt} />
            <span>UniShare</span>
          </a>

          <div className={styles.separator} />

          <div className={styles.navMenu}>
          <Link to="/home">Home</Link>  {/* Updated this line */}
            <Link to="/listing">Listing</Link>  {/* Updated this line */}
            <Link to="/blooddonation">Blood Donation</Link>  {/* Updated this line */}
            <Link to="/laf">LAF</Link>  {/* Updated this line */}

            <a href="/contact">Contact</a>
          </div>
        </div>

        <div className={styles.userActions}>
          <button className={styles.chatButton}>
            <div className={styles.notificationDot} />
          </button>

          <Link to="/card">
  <img
    src="https://cdn.builder.io/api/v1/image/assets/46c49c6ab3714444ac32ad4faea97f64/f4b045a100352fad1633acac2b270a8fb53d0c412a306e34ae8f0db72c9fe6eb?placeholderIfAbsent=true"
    alt="User avatar"
    className={styles.userAvatar}
  />
</Link>
          <button className={styles.postAdButton}>
            <span className={styles.plusIcon} />
            <Link to="/post-ad">Post an Ad</Link> 
          </button>
        </div>
      </nav>
    </header>
  );
}
