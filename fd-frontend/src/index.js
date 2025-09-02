import ReactDOM from "react-dom/client";
import { CartProvider } from "./Context/CartContext";
import "./index.css";
import App from "./App";

// ⬇️ Insert this block BEFORE rendering App
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(`theme-${savedTheme}`);

// ⬇️ Now render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <App />
  </CartProvider>
);
