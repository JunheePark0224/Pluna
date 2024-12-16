import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate import
import "./LogIn.css";
import initialLogo from "./assets/initiallogo.png";
import spaceBackground from "./assets/space.png";

const LogIn = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        id: formData.id,
        password: formData.password,
      });
      setMessage(response.data.message);

      if (response.status === 200) {
        localStorage.setItem("id", formData.id);
        localStorage.setItem("username", response.data.username);
        navigate("/inputdata");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  // 로고 클릭 시 메인 화면으로 이동
  const handleLogoClick = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <div className="login-container">
      <img src={spaceBackground} alt="Background" className="login-background" />
      <div className="login-content">
        <img
          src={initialLogo}
          alt="Logo"
          className="login-logo"
          onClick={handleLogoClick} // 클릭 이벤트 추가
        />
        <h1>Welcome Back</h1>
        <p>Log in to access your account</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="ID"
            className="login-input"
            value={formData.id}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        {message && <p className="login-message">{message}</p>}
        <p className="login-footer">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
        <p className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
