import React from "react";
import styles from "./Hero.module.css";
import {
  FaUtensils,
  FaShoppingCart,
  FaTruck,
  FaLeaf,
  FaStar,
} from "react-icons/fa";
import backgroundImage from "../../assets/images/hero.webp";
import { useCart } from "../../Context/CartContext";
import { NavLink } from "react-router-dom";

function Hero() {
  const { handleOpenCart } = useCart();

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>ምዓም ኣምባሳ</h1>
          <p>ብ ምኣዛና ንልለ</p>
          <p className={styles.subtitle}>
            Experience the rich flavors of traditional Ethiopian injera and
            stews from the comfort of your home
          </p>

          <div className={styles.buttons}>
            <NavLink to={"/menu"} style={{ textDecoration: "none" }}>
              <button className={`${styles.btn} ${styles.explore}`}>
                <FaUtensils className={styles.icon} />
                Explore Menu
              </button>
            </NavLink>
            <button
              className={`${styles.btn} ${styles.cart}`}
              onClick={handleOpenCart}
            >
              <FaShoppingCart className={styles.icon} />
              My Cart
            </button>
          </div>

          <div className={styles.features}>
            <div className={styles.featureCard}>
              <div className={`${styles.iconCircle} ${styles.delivery}`}>
                <FaTruck />
              </div>

              <h3>Fast Delivery</h3>
              <p>Quick delivery throughout Mekelle within 30 minutes</p>
            </div>
            <div className={styles.featureCard}>
              <div className={`${styles.iconCircle} ${styles.ingredients}`}>
                <FaLeaf />
              </div>

              <h3>Fresh Ingredients</h3>
              <p>Locally sourced, organic ingredients for authentic taste</p>
            </div>
            <div className={styles.featureCard}>
              <div className={`${styles.iconCircle} ${styles.rating}`}>
                <FaStar />
              </div>
              <h3>Top Rated</h3>
              <p>Loved by customers across Mekelle with 4.9★ rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
