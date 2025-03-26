import laptopImage from '../assets/images/laptop.jpg';
import tshirtImage from '../assets/images/tshirt.jpg';
import bookImage from '../assets/images/javabook.jpg';
import sofaImage from '../assets/images/sofa.jpg';
import cameraImage from '../assets/images/camera.jpg';
import bicycleImage from '../assets/images/bicycle.jpg';

export const sampleProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 25000,
    oldPrice: 30000,               // ✅ Old price
    discount: 15,                   // ✅ Discount percentage
    category: "Electronics",
    image: laptopImage,
    description: "Powerful laptop with Intel i7 processor, 16GB RAM, and 512GB SSD. Ideal for gaming and programming."
  },
  {
    id: 2,
    name: "T-shirt",
    price: 500,
    oldPrice: 700,
    discount: 30,
    category: "Clothing",
    image: tshirtImage,
    description: "Comfortable cotton t-shirt available in multiple colors. Perfect for casual wear."
  },
  {
    id: 3,
    name: "Book: Java Basics",
    price: 300,
    oldPrice: 400,
    discount: 25,
    category: "Books",
    image: bookImage,
    description: "A beginner-friendly Java programming book covering OOP concepts, data structures, and practical examples."
  },
  {
    id: 4,
    name: "Sofa",
    price: 10000,
    oldPrice: 12000,
    discount: 17,
    category: "Furniture",
    image: sofaImage,
    description: "Luxury 3-seater sofa with premium fabric and soft cushioning. Perfect for your living room."
  },
  {
    id: 5,
    name: "Camera",
    price: 5000,
    oldPrice: 7000,
    discount: 29,
    category: "Electronics",
    image: cameraImage,
    description: "High-quality DSLR camera for photography enthusiasts. Features 24MP resolution and 4K recording."
  },
  {
    id: 6,
    name: "Bicycle",
    price: 3000,
    oldPrice: 3500,
    discount: 14,
    category: "Sports",
    image: bicycleImage,
    description: "Durable and lightweight bicycle, perfect for city rides and off-road trails."
  }
];
