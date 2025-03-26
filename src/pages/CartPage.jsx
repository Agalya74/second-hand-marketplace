import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CartPage.css";  // ✅ Use existing styles

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Retrieve token from localStorage
  const token = localStorage.getItem("token");

  // ✅ Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        console.warn("⚠️ User not authenticated. Redirecting...");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/carts`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCartItems(response.data);

      } catch (error) {
        console.error("❌ Error fetching cart:", error);
        setError("Failed to load cart items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token, navigate]);

  // ✅ Update Cart Quantity
  const updateQuantity = async (id, newQuantity) => {
    if (!token) return;

    const quantity = Math.max(newQuantity, 1);  // Prevent 0 or negative quantities

    try {
      const response = await axios.put(
        `http://localhost:5000/api/cart/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems(response.data);  // ✅ Update from backend response

    } catch (error) {
      console.error("❌ Error updating quantity:", error);
      setError("Failed to update quantity. Please try again.");
    }
  };

  // ✅ Remove Item from Cart
  const removeFromCart = async (id) => {
    if (!token) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCartItems(response.data);  // ✅ Update from backend response

    } catch (error) {
      console.error("❌ Error removing item:", error);
      setError("Failed to remove item. Please try again.");
    }
  };

  // ✅ Calculate Total Price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * (item.price || 0),
    0
  );

  // ✅ Proceed to Checkout (Clear Cart After)
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before checkout.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/checkout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Order placed successfully!");

      // Clear cart after checkout
      setCartItems([]);
      navigate("/");

    } catch (error) {
      console.error("❌ Checkout failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (loading) return <p>⏳ Loading cart...</p>;
  if (error) return <p className="error-message">❌ {error}</p>;

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty. <Link to="/products">Shop now!</Link>
        </p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              
              {/* ✅ Image Handling */}
              <img
                src={item.imageUrl || `${process.env.PUBLIC_URL}/images/default.jpg`} 
                alt={item.name || "Product Image"}
                onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/images/default.jpg`)}
                className="cart-item-image"
              />

              <div className="item-details">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                {/* ✅ Quantity Selector */}
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                    ➖
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    ➕
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Cart Summary */}
      <div className="cart-summary">
        <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
        <div className="cart-buttons">
          <Link to="/products" className="btn continue-btn">⬅️ Continue Shopping</Link>
          <button className="btn checkout-btn" onClick={handleCheckout}>
            ✅ Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
