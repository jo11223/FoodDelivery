import React from "react";
import styles from "./Footer.module.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
// import logo from "../../assets/images/logo.png"; // replace with actual path

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.column}>
          <div className={styles.logoRow}>
            {/* <img src={logo} alt="logo" className={styles.logo} /> */}
            <div className={styles.logoCircle}>ምኣ</div>
            <h3 className={styles.brand}>ምዓም ኣምበሳ</h3>
          </div>
          <p className={styles.description}>
            Bringing authentic Tigrayan cuisine to your doorstep with love and
            tradition.
          </p>
        </div>

        <div className={styles.column}>
          <h4>Contact Info</h4>
          <div className={styles.description}>
            <p>
              <FaPhone /> +251 914 123 456
            </p>
            <p>
              <FaEnvelope /> info@miamambesa.com
            </p>
            <p>
              <FaMapMarkerAlt /> Mekelle, Tigray, Ethiopia
            </p>
          </div>
        </div>

        <div className={styles.column}>
          <h4>Opening Hours</h4>
          <div className={styles.description}>
            <p>Monday - Friday: 8:00 AM - 10:00 PM</p>
            <p>Saturday - Sunday: 9:00 AM - 11:00 PM</p>
          </div>
        </div>

        <div className={styles.column}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a href="www.facebook.com">
              <FaFacebookF />
            </a>
            <a href="www.instagram.com">
              <FaInstagram />
            </a>
            <a href="www.twitter.com">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <p>© 2025 ምዓም ኣምበሳ. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
