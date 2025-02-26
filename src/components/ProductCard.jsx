import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Import CSS file

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
      />
      <h3 className="product-title">{product.name}</h3>
      <p className="product-description">
        {product.description || 'No description available'}
      </p>
      <p className="product-price">₹{product.price}</p>
      <Link to={`/products/${product.id}`}>
        <button className="product-button">View Details</button>
      </Link>
    </div>
  );
};

export default ProductCard;
