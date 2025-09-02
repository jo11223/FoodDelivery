// components/CheckoutModal.jsx
import React, { useState, useEffect } from "react";
import styles from "./CheckOutModal.module.css";
import { useCart } from "../../Context/CartContext";
import { FaTimes, FaMoneyBillWave, FaMobileAlt } from "react-icons/fa";

const CheckoutModal = ({ onClose }) => {
  const { cartItems, addSuccessMessage } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressWhere, setAddressWhere] = useState("");
  const [instructions, setInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = async () => {
    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderData = {
      customer: {
        name,
        phone,
      },
      delivery: {
        instructions,
      },
      paymentMethod,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };

    try {
      setIsSubmitting(true);
      /*********************************************************************************** */
      // const res = await fetch("https://your-api.com/api/orders", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(orderData),
      // });

      // if (!res.ok) {
      //   throw new Error("Failed to place order");
      // }

      // const result = await res.json();
      // console.log("Order successful:", result);
      /****************************************************************************** */
      const existingOrders =
        JSON.parse(localStorage.getItem("orderHistory")) || [];
      const newOrders = [...existingOrders, orderData];
      localStorage.setItem("orderHistory", JSON.stringify(newOrders));

      console.log("Mock order saved:", orderData);

      /********************************************************************************** */
      addSuccessMessage(
        "Order placed successfully! We'll call you to confirm. Check your order history in Settings."
      );

      setTimeout(() => {
        onClose();
        localStorage.removeItem("cart");
        window.location.href = "/";
      }, 100); // Small delay (~200ms)

      alert("Order placed successfully!");
      onClose();
      localStorage.removeItem("cart");
      window.location.href = "/";
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  //to make not move background
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 style={{ color: "#fff" }}>Checkout</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <h3>Order Summary</h3>
        <ul className={styles.summary}>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span style={{ fontWeight: "500" }}>
                {item.name} x{item.quantity}
              </span>
              <span>{item.price * item.quantity} ETB</span>
            </li>
          ))}
        </ul>

        <div className={styles.total}>
          <strong>Total:</strong>{" "}
          <span className={styles.orange}>{total} ETB</span>
        </div>

        <h3>Delivery Information</h3>
        <div className={styles.formGroup}>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label style={{ fontSize: "0.9rem" }}>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label style={{ fontSize: "0.9rem" }}>Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <label style={{ fontSize: "0.9rem" }}>Delivery Address</label>
          <textarea
            placeholder="Enter your full delivery address"
            value={addressWhere}
            onChange={(e) => setAddressWhere(e.target.value)}
          />
        </div>

        <h3>Payment Method</h3>
        <div className={styles.payment}>
          <label>
            <input
              type="radio"
              name="payment"
              defaultChecked
              value="Cash on Delivery"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <FaMoneyBillWave style={{ color: "green" }} /> Cash on Delivery
          </label>
          <label>
            <input type="radio" name="payment" />
            <FaMobileAlt style={{ color: "blue" }} /> Mobile Money (CBE Birr,
            telebirr)
          </label>
        </div>

        <label style={{ fontSize: "0.9rem" }}>
          Special Instruction(Optional)
        </label>
        <textarea
          className={styles.instructions}
          placeholder="Any special requests or delivery instructions..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <button
          className={styles.placeOrder}
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
