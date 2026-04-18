import React from "react";
import styles from "./SignInPage.module.css";

export function FeatureSection() {
  const features = [
    {
      image: "me.jpg",
      title: "Resource Accessibility",
      description:
        "Facilitates access to educational resources like books and electronics, reducing the need for costly purchases.",
    },
    {
      icon: "Community Collaboration",
      title: "Community Collaboration",
      description:
        "Promotes a supportive learning environment by enabling skill and resource sharing among members.",
    },
    {
      icon: "users",
      title: "Cost Efficiency and Sustainability",
      description:
        "Encourages reusing resources, cutting costs, and supporting environmental sustainability within the community.Encourages reusing resources, cutting costs, and supporting environmental sustainability within the community.",
    },
  ];

  return (
    <section className={styles.featureSection}>
      {features.map((feature, index) => (
        <React.Fragment key={feature.title}>
          <div className={styles.featureCard}>
            <div className={styles[feature.icon]} />
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          </div>
          {index < features.length - 1 && <div className={styles.divider} />}
        </React.Fragment>
      ))}
    </section>
  );
}
