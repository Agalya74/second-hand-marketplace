import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, Heart } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check authentication status by verifying token
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);  // True if token exists
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");  // Clear cart data on logout
    setIsLoggedIn(false);
    alert("✅ Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* ✅ Logo */}
        <Link to="/" className="navbar-logo">
          <ShoppingCart size={28} />
          <h1>Second-Hand Marketplace</h1>
        </Link>

        {/* ✅ Navbar Links */}
        <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/sell">Sell</Link></li>
        </ul>

        {/* ✅ Icons Section */}
        <div className="navbar-icons">
          {isLoggedIn ? (
            <>
              <Link to="/favorites" className="icon-btn">
                <Heart size={24} />
              </Link>
              <Link to="/cart" className="icon-btn">
                <ShoppingCart size={24} />
              </Link>
            </>
          ) : null}
        </div>

        {/* ✅ Right Section */}
        <div className="navbar-right">
          {/* User Login/Logout */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="navbar-login">
              <User size={20} />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="navbar-login">
              <User size={20} />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="navbar-menu" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={26} />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
