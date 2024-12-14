import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import "./SignUp.css";
import initialLogo from "./assets/initiallogo.png";
import spaceBackground from "./assets/space.png";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    id: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 시작 페이지로 이동하기 위한 훅

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.id || !formData.email || !formData.password) {
      setMessage("All fields are required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/api/signup", {
        username: formData.username,
        id: formData.id,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phoneNumber,
      });
      setMessage(response.data.message);
      localStorage.setItem("username", formData.username);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  // 로고 클릭 시 시작 페이지로 이동
  const handleLogoClick = () => {
    navigate("/"); // "/" 경로로 이동
  };

  return (
    <div className="signup-container">
      <img src={spaceBackground} alt="Background" className="signup-background" />
      <div className="signup-content">
        <img
          src={initialLogo}
          alt="Logo"
          className="signup-logo"
          onClick={handleLogoClick} // 클릭 이벤트 추가
        />
        <h1>Create Your Account</h1>
        <p>Sign up to get started!</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="signup-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="id"
            placeholder="ID"
            className="signup-input"
            value={formData.id}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="signup-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="signup-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            className="signup-input"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        {message && <p className="signup-message">{message}</p>}
        <p className="signup-footer">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;