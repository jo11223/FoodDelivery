import React from "react";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MenuPage from "./Pages/MenuPage";
import { useCart } from "./Context/CartContext";
import Cart from "./Components/Cart/Cart";
import Footer from "./Components/Footer/Footer";
import CartPage from "./Pages/CartPage";
import SuccessMessage from "./Components/Cart/SuccessMessage";
import CheckoutModal from "./Components/Cart/CheckOutModal";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./Components/PageWrapper";
import ScrollToTop from "./Components/ScrollToTop";
import AboutUsPage from "./Pages/AboutUsPage";
import Contact from "./Components/Contact/Contact";
import SettingsPage from "./Pages/SettingsPage";
import Forget from "./Components/Auth/Forget";
import VerifyCode from "./Components/Auth/VerifyCode";
import ChangePassword from "./Components/Auth/ChangePassword";

function App() {
  const {
    cartItems,
    isCartOpen,
    handleAddToCart,
    handleQuantityChange,
    handleCloseCart,
    handleOpenCart,
    handleRemoveFromCart,
    showCheckoutModal,
    setShowCheckoutModal,
  } = useCart();

  return (
    <div>
      <Router>
        <ScrollToTop />
        <Header cartCount={cartItems.length} onCartClick={handleOpenCart} />
        <SuccessMessage />
        {isCartOpen && (
          <Cart
            items={cartItems}
            onClose={handleCloseCart}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveFromCart}
            onProceedToCheckout={() => {
              handleCloseCart();
              setShowCheckoutModal(true);
            }}
          />
        )}

        {showCheckoutModal && (
          <CheckoutModal
            cartItems={cartItems}
            onClose={() => setShowCheckoutModal(false)}
          />
        )}

        {/* Animate route transitions */}
        <AnimatePresence mode="wait">
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route
              path="/"
              element={
                <PageWrapper>
                  <HomePage />
                </PageWrapper>
              }
            />
            <Route
              path="/menu"
              element={
                <PageWrapper>
                  <MenuPage onAddToCart={handleAddToCart} />
                </PageWrapper>
              }
            />
            <Route
              path="/cart"
              element={
                <PageWrapper>
                  <CartPage />
                </PageWrapper>
              }
            />
            <Route
              path="/aboutus"
              element={
                <PageWrapper>
                  <AboutUsPage />
                </PageWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <Contact />
                </PageWrapper>
              }
            />

            <Route
              path="/settings"
              element={
                <PageWrapper>
                  <SettingsPage />
                </PageWrapper>
              }
            />

            <Route
              path="/forgot-password"
              element={
                <PageWrapper>
                  <Forget />
                </PageWrapper>
              }
            />
            <Route
              path="/verify-code"
              element={
                <PageWrapper>
                  <VerifyCode />
                </PageWrapper>
              }
            />
            <Route
              path="/change-password"
              element={
                <PageWrapper>
                  <ChangePassword />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>

        <Footer />
      </Router>
      {/* <Hero /> */}
    </div>
  );
}

export default App;
