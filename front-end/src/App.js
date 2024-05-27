import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import CheckOut from "./pages/checkOut/CheckOut";
import { useState } from "react";
import LoginPopup from "./components/loginPopup/LoginPopup";
import Product from "./pages/product/Product";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkOut" element={<CheckOut />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
