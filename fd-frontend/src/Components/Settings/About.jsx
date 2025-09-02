// components/Settings/About.jsx
import React from "react";
import styles from "./Settings.module.css";

const About = () => {
  return (
    <div className={`settings-section ${styles.settingsSection}`}>
      <div className={styles.settingGroup}>
        <h2 className={`settings-Group `}>About</h2>
        <h3 className={`settings-Group `}>Version</h3>
        <p>3.5.0</p>
      </div>

      <div className={styles.settingGroup}>
        <h3 className={`settings-Group `}>Platform</h3>
        <p>Web App</p>
      </div>

      <div className={styles.settingGroup}>
        <h3 className={`settings-Group `}>Android</h3>
        <p>2025.01</p>
      </div>

      <div className={styles.settingGroup}>
        <h3 className={`settings-Group `}>Tigray</h3>
        <a
          href="https://www.tigray.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.tigray.com/
        </a>
      </div>
    </div>
  );
};

export default About;
