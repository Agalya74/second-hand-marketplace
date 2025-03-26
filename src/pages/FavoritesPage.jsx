import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductList.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch favorites
  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavorites(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [navigate]);

  // ✅ Toggle favorite status
  const toggleFavorite = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to manage favorites.");
      navigate("/login");
      return;
    }

    try {
      const isFavorited = favorites.some((fav) => fav._id === productId);

      if (isFavorited) {
        await axios.delete(`http://localhost:5000/api/favorites/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(
          "http://localhost:5000/api/favorites",
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // ✅ Refetch favorites immediately to update UI
      fetchFavorites();
    } catch (error) {
      console.error("❌ Failed to update favorites:", error);
    }
  };

  return (
    <div className="product-list">
      <h2>❤️ Your Favorite Products</h2>

      {loading ? (
        <p>⏳ Loading...</p>
      ) : (
        <div className="products-grid">
          {favorites.length > 0 ? (
            favorites.map((product) => (
              <div key={product._id} className="product-card">
                <button
                  className="heart-btn"
                  onClick={() => toggleFavorite(product._id)}
                >
                  {favorites.some((fav) => fav._id === product._id) ? "❤️" : "🤍"}
                </button>

                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
              </div>
            ))
          ) : (
            <p>No favorites yet!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
