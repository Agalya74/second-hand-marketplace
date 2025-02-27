import React from "react";
import "./Signup.css"; // Import the CSS file

const Signup = () => {
  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>

        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      <p className="login-text">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
