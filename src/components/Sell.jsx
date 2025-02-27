import React, { useState } from "react";
import "./Sell.css"; // Import CSS file

const Sell = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    
    // Add new product to the list
    const updatedProducts = [...storedProducts, formData];
  
    // Save back to localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  
    alert("Product submitted successfully!");
  
    // Optional: Redirect to Products page after submission
    window.location.href = "/products";
  };
  

  return (
    <div className="container">
      <h2 className="title">Sell Your Product</h2>
      
      <form className="form-container" onSubmit={handleSubmit}>
        <label className="label">Product Name</label>
        <input type="text" name="name" required className="input-field" onChange={handleChange} />

        <label className="label">Price (₹)</label>
        <input type="number" name="price" required className="input-field" onChange={handleChange} />

        <label className="label">Category</label>
        <select name="category" required className="input-field" onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Furniture">Furniture</option>
        </select>

        <label className="label">Image URL</label>
        <input type="text" name="image" required className="input-field" onChange={handleChange} />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Sell;
