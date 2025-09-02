import React, { useEffect, useState } from "react";
import styles from "./SuccessMessage.module.css";
import { useCart } from "../../Context/CartContext";

function SuccessMessage() {
  const { messageQueue, removeMessage } = useCart();
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [handledStorageMsgId, setHandledStorageMsgId] = useState(null);

  // Handle successMessage from localStorage after redirect
  useEffect(() => {
    const storedMsg = localStorage.getItem("successMessage");

    if (storedMsg) {
      const msgObj = JSON.parse(storedMsg);

      // Delay to ensure rendering after redirect
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msgObj]);
        setHandledStorageMsgId(msgObj.id);

        setTimeout(() => {
          setVisibleMessages((prev) => prev.filter((m) => m.id !== msgObj.id));
          removeMessage(msgObj.id);
          localStorage.removeItem("successMessage");
        }, 3000);
      }, 100); // slight delay ensures it shows after redirect
    }
  }, [removeMessage]);

  // Handle queue messages (but not duplicates)
  useEffect(() => {
    const newMessages = messageQueue.filter(
      (msg) =>
        !visibleMessages.some((v) => v.id === msg.id) &&
        msg.id !== handledStorageMsgId
    );

    newMessages.forEach((msg) => {
      setVisibleMessages((prev) => [...prev, msg]);

      setTimeout(() => {
        setVisibleMessages((prev) => prev.filter((m) => m.id !== msg.id));
        removeMessage(msg.id);
      }, 3000);
    });
  }, [messageQueue, removeMessage, visibleMessages, handledStorageMsgId]);

  return (
    <div className={styles.messageContainer}>
      {visibleMessages.map((msg) => (
        <div key={msg.id} className={styles.message}>
          {msg.text}
        </div>
      ))}
    </div>
  );
}

export default SuccessMessage;
