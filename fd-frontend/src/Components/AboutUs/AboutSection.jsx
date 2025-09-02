import React from "react";
import styles from "./AboutSection.module.css";

function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <h2 className={styles.title}>
        About <span className={styles.ethiopic}>ምዓም ኣምበሳ</span>
      </h2>
      <p className={styles.description}>
        Founded in the heart of Mekelle, we are passionate about bringing
        authentic Tigrayan cuisine to your doorstep. Our chefs use traditional
        recipes and the freshest local ingredients to create dishes that
        celebrate the rich culinary heritage of Tigray region.
      </p>
      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <p className={styles.statNumber}>500+</p>
          <p className={styles.statLabel}>Happy Customers</p>
        </div>
        <div className={styles.statBox}>
          <p className={styles.statNumber}>2+</p>
          <p className={styles.statLabel}>Years Serving Mekelle</p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
