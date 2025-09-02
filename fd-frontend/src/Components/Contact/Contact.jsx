import React, { useState } from "react";
import styles from "./Contact.module.css";
import { Mail, MessageSquareText } from "lucide-react";
import backgroundImage from "../../assets/images/hero.webp";
const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const maxLength = 512;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handleSubmit = () => {
    if (!email || !isEmailValid || !subject || !message) {
      alert("Please fill in all fields with valid data.");
      return;
    }

    const data = { subject, email, message };
    localStorage.setItem("contactForm", JSON.stringify(data));
    alert("Message sent successfully!");
    setEmail("");
    setSubject("");
    setMessage("");
  };

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
      <div className={styles.container}>
        <h2 className={styles.title}>Contact Us</h2>
        <p className={styles.subtitle}>
          Have a question or feedback about your order? Drop us a message.
        </p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Subject</label>
          <div className={styles.inputField}>
            <MessageSquareText className={styles.icon} />
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Problem with my order"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <div className={styles.inputField}>
            <Mail className={styles.icon} />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="your@email.com"
              className={`${styles.input} ${!isEmailValid ? styles.error : ""}`}
            />
          </div>
          {!isEmailValid && (
            <p className={styles.errorText}>Please enter a valid email.</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Message</label>
          <textarea
            value={message}
            onChange={(e) =>
              e.target.value.length <= maxLength && setMessage(e.target.value)
            }
            placeholder="Write your message here..."
            className={styles.textarea}
          />
          <div className={styles.counter}>
            {message.length}/{maxLength}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className={styles.button}
          disabled={!message || !isEmailValid}
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
