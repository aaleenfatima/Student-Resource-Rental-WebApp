"use client";

import React from "react";
import styles from "../signin/SignInPage.module.css"
import { SignUpForm } from "./SignUpForm";
import { FeatureSection } from "../signin/FeatureSection";
export default function SignInPage() {
  return (
    <main className={styles.signInPage}>
      <div className={styles.mainContent}>
        <FeatureSection />
        <SignUpForm />
      </div>


      <button className={styles.scrollTopButton} aria-label="Scroll to top">
        <span className={styles.scrollIcon} />
      </button>
    </main>
  );
}
