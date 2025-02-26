import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import the CSS file

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    <main className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <h2>Buy & Sell with Confidence</h2>
        <p>Get great deals on second-hand goods or sell your own, hassle-free.</p>
        <Link to="/products" className="explore-btn">Explore Now</Link>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h3>Categories</h3>
        <div className="category-grid">
          {[
            { name: "📱 Electronics", img: "https://source.unsplash.com/300x200/?electronics" },
            { name: "👕 Clothing", img: "https://source.unsplash.com/300x200/?clothing" },
            { name: "📚 Books", img: "https://source.unsplash.com/300x200/?books" },
            { name: "🛋️ Furniture", img: "https://source.unsplash.com/300x200/?furniture" }
          ].map((category, index) => (
            <div key={index} className="category-card">
              <img src={category.img} alt={category.name} />
              <h4>{category.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="popular-items">
        <h3>Popular Items</h3>
        <div className="popular-grid">
          {[
            { name: "📷 Camera - ₹5000", img: "https://source.unsplash.com/300x200/?camera" },
            { name: "💻 Laptop - ₹25000", img: "https://source.unsplash.com/300x200/?laptop" },
            { name: "🚲 Bicycle - ₹3000", img: "https://source.unsplash.com/300x200/?bicycle" }
          ].map((item, index) => (
            <div key={index} className="popular-card">
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
              <Link to="/products" className="view-btn">View</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
