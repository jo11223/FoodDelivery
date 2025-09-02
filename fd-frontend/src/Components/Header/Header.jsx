// import React, { useState } from "react";
// import styles from "./Header.module.css";
// import { FaShoppingCart, FaUserPlus } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
// import { useCart } from "../../Context/CartContext";
// import { useNavigate } from "react-router-dom";
// import SignUp from "../Auth/SignUp";
// import LogIn from "../Auth/LogIn";

// function Header() {
//   // const { cartCount, handleOpenCart } = useCart();
//   const { cartItems } = useCart();
//   const navigate = useNavigate();
//   const [showSignUp, setShowSignUp] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   // const [showSettings, setShowSettings] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(() => {
//     return JSON.parse(localStorage.getItem("loggedInUser"));
//   });

//   return (
//     <header className={styles.header}>
//       <NavLink to={"/"} style={{ textDecoration: "none" }}>
//         <div className={styles.leftSection}>
//           <div className={styles.logoCircle}>ምኣ</div>

//           <h2 className={styles.brand}>ምዓም ኣምበሳ</h2>
//         </div>
//       </NavLink>

//       <nav className={styles.nav}>
//         <NavLink
//           to="/"
//           className={({ isActive }) => (isActive ? styles.active : undefined)}
//         >
//           Home
//         </NavLink>
//         <NavLink
//           to="/menu"
//           className={({ isActive }) => (isActive ? styles.active : undefined)}
//         >
//           Menu
//         </NavLink>
//         <NavLink
//           to="/aboutus"
//           className={({ isActive }) => (isActive ? styles.active : undefined)}
//         >
//           About Us
//         </NavLink>
//         <NavLink
//           to="/contact"
//           className={({ isActive }) => (isActive ? styles.active : undefined)}
//         >
//           Contact
//         </NavLink>
//         <NavLink
//           to="/settings"
//           // onClick={(e) => {
//           //   e.preventDefault();
//           //   setShowSettings(true);
//           // }}
//           className={({ isActive }) => (isActive ? styles.active : undefined)}
//         >
//           Settings
//         </NavLink>

//         {/* {showSettings && <Settings onClose={() => setShowSettings(false)} />} */}
//       </nav>

//       <div className={styles.rightSection}>
//         <button
//           className={`${styles.btn} ${styles.order}`}
//           onClick={() => navigate("/menu")}
//         >
//           Order Now
//         </button>
//         <button
//           className={`${styles.btn} ${styles.signup}`}
//           onClick={() => setShowSignUp(true)}
//         >
//           <FaUserPlus style={{ marginRight: "5px", fontSize: "1rem" }} /> Sign
//           Up
//         </button>
//         {showSignUp && (
//           <SignUp
//             onClose={() => setShowSignUp(false)}
//             onSwitchToLogin={() => {
//               setShowSignUp(false);
//               setShowLogin(true);
//             }}
//           />
//         )}
//         {showLogin && (
//           <LogIn
//             onClose={() => setShowLogin(false)}
//             onSwitchToRegister={() => {
//               setShowLogin(false);
//               setShowSignUp(true);
//             }}
//           />
//         )}
//         {/* <div className={styles.cart} onClick={handleOpenCart}>
//           <FaShoppingCart />
//           {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
//         </div> */}
//         <div className={styles.cart} onClick={() => navigate("/cart")}>
//           <FaShoppingCart />
//           {cartItems.length > 0 && (
//             <span className={styles.badge}>{cartItems.length}</span>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;
import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { FaShoppingCart, FaUserPlus, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import SignUp from "../Auth/SignUp";
import LogIn from "../Auth/LogIn";

function Header() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  const dropdownRef = useRef();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("loggedInUser"));
  //   setLoggedInUser(user);
  // }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);

    // Open login modal after password reset
    if (localStorage.getItem("showLoginAfterReset") === "true") {
      setShowLogin(true);
      localStorage.removeItem("showLoginAfterReset");
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/"); // ✅ Redirect to homepage
    window.location.reload(); // ✅ Re-render header
  };

  return (
    <header className={styles.header}>
      <NavLink to={"/"} style={{ textDecoration: "none" }}>
        <div className={styles.leftSection}>
          <div className={styles.logoCircle}>ምኣ</div>
          <h2 className={styles.brand}>ምዓም ኣምበሳ</h2>
        </div>
      </NavLink>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Home
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Menu
        </NavLink>
        <NavLink
          to="/aboutus"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          About Us
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Contact
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Settings
        </NavLink>
      </nav>

      <div className={styles.rightSection}>
        <button
          className={`${styles.btn} ${styles.order}`}
          onClick={() => navigate("/menu")}
        >
          Order Now
        </button>

        {loggedInUser ? (
          <div className={styles.userMenu} ref={dropdownRef}>
            <div
              className={styles.userBtn}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUserCircle className={styles.userIcon} />
              <span className={styles.userName}>
                {loggedInUser.fullName.split(" ")[0]} ▼
              </span>
            </div>
            {showDropdown && (
              <div className={styles.dropdownContent}>
                <div className={styles.userInfo}>
                  <strong>{loggedInUser.fullName}</strong>
                  <br />
                  <small>{loggedInUser.email}</small>
                </div>
                <hr />
                <button onClick={() => navigate("/settings")}>
                  ⚙️ Account Settings
                </button>
                <button onClick={handleLogout}>🔴 Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button
            className={`${styles.btn} ${styles.signup}`}
            onClick={() => setShowSignUp(true)}
          >
            <FaUserPlus style={{ marginRight: "5px", fontSize: "1rem" }} /> Sign
            Up
          </button>
        )}

        {showSignUp && (
          <SignUp
            onClose={() => setShowSignUp(false)}
            onSwitchToLogin={() => {
              setShowSignUp(false);
              setShowLogin(true);
            }}
          />
        )}
        {showLogin && (
          <LogIn
            onClose={() => setShowLogin(false)}
            onSwitchToRegister={() => {
              setShowLogin(false);
              setShowSignUp(true);
            }}
          />
        )}

        <div className={styles.cart} onClick={() => navigate("/cart")}>
          <FaShoppingCart />
          {cartItems.length > 0 && (
            <span className={styles.badge}>{cartItems.length}</span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
