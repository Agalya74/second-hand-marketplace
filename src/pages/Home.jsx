import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">

      {/* ✅ Hero Section */}
      <h2>Welcome to Second-Hand Marketplace</h2>
      <p>Buy and sell used goods easily!</p>

      {/* ✅ Popular Categories */}
      <section className="categories-section">
        <h3>Popular Categories</h3>
        <div className="categories-grid">
          <Link to="/products?category=electronics" className="category-card">
            <img src="/images/electronics.jpg" alt="Electronics" />
            <p>Electronics</p>
          </Link>

          <Link to="/products?category=furniture" className="category-card">
            <img src="/images/furniture.jpg" alt="Furniture" />
            <p>Furniture</p>
          </Link>

          <Link to="/products?category=fashion" className="category-card">
            <img src="/images/fashion.jpg" alt="Fashion" />
            <p>Fashion</p>
          </Link>

          <Link to="/products?category=books" className="category-card">
            <img src="/images/books.jpg" alt="Books" />
            <p>Books</p>
          </Link>
        </div>
      </section>

      {/* ✅ Popular Items */}
      <section className="popular-items-section">
        <h3>Popular Items</h3>
        <div className="popular-items-grid">
          <div className="item-card">
            <img src="/images/laptop.jpg" alt="Laptop" />
            <h4>Lenovo ThinkPad</h4>
            <p>₹18,000</p>
          </div>

          <div className="item-card">
            <img src="/images/phone.jpg" alt="Phone" />
            <h4>iPhone 11</h4>
            <p>₹25,000</p>
          </div>

          <div className="item-card">
            <img src="/images/sofa.jpg" alt="Sofa" />
            <h4>3-Seater Sofa</h4>
            <p>₹7,500</p>
          </div>

          <div className="item-card">
            <img src="/images/guitar.jpg" alt="Guitar" />
            <h4>Acoustic Guitar</h4>
            <p>₹4,500</p>
          </div>
        </div>

        {/* ✅ View All Products Button */}
        <Link to="/products" className="view-all-btn">View All Products</Link>
      </section>

    </div>
  );
};

export default Home;
