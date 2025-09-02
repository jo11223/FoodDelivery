// components/Settings/PrivacySettings.jsx
import React, { useState } from "react";
import styles from "./Settings.module.css";

const PrivacySettings = () => {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className={`settings-section ${styles.settingsSection}`}>
      <div className={styles.settingGroup}>
        <h2 className={`settings-Group `}>Privacy & Security</h2>
        <h3 className={`settings-Group `}>Location Services</h3>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={locationEnabled}
            onChange={() => setLocationEnabled(!locationEnabled)}
          />
          <span className={styles.slider}></span>
        </label>
        <span>Allow location for delivery</span>
      </div>

      <div className={styles.settingGroup}>
        <h3 className={`settings-Group `}>Push Notifications</h3>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          <span className={styles.slider}></span>
        </label>
        <span>Order updates and promotions</span>
      </div>

      <div className={styles.settingGroup}>
        <h3 className={`settings-Group `}>Security</h3>
        <button className={styles.settingsButton}>Change Password</button>
      </div>
    </div>
  );
};

export default PrivacySettings;

// import React from "react";
// import "./Settings.css";

// const PrivacySettings = () => {
//   return (
//     <div className="tab-content">
//       <h3>Privacy Settings</h3>

//       <div className="privacy-option">
//         <input type="checkbox" id="track" />
//         <label htmlFor="track">
//           Allow usage tracking to improve experience
//         </label>
//       </div>

//       <div className="privacy-option">
//         <input type="checkbox" id="notifications" />
//         <label htmlFor="notifications">
//           Receive order status notifications
//         </label>
//       </div>
//     </div>
//   );
// };

// export default PrivacySettings;
