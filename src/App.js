import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Sell from "./components/Sell";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";
import "./App.css";

function App() {
  // ✅ Global State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // ✅ Global State for Favorites & Cart
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // ✅ Load data from localStorage when app loads
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsAuthenticated(true);
    }

    // ✅ Load favorites and cart from localStorage
    const favData = JSON.parse(localStorage.getItem("favorites")) || [];
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    setFavorites(favData);
    setCart(cartData);
  }, []);

  // ✅ Store favorites & cart in localStorage on change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [favorites, cart]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("favorites");
    localStorage.removeItem("cart");
  };

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className={`app-container ${theme}`}>
        <Navbar
          isAuthenticated={isAuthenticated}
          toggleTheme={toggleTheme}
          onLogout={handleLogout}
          favorites={favorites}     // ✅ Pass favorites state
          cart={cart}               // ✅ Pass cart state
        />

        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup />} />

            <Route 
              path="/products" 
              element={
                <ProductList
                  favorites={favorites} 
                  setFavorites={setFavorites}
                  cart={cart} 
                  setCart={setCart}
                />
              } 
            />

            <Route 
              path="/products/:id" 
              element={
                <ProductDetails
                  favorites={favorites} 
                  setFavorites={setFavorites}
                  cart={cart} 
                  setCart={setCart}
                />
              } 
            />

            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute>
                  <FavoritesPage 
                    favorites={favorites} 
                    setFavorites={setFavorites}
                  />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <CartPage cart={cart} setCart={setCart} />
                </ProtectedRoute>
              } 
            />

            <Route path="/sell" element={<ProtectedRoute><Sell /></ProtectedRoute>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
