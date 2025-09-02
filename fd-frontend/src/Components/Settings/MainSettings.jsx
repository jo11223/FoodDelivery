// components/Settings/Settings.jsx
import React, { useState } from "react";
import SettingsNav from "./SettingsNav";
import GeneralSettings from "./GeneralSettings";
import AppearanceSettings from "./AppearanceSettings";
import LanguageSettings from "./LanguageSettings";
import PrivacySettings from "./PrivacySettings";
import OrderHistory from "./OrderHistory";
import About from "./About";
import styles from "./Settings.module.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "appearance":
        return <AppearanceSettings />;
      case "language":
        return <LanguageSettings />;
      case "privacy":
        return <PrivacySettings />;
      case "orderHistory":
        return <OrderHistory />;
      case "about":
        return <About />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className={`settings-section ${styles.settingsSection}`}>
      <div style={{ backgroundColor: "white" /*, borderRadius: "30px"*/ }}>
        <h1 className={`head-blue ${styles.HeadBlue}`}>Settings</h1>
        <SettingsNav activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Settings;
