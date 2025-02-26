import React, { useState, useEffect } from 'react';
import './SellProduct.css';

const SellProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    alert('Product Listed Successfully!');
    setProduct({ name: '', price: '', description: '', image: '' });
  };

  return (
    <div className="sell-product">
      <h2>Sell Your Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price (₹)" value={product.price} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} required />
        <textarea name="description" placeholder="Product Description" value={product.description} onChange={handleChange} required></textarea>
        <button type="submit">List Product</button>
      </form>
    </div>
  );
};

export default SellProduct;
