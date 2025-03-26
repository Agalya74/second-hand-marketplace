import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./StatusPage.css";

const StatusPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // ✅ Fetch data from localStorage on component mount
  useEffect(() => {
    const favData = JSON.parse(localStorage.getItem("favorites")) || [];
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    setFavorites(favData);
    setCart(cartData);
  }, []);

  return (
    <div className="status-container">
      <h1>🛒 Your Marketplace Status</h1>

      <div className="status-box">
        <h2>❤️ Favorites</h2>
        <p>Total: {favorites.length}</p>
        <ul>
          {favorites.map((item, index) => (
            <li key={index}>
              <Link to={`/products/${item._id}`}>
                {item.name} - ₹{item.price}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="status-box">
        <h2>🛍️ Cart</h2>
        <p>Total: {cart.length}</p>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <Link to={`/products/${item._id}`}>
                {item.name} - ₹{item.price}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/" className="back-btn">⬅️ Back to Home</Link>
    </div>
  );
};

export default StatusPage;
