"use client";

import React from 'react';
import styles from './SignInPage.module.css';
import { SignInForm } from './SignInForm';
import { FeatureSection } from './FeatureSection';
import { SiteHeader } from '../SiteHeader';
import { SiteFooter } from '../SiteFooter';
export default function SignInPage() {
  return (
    <main className={styles.signInPage}>
      <div className={styles.mainContent}>
        <FeatureSection />
        <SignInForm />
      </div>


      <button className={styles.scrollTopButton} aria-label="Scroll to top">
        <span className={styles.scrollIcon} />
      </button>
    </main>
  );
}
