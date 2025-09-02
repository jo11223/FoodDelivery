// import React, { useState } from "react";
// import styles from "./SignUp.module.css";

// function SignUp({ onClose, onSwitchToLogin }) {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Save form data to localStorage
//     // Let's save under key "registeredUser"
//     localStorage.setItem("registeredUser", JSON.stringify(formData));

//     console.log("Registering and saved to localStorage:", formData);

//     onClose();
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modal}>
//         <button className={styles.closeBtn} onClick={onClose}>
//           &times;
//         </button>
//         <h2 className={styles.title}>Register</h2>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <input
//             name="fullName"
//             placeholder="Enter your full name"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="phone"
//             placeholder="Enter your phone number"
//             onChange={handleChange}
//             required
//           />
//           <textarea
//             name="address"
//             placeholder="Enter your delivery address"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Create a password"
//             onChange={handleChange}
//             required
//           />
//           <button type="submit" className={styles.registerBtn}>
//             Register
//           </button>
//         </form>
//         <p className={styles.loginLink}>
//           Already have an account? <span onClick={onSwitchToLogin}>Login</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default SignUp;
import React, { useState } from "react";
import styles from "./SignUp.module.css";

function SignUp({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters.";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    } else {
      const existing = JSON.parse(localStorage.getItem("registeredUser"));
      if (existing && existing.email === formData.email) {
        newErrors.email = "This email is already registered.";
      }
    }

    if (!/^\d{10,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be at least 10 digits.";
    }

    if (formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Registration failed. Please fix the errors.");
      return;
    }

    try {
      localStorage.setItem("registeredUser", JSON.stringify(formData));
      alert("Successfully registered!");

      // Switch to login screen
      onSwitchToLogin();

      // Optionally close the modal (if login opens in same modal)
      // onClose(); // Only use this if login is on a separate screen/modal
    } catch (error) {
      alert("Registration failed. Please try again.");
      console.error("Storage error:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="fullName"
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />
          {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <input
            name="phone"
            placeholder="Enter your phone number"
            onChange={handleChange}
            required
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}

          <textarea
            name="address"
            placeholder="Enter your delivery address"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            onChange={handleChange}
            required
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <button type="submit" className={styles.registerBtn}>
            Register
          </button>
        </form>

        <p className={styles.loginLink}>
          Already have an account? <span onClick={onSwitchToLogin}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
