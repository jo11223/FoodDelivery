// components/Settings/GeneralSettings.jsx
import React, { useState } from "react";
import styles from "./Settings.module.css";

const GeneralSettings = () => {
  const [currency, setCurrency] = useState("ETB");

  return (
    <div className={`settings-section ${styles.settingsSection}`}>
      <div className={styles.settingGroup}>
        <h2 className={`settings-Group `}>General Settings</h2>
        <h3 className={`settings-Group `}>Currency</h3>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className={styles.selectInput}
        >
          <option value="ETB">Ethiopian Birr (ETB)</option>
          <option value="USD">US Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
        </select>
      </div>

      <div className={styles.settingGroup}>
        <h3 className={`settings-Group `}>Account</h3>
        <button className={styles.settingsButton}>Account Settings</button>
      </div>

      <div className={styles.settingGroup}>
        <h3 className={`settings-Group `}>Data</h3>
        <button className={styles.warningButton}>Clear All Data</button>
      </div>
    </div>
  );
};

export default GeneralSettings;
