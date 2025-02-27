import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, Heart } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check user authentication status from localStorage
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!user);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <ShoppingCart size={28} />
          <h1>Second-Hand Marketplace</h1>
        </Link>

        {/* Navbar Links */}
        <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/sell">Sell</Link></li>
          <div className="navbar-spacer"></div> {/* Added gap */}
          {isLoggedIn && (
            <>
              <li><Link to="/favorites"><Heart size={20} /> Favorites</Link></li>
              <li><Link to="/cart"><ShoppingCart size={20} /> Cart</Link></li>
            </>
          )}
        </ul>

        {/* Right Icons */}
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
          <button className="navbar-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={26} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
