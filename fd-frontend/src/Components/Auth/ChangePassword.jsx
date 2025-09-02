import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPages.module.css";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 5) {
      setError("Password must be at least 5 characters.");
      return;
    }

    if (newPassword !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const email = localStorage.getItem("resetEmail");
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (registeredUser?.email === email) {
      registeredUser.password = newPassword;
      localStorage.setItem("registeredUser", JSON.stringify(registeredUser));

      alert("Password successfully changed!");
      localStorage.setItem("showLoginAfterReset", "true");
      navigate("/", { state: { showLogin: true } });
    } else {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError("");
          }}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            setError("");
          }}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Save New Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
