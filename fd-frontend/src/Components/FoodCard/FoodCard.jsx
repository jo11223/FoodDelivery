import React from "react";
import styles from "./FoodCard.module.css";
import { FaPlus } from "react-icons/fa";

function FoodCard({ image, name, description, price, onAddToCart }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.bottom}>
          <span className={styles.price}>ETB {price}</span>
          <button className={styles.addBtn} onClick={onAddToCart}>
            <FaPlus /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
