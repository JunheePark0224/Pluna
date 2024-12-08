import React from "react";
import "./SignUp.css";
import initialLogo from "./assets/initiallogo.png"; // 로고
import spaceBackground from "./assets/space.png"; // 배경 이미지

const SignUp = () => {
  return (
    <div className="signup-container">
      <img src={spaceBackground} alt="Background" className="signup-background" />
      <div className="signup-content">
        <img src={initialLogo} alt="Logo" className="signup-logo" />
        <h1>Create Your Account</h1>
        <p>Sign up to get started!</p>
        <form className="signup-form">
          <input
            type="text"
            placeholder="Username"
            className="signup-input"
          />
          <input
            type="text"
            placeholder="ID"
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Email"
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="signup-input"
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="signup-footer">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
