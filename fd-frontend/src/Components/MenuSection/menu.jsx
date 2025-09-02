import React from "react";
import MenuSection from "../components/MenuSection/MenuSection";

function Menu({ onAddToCart }) {
  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Menu</h2>
      <MenuSection onAddToCart={onAddToCart} />
    </div>
  );
}

export default Menu;
