import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css"; 

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle Category Navigation
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <main className="homepage">

      {/* ✅ Hero Section */}
      <section className="hero">
        <h2>Buy & Sell with Confidence</h2>
        <p>Get great deals on second-hand goods or sell your own, hassle-free.</p>
        <Link to="/products" className="explore-btn">Explore Now</Link>
      </section>

      {/* ✅ Categories Section */}
      <section className="categories">
        <h3>Popular Categories</h3>
        <div className="category-grid">
          {[
            { name: "Electronics", img: `${process.env.PUBLIC_URL}/images/camera.jpg` },
            { name: "Clothing", img: `${process.env.PUBLIC_URL}/images/tshirt.jpg` },
            { name: "Books", img: `${process.env.PUBLIC_URL}/images/javabook.jpg` },
            { name: "Furniture", img: `${process.env.PUBLIC_URL}/images/sofa.jpg` }
          ].map((category, index) => (
            <div 
              key={index} 
              className="category-card" 
              onClick={() => handleCategoryClick(category.name.toLowerCase())}
            >
              <img src={category.img} alt={category.name} />
              <h4>{category.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Popular Items Section */}
      <section className="popular-items">
        <h3>Popular Items</h3>
        <div className="popular-grid">
          {[
            { name: "Camera", price: "₹5000", img: `${process.env.PUBLIC_URL}/images/camera.jpg` },
            { name: "Laptop", price: "₹25000", img: `${process.env.PUBLIC_URL}/images/laptop.jpg` },
            { name: "Bicycle", price: "₹3000", img: `${process.env.PUBLIC_URL}/images/bicycle.jpg` }
          ].map((item, index) => (
            <div key={index} className="popular-card">
              <img src={item.img} alt={item.name} />
              <h4>{item.name} - {item.price}</h4>
              <Link to="/products" className="view-btn">View</Link>
            </div>
          ))}
        </div>

        {/* ✅ "View All Products" Button */}
        <Link to="/products" className="view-all-btn">View All Products</Link>
      </section>

    </main>
  );
};

export default HomePage;
