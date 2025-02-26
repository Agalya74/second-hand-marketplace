import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setTimeout(() => {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      setProducts(storedProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtering & Sorting Logic
  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  return (
    <div className="product-list">
      <h2>Available Products</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Sorting Dropdown */}
      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

      {loading ? (
        <p className="loading">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products listed yet. Be the first to sell something!</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <Link to={`/products/${index}`} className="view-details">View Details</Link>
              <button className="buy-now">Buy Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
