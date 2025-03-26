import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {    // ✅ Added setIsAuthenticated prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Check if already logged in (on component mount)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      navigate("/");    // Redirect to home if already logged in
    }
  }, [navigate, setIsAuthenticated]);

  // ✅ Handle Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ Correct backend URL for login
      const response = await axios.post(
        "https://marketplace-ipxk.onrender.com/api/users/login",
        { email, password }
      );

      console.log("🔥 Login successful:", response.data);

      // ✅ Store token and user ID safely
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user?._id || response.data.userId);

      // ✅ Set authentication state globally
      setIsAuthenticated(true);

      // ✅ Redirect to home or previous path
      navigate("/");

    } catch (error) {
      console.error("❌ Error:", error.response?.data?.message || "Login failed");
      setError(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">🔑 Login</h2>

      <form onSubmit={handleLogin}>
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

        <button type="submit" className="login-button">Login</button>
      </form>

      <p className="signup-text">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
