import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPages.module.css";

function VerifyCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedCode = localStorage.getItem("resetCode");

    if (code === storedCode) {
      navigate("/change-password");
    } else {
      setError("Incorrect verification code.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Verify Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the 6-digit code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError("");
          }}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default VerifyCode;
