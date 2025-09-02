// import React, { useState, useEffect } from "react";
// import styles from "./Settings.module.css";
// import { Sun, Moon } from "lucide-react";

// const AppearanceSettings = () => {
//   const [theme, setTheme] = useState("light");
//   const [fontSize, setFontSize] = useState("normal");

//   // ✅ Load saved theme from localStorage (on first load)
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) setTheme(savedTheme);
//   }, []);

//   // ✅ Save theme to localStorage whenever it changes
//   useEffect(() => {
//     document.body.classList.remove("theme-light", "theme-dark");
//     document.body.classList.add(`theme-${theme}`);
//     localStorage.setItem("theme", theme);
//     console.log("Theme applied:", theme);
//   }, [theme]);

//   // ✅ Save font size to root element and support scaling
//   useEffect(() => {
//     document.documentElement.setAttribute("data-font-size", fontSize);
//   }, [fontSize]);

//   return (
//     <div className={styles.settingsSection}>
//       <h2>Appearance</h2>

//       <div className={styles.settingGroup}>
//         <h3>Theme</h3>
//         <div className={styles.optionGroup}>
//           <button
//             className={`${styles.optionButton} ${
//               theme === "light" ? styles.active : ""
//             }`}
//             onClick={() => setTheme("light")}
//           >
//             <Sun size={24} />
//             <span>Light</span>
//           </button>
//           <button
//             className={`${styles.optionButton} ${
//               theme === "dark" ? styles.active : ""
//             }`}
//             onClick={() => setTheme("dark")}
//           >
//             <Moon size={24} />
//             <span>Dark</span>
//           </button>
//         </div>
//       </div>

//       <div className={styles.settingGroup}>
//         <h3>Font Size</h3>
//         <div className={styles.optionGroup}>
//           {["small", "normal", "large"].map((size) => (
//             <button
//               key={size}
//               className={`${styles.optionButton} ${
//                 fontSize === size ? styles.active : ""
//               }`}
//               onClick={() => setFontSize(size)}
//             >
//               {size.charAt(0).toUpperCase() + size.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppearanceSettings;
import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import { Sun, Moon } from "lucide-react";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("normal");

  // Load saved theme on first mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Apply theme class to <body>
  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
    console.log("Theme applied:", theme);
  }, [theme]);

  // Apply font size scaling
  useEffect(() => {
    document.documentElement.setAttribute("data-font-size", fontSize);
  }, [fontSize]);

  return (
    // Add a global class for dynamic theming
    <div className={`settings-section ${styles.settingsSection}`}>
      <div className={`settings-Group ${styles.settingGroup}`}>
        <h2 className={`settings-Group `}>Appearance</h2>
        <h3 className={`settings-Group`}>Theme</h3>
        <div className={styles.optionGroup}>
          <button
            className={`${styles.optionButton} ${
              theme === "light" ? styles.active : ""
            }`}
            onClick={() => setTheme("light")}
          >
            <Sun size={24} />
            <span>Light</span>
          </button>
          <button
            className={`${styles.optionButton} ${
              theme === "dark" ? styles.active : ""
            }`}
            onClick={() => setTheme("dark")}
          >
            <Moon size={24} />
            <span>Dark</span>
          </button>
        </div>
      </div>

      {/* <div className={styles.settingGroup}> */}
      <div className={`settings-Group ${styles.settingGroup}`}>
        <h3 className={`settings-Group `}>Font Size</h3>
        <div className={styles.optionGroup}>
          {["small", "normal", "large"].map((size) => (
            <button
              key={size}
              className={`${styles.optionButton} ${
                fontSize === size ? styles.active : ""
              }`}
              onClick={() => setFontSize(size)}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
