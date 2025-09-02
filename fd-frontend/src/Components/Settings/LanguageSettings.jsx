// components/Settings/LanguageSettings.jsx
import React, { useState } from "react";
import styles from "./Settings.module.css";

const LanguageSettings = () => {
  const [language, setLanguage] = useState("English");
  const [region, setRegion] = useState("Tigray, Ethiopia");

  return (
    <div className={`settings-section ${styles.settingsSection}`}>
      <div className={styles.settingGroup}>
        <h2 className={`settings-Group `}>Language & Region</h2>
        <h3 className={`settings-Group `}>Language</h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className={styles.selectInput}
        >
          <option value="English">English</option>
          <option value="Amharic">Amharic</option>
          <option value="Tigrinya">Tigrinya</option>
        </select>
      </div>

      <div className={styles.settingGroup}>
        <h3 className={`settings-Group `}>Region</h3>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className={styles.selectInput}
        >
          <option value="Tigray, Ethiopia">Tigray, Ethiopia</option>
          <option value="Addis Ababa, Ethiopia">Addis Ababa, Ethiopia</option>
          <option value="Amhara, Ethiopia">Amhara, Ethiopia</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSettings;
