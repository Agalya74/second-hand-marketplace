import laptopImage from '../assets/images/laptop.jpg';
import tshirtImage from '../assets/images/tshirt.jpg';
import bookImage from '../assets/images/javabook.jpg';
import sofaImage from '../assets/images/sofa.jpg';
import cameraImage from '../assets/images/camera.jpg';
import bicycleImage from '../assets/images/bicycle.jpg';

// Sample Products for Products Page
export const sampleProducts = [
  { id: 1, name: "Laptop", price: 25000, category: "Electronics", image: laptopImage, description: "Powerful laptop with Intel i7 processor and 16GB RAM." },
  { id: 2, name: "T-shirt", price: 500, category: "Clothing", image: tshirtImage, description: "Comfortable cotton t-shirt available in multiple colors." },
  { id: 3, name: "Book: Java Basics", price: 300, category: "Books", image: bookImage, description: "A beginner-friendly Java programming book." },
  { id: 4, name: "Sofa", price: 10000, category: "Furniture", image: sofaImage, description: "Luxury 3-seater sofa with premium fabric." },
];

// Popular Items for Home Page
export const popularItems = [
  { id: 5, name: "Camera", price: 5000, category: "Electronics", image: cameraImage, description: "High-quality DSLR camera for photography enthusiasts." },
  { id: 6, name: "Bicycle", price: 3000, category: "Sports", image: bicycleImage, description: "Durable and lightweight bicycle, perfect for city rides." },
  { id: 1, name: "Laptop", price: 25000, category: "Electronics", image: laptopImage, description: "Powerful laptop with Intel i7 processor and 16GB RAM." }, // Already in sampleProducts
];

// Merge products and popular items (Avoiding duplicates)
export const allProducts = [...new Map([...sampleProducts, ...popularItems].map(item => [item.id, item])).values()];
