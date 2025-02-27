import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Import CSS file

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="product-card-link">
      <div className="product-card">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
        />
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">
          {product.description || 'No description available'}
        </p>
        <p className="product-price">₹{product.price}</p>
        <button className="product-button" aria-label={`View details of ${product.name}`}>
          View Details
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
