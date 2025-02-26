import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">&copy; 2025 Second-Hand Marketplace</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <Facebook size={22} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <Twitter size={22} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <Instagram size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
