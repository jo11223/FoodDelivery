import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPages.module.css";

function Forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (!registeredUser || registeredUser.email !== email) {
      setError("This email is not registered.");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    localStorage.setItem("resetCode", code);
    localStorage.setItem("resetEmail", email);
    alert(`Verification code sent to your email: ${code}`); // Replace with real email service in production

    navigate("/verify-code");
  };

  return (
    <div className={styles.authContainer}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Send Verification Code</button>
      </form>
    </div>
  );
}

export default Forgot;
