import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu } from "lucide-react";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <ShoppingCart size={28} />
          <h1>Second-Hand Marketplace</h1>
        </Link>

        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/sell">Sell</Link></li>
        </ul>

        <Link to="/login" className="navbar-login">
          <User size={20} />
          <span>Login</span>
        </Link>

        <button className="navbar-menu">
          <Menu size={26} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
