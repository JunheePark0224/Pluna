import React, { useState } from "react";
import "./SignUp.css"; // SignUp.css import
import initialLogo from "./assets/initiallogo.png"; // 로고
import spaceBackground from "./assets/space.png"; // 배경 이미지
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

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 모든 필수 필드가 채워졌는지 확인
    if (!formData.username || !formData.id || !formData.email || !formData.password) {
      setMessage("All fields are required");
      return;
    }

    console.log("Sending signup request with:", formData); // 요청 데이터 확인
    try {
      const response = await axios.post("http://localhost:3001/api/signup", {
        username: formData.username,
        id: formData.id,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phoneNumber,
      });
      console.log("Server response:", response.data); // 서버 응답 확인
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message); // 에러 확인
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <img src={spaceBackground} alt="Background" className="signup-background" />
      <div className="signup-content">
        <img src={initialLogo} alt="Logo" className="signup-logo" />
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
