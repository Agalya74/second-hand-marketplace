import React, { useState } from "react";
import "./Products.css"; // Import CSS file

const sampleProducts = [
  { id: 1, name: "Laptop", price: 25000, category: "Electronics", image: "https://via.placeholder.com/150" },
  { id: 2, name: "T-shirt", price: 500, category: "Clothing", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Book: Java Basics", price: 300, category: "Books", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Sofa", price: 10000, category: "Furniture", image: "https://via.placeholder.com/150" },
];

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredProducts = sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || product.category === category)
  );

  return (
    <div className="container">
      <h2 className="title">Explore Products</h2>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select
          className="category-dropdown"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
            <button className="view-details-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
