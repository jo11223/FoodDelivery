import React from "react";
import styles from "./Cart.module.css";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

function Cart({
  items,
  onClose,
  onQuantityChange,
  onRemove,
  onProceedToCheckout,
}) {
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartPanel}>
      <button className={styles.closeBtn} onClick={onClose}>
        ×
      </button>
      <h3 className={styles.title}>Your Order</h3>

      {items.length === 0 ? (
        <p className={styles.empty}>No items added yet.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <div>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.unitPrice}>{item.price} ETB each</div>
              </div>
              <div className={styles.controls}>
                <button onClick={() => onQuantityChange(item.id, -1)}>
                  <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => onQuantityChange(item.id, 1)}>
                  <FaPlus />
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className={styles.deleteBtn}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          <div className={styles.footer}>
            <div className={styles.totalLabel}>Total:</div>
            <div className={styles.totalAmount}>{total} ETB</div>
          </div>
          <button className={styles.checkoutBtn} onClick={onProceedToCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
