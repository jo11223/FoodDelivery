import React, { useState } from "react";
import styles from "./CartPage.module.css";
import { useCart } from "../Context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import backgroundImage from "../assets/images/hero.webp";
import CheckoutModal from "../Components/Cart/CheckOutModal";

function CartPage() {
  const { cartItems, handleQuantityChange, handleRemoveFromCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className={styles.cartPage}>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemDetails}>{item.name}</div>
                <div className={styles.itemInfo}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                </div>
                <div className={styles.priceAndControls}>
                  <div className={styles.unitPrice}>{item.price} ETB</div>
                  <div className={styles.controls}>
                    <button onClick={() => handleQuantityChange(item.id, -1)}>
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className={styles.deleteBtn}
                    >
                      {/* <FaTrash className={styles.deleteBtn} /> */}
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.total}>
              <button
                className={styles.checkoutBtn}
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </button>
              {showCheckout && (
                <CheckoutModal onClose={() => setShowCheckout(false)} />
              )}
              <strong>Total: {total} ETB</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
