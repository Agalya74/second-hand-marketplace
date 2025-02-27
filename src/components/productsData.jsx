import cameraImage from '../assets/images/camera.jpg'
import laptopImage from '../assets/images/laptop.jpg'
import bicycleImage from '../assets/images/bicycle.jpg'
import clothingImage from '../assets/images/clothing.jpg'
import booksImage from '../assets/images/books.jpg'
import furnitureImage from '../assets/images/furniture.jpg'

export const allProducts = [
  { id: 1, name: "Laptop", price: 25000, category: "Electronics", image: laptopImage, description: "Powerful laptop with Intel i7 processor and 16GB RAM." },
  { id: 2, name: "T-shirt", price: 500, category: "Clothing", image: clothingImage, description: "Comfortable cotton t-shirt available in multiple colors." },
  { id: 3, name: "Book: Java Basics", price: 300, category: "Books", image: booksImage, description: "A beginner-friendly Java programming book." },
  { id: 4, name: "Sofa", price: 10000, category: "Furniture", image: furnitureImage, description: "Luxury 3-seater sofa with premium fabric." },

  // ✅ Add Popular Items here
  { id: 5, name: "Camera", price: 5000, category: "Electronics", image: cameraImage, description: "High-resolution digital camera with zoom." },
  { id: 6, name: "Bicycle", price: 3000, category: "Sports", image: bicycleImage, description: "Lightweight and durable bicycle for all terrains." }
];
