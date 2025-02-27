import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Sell from "./components/Sell";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import "./App.css";

function App() {
  // State to track user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State for dark/light mode
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Apply theme change & persist in local storage
  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <div className={`app-container ${theme}`}>
        {/* Pass authentication state & theme toggle function to Navbar */}
        <Navbar isAuthenticated={isAuthenticated} toggleTheme={toggleTheme} theme={theme} />

        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Removed toggleTheme prop */}
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/sell" element={<Sell />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
