// components/Settings/SettingsNav.jsx
import React from "react";
import styles from "./Settings.module.css";

const SettingsNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className={`settings-nav ${styles.navTabs}`}>
      <button
        className={activeTab === "general" ? styles.activeTab : ""}
        onClick={() => setActiveTab("general")}
      >
        General
      </button>
      <button
        className={activeTab === "appearance" ? styles.activeTab : ""}
        onClick={() => setActiveTab("appearance")}
      >
        Appearance
      </button>
      <button
        className={activeTab === "language" ? styles.activeTab : ""}
        onClick={() => setActiveTab("language")}
      >
        Language
      </button>
      <button
        className={activeTab === "privacy" ? styles.activeTab : ""}
        onClick={() => setActiveTab("privacy")}
      >
        Privacy
      </button>
      <button
        className={activeTab === "orderHistory" ? styles.activeTab : ""}
        onClick={() => setActiveTab("orderHistory")}
      >
        Order History
      </button>
      <button
        className={activeTab === "about" ? styles.activeTab : ""}
        onClick={() => setActiveTab("about")}
      >
        About
      </button>
    </div>
  );
};

export default SettingsNav;
