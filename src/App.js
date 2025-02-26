import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Products from "./components/Products";
import Sell from "./components/Sell";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sell" element={<Sell />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
