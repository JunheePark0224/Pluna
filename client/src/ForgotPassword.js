import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css"; // 스타일링 파일
import backgroundImage from "./assets/space.png"; // 배경 이미지
import initialLogo from "./assets/initiallogo.png"; // 로고 이미지

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Failed to send reset email.");
    }
  };

  return (
    <div className="forgot-password-container">
      <img src={backgroundImage} alt="Background" className="forgot-password-background" />
      <div className="forgot-password-content">
        <img src={initialLogo} alt="Logo" className="forgot-password-logo" />
        <h1>Forgot Password</h1>
        <p>Enter your email to receive a password reset link.</p>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
            className="forgot-password-input"
          />
          <button type="submit" className="forgot-password-button">
            Send Reset Link
          </button>
        </form>
        {message && <p className="forgot-password-message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;