import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProduct(storedProducts[id]);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;
