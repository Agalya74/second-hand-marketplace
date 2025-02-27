import React, { useState } from "react";
import "./Products.css";
import { allProducts } from "../data/productsData"; // Import shared product data

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(allProducts); // Store products in state

  // Filtered product list based on search and category
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase().trim()) &&
      (category === "" || product.category === category)
  );

  // Function to delete a product
  const handleDelete = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div className="container">
      <h2 className="title">Explore Products</h2>

      {/* Search and Category Filter */}
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
          <option value="Sports">Sports</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>

            {/* View Details Button */}
            <button className="view-details-btn" onClick={() => setSelectedProduct(product)}>
              View Details
            </button>
            {/* Delete Button */}
            <button className="delete-btn" onClick={() => handleDelete(product.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal Popup for Product Details */}
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setSelectedProduct(null)}>&times;</span>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-image" />
            <h2>{selectedProduct.name}</h2>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
