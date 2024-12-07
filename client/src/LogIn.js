import React from "react";
import "./Login.css";
import initialLogo from "./assets/initiallogo.png"; // 로고
import spaceBackground from "./assets/space.png"; // 배경 이미지

const Login = () => {
  return (
    <div className="login-container">
      <img src={spaceBackground} alt="Background" className="login-background" />
      <div className="login-content">
        <img src={initialLogo} alt="Logo" className="login-logo" />
        <h1>Welcome Back</h1>
        <p>Log in to access your account</p>
        <form className="login-form">
          <input
            type="text"
            placeholder="Username or Email"
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;