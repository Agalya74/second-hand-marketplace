import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = ({ favorites, setFavorites, cart, setCart, userId }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);  // ✅ Quantity selector

  // ✅ Fetch product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        
        // ✅ Ensure image URL consistency
        const productData = {
          ...response.data,
          imageUrl: response.data.imageUrl || `${process.env.PUBLIC_URL}/images/default.jpg`
        };

        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to fetch product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Toggle Favorites with Backend
  const toggleFavorite = async () => {
    if (!userId) {
      alert("Please log in to add favorites.");
      return;
    }

    const isFavorite = favorites.some((item) => item._id === product._id);

    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:5000/api/favorites/${userId}/${product._id}`);
        setFavorites(favorites.filter((item) => item._id !== product._id));
      } else {
        await axios.post(`http://localhost:5000/api/favorites`, {
          userId,
          productId: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl
        });

        setFavorites([...favorites, product]);
      }
    } catch (error) {
      console.error("❌ Failed to toggle favorites:", error);
    }
  };

  // ✅ Add to Cart with Correct ID Structure
  const addToCart = () => {
    const existingCartItem = cart.find((item) => item._id === product._id);

    const updatedCart = existingCartItem
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...cart, { ...product, quantity }];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${quantity} ${product.name}(s) added to cart!`);
    navigate("/cart");  // ✅ Redirect to cart after adding
  };

  if (loading) return <p>⏳ Loading product...</p>;
  if (!product) return <p>❌ Product not found!</p>;

  // ✅ Calculate the discount
  const discountedPrice = product.oldPrice
    ? ((product.oldPrice - product.price) / product.oldPrice) * 100
    : 0;

  return (
    <div className="product-details">
      
      {/* ✅ Image Section */}
      <div className="product-image">
        <img
          src={product.imageUrl}
          alt={product.name || "Product"}
          onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/images/default.jpg`)}
        />
      </div>

      {/* ✅ Info Section */}
      <div className="product-info">
        <h1>{product.name}</h1>

        {/* ✅ Price Section */}
        <div className="price-section">
          {product.oldPrice && (
            <p className="old-price">₹{product.oldPrice}</p>
          )}
          <p className="new-price">₹{product.price}</p>

          {discountedPrice > 0 ? (
            <span className="discount-badge">{Math.round(discountedPrice)}% OFF</span>
          ) : (
            <span className="no-discount">No Discount</span>
          )}
        </div>

        <p className="description">{product.description}</p>

        <div className="additional-info">
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Availability:</strong> In Stock</p>
          <p><strong>Shipping:</strong> Free Shipping for orders above ₹1000</p>
        </div>

        {/* ✅ Quantity Selector */}
        <div className="quantity-selector">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          />
        </div>

        {/* ✅ Favorites & Add to Cart Buttons */}
        <div className="product-actions">
          <button
            className={`favorite-btn ${favorites.some((item) => item._id === product._id) ? "added" : ""}`}
            onClick={toggleFavorite}
          >
            {favorites.some((item) => item._id === product._id) ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </button>

          <button className="cart-btn" onClick={addToCart}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
