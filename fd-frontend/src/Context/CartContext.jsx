import React, { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [messageQueue, setMessageQueue] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    const newMsg = {
      id: uuidv4(),
      text: `${item.name} added to the cart.`,
    };

    setMessageQueue((prev) => [...prev, newMsg]);

    setIsCartOpen(true);
    setSuccessMessage(`${item.name} added to the cart.`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(p.quantity + delta, 1) } : p
      )
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCloseCart = () => setIsCartOpen(false);
  const handleOpenCart = () => setIsCartOpen(true);

  const removeMessage = (id) => {
    setMessageQueue((prev) => prev.filter((msg) => msg.id !== id));
  };

  const addSuccessMessage = (text) => {
    const newMsg = {
      id: uuidv4(),
      text,
    };
    setMessageQueue((prev) => [...prev, newMsg]);

    //Save to localStorage so it survives redirect
    localStorage.setItem("successMessage", JSON.stringify(newMsg));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        handleAddToCart,
        handleQuantityChange,
        handleCloseCart,
        handleOpenCart,
        handleRemoveFromCart,
        cartCount,
        successMessage,
        messageQueue,
        removeMessage,
        showCheckoutModal,
        setShowCheckoutModal,
        addSuccessMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook
export const useCart = () => useContext(CartContext);
