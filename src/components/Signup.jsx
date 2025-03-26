import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // For navigation after signup
import "./Signup.css";

const Signup = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // ✅ Use the deployed API URL
      const response = await axios.post(
        "https://marketplace-ipxk.onrender.com/api/users/register",
        { name, email, password }
      );

      console.log("🔥 Signup successful:", response.data);

      // ✅ Store the token and user ID in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user?._id || response.data.userId);

      // ✅ Set authentication to true
      setIsAuthenticated(true);

      // ✅ Redirect to the home page
      navigate("/");

    } catch (error) {
      console.error("❌ Signup Error:", error.response?.data?.message || "Signup failed");

      // ✅ Display server error message or fallback message
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">📝 Sign Up</h2>
      
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">❌ {error}</p>}

        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      <p className="login-text">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
