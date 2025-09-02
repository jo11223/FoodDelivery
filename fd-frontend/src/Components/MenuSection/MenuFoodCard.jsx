import React, { useEffect, useState } from "react";
import styles from "./MenuFoodCard.module.css";

function MenuFoodCard({
  image,
  name,
  description,
  price,
  onAddToCart,
  badge,
  rating,
  isFavorite,
  onToggleFavorite,
}) {
  const [animateHeart, setAnimateHeart] = useState(false);

  useEffect(() => {
    if (animateHeart) {
      const timeout = setTimeout(() => setAnimateHeart(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [animateHeart]);

  // Round stars based on the rule provided
  const roundedStars =
    rating % 1 > 0.5 ? Math.ceil(rating) : Math.floor(rating);
  const emptyStars = 5 - roundedStars;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
      </div>

      <div className={styles.details}>
        <div className={styles.header}>
          <h3>{name}</h3>
          {badge && (
            <span className={`${styles.badge} ${styles[badge.toLowerCase()]}`}>
              {badge}
            </span>
          )}
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <span className={styles.price}>{price} ETB</span>
          <div className={styles.stars}>
            {[...Array(roundedStars)].map((_, i) => (
              <span key={`filled-${i}`} className={styles.star}>
                ★
              </span>
            ))}
            {[...Array(emptyStars)].map((_, i) => (
              <span key={`empty-${i}`} className={styles.starEmpty}>
                ☆
              </span>
            ))}
            <span className={styles.rating}>({rating})</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <button
            onClick={() => {
              setAnimateHeart(true);
              onToggleFavorite();
            }}
            className={`${styles.favoriteBtn} ${
              animateHeart ? styles.animate : ""
            }`}
          >
            {isFavorite ? "🖤" : "🤍"}
          </button>
          <button className={styles.addToCart} onClick={onAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuFoodCard;
