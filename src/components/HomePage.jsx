import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; 
import cameraImage from '../assets/images/camera.jpg'
import laptopImage from '../assets/images/laptop.jpg'
import bicycleImage from '../assets/images/bicycle.jpg'
import electronicsImage from '../assets/images/electronics.png'
import clothingImage from '../assets/images/clothing.jpg'
import booksImage from '../assets/images/books.jpg'
import furnitureImage from '../assets/images/furniture.jpg'

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
            { name: "📱 Electronics", img: electronicsImage },
            { name: "👕 Clothing", img: clothingImage },
            { name: "📚 Books", img: booksImage },
            { name: "🛋️ Furniture", img: furnitureImage }
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
            { name: "📷 Camera - ₹5000", img: cameraImage  },
            { name: "💻 Laptop - ₹25000", img: laptopImage },
            { name: "🚲 Bicycle - ₹3000", img: bicycleImage }
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
