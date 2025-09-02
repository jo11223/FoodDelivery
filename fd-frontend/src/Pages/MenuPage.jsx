import React from "react";
import MenuSection from "../Components/MenuSection/MenuSection";
function Menu() {
  return (
    <div style={{ padding: "2rem", backgroundColor: "#ffe " }}>
      <h2
        style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2rem" }}
      >
        Our Menu
      </h2>
      <MenuSection />
    </div>
  );
}

export default Menu;
