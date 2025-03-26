import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductList.css";

const ProductList = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    // ✅ Load favorites from local storage on page load
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("⚠️ No token, redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        // ✅ Fetch Products
        const productResponse = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const fetchedProducts = Array.isArray(productResponse.data)
          ? productResponse.data
          : productResponse.data.products || [];

        setProducts(fetchedProducts);
        setLoading(false);

      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // ✅ Toggle Favorites Locally
  const toggleFavorite = (productId) => {
    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // ✅ Toggle Cart
  const toggleCart = (product) => {
    const isInCart = cart.some((item) => item._id === product._id);

    const updatedCart = isInCart
      ? cart.filter((item) => item._id !== product._id)
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Buy Now Logic
  const handleBuyNow = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);

    const updatedCart = existingItem
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  // ✅ Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      console.error("❌ Products is not an array:", products);
      return [];
    }

    return products
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
  }, [products, search, sortOrder]);

  return (
    <div className="product-list">
      {/* ✅ Navbar */}
      <div className="navbar">
        <h2>🛒 Available Products</h2>
        <div className="navbar-links">
          <Link to="/favorites" className="nav-link">❤️ Favorites</Link>
          <Link to="/cart" className="nav-link">🛒 Cart</Link>
        </div>
      </div>

      {/* ✅ Search & Sort */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="🔍 Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* ✅ Product Listing */}
      {loading ? (
        <p className="loading">⏳ Loading products...</p>
      ) : products && products.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product._id}>
              
              {/* ✅ Emoji Icons */}
              <div className="emoji-icons">
                <span
                  className={`emoji ${favorites.includes(product._id) ? "favorite" : ""}`}
                  onClick={() => toggleFavorite(product._id)}
                >
                  {favorites.includes(product._id) ? "❤️" : "🤍"}
                </span>
                <span
                  className={`emoji ${cart.some((item) => item._id === product._id) ? "in-cart" : ""}`}
                  onClick={() => toggleCart(product)}
                >
                  🛒
                </span>
              </div>

              {/* ✅ Image Display */}
              <img
                src={product.imageUrl || `${process.env.PUBLIC_URL}/images/default.jpg`}
                alt={product.name || "Product"}
                onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/images/default.jpg`)}
              />

              <h3>{product.name || "No Name"}</h3>
              <p>₹{product.price !== undefined ? product.price : "N/A"}</p>

              <div className="product-actions">
                <Link to={`/products/${product._id}`} className="view-btn">👁️ View Details</Link>
                <div className="product-btns">
                  <button 
                    className="buy-btn" 
                    onClick={() => handleBuyNow(product)}
                  >
                    ⚡ Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">❌ No products listed yet. Be the first to sell something!</p>
      )}
    </div>
  );
};

export default ProductList;
