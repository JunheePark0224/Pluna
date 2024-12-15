import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate import
import "./LogIn.css"; // LogIn.css import
import initialLogo from "./assets/initiallogo.png"; // 로고
import spaceBackground from "./assets/space.png"; // 배경 이미지

const LogIn = () => {
  const [formData, setFormData] = useState({
    id: "", // ID로 변경
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login request with:", formData); // 요청 로그 추가
      const response = await axios.post("http://localhost:3000/api/login", {
        id: formData.id,
        password: formData.password,
      });
      console.log("Login response:", response.data);
      setMessage(response.data.message); // 성공 메시지

      if (response.status === 200) {
        console.log("Username received:", response.data.username);
        localStorage.setItem("id", formData.id); // ID 저장
        localStorage.setItem("username", response.data.username); // 서버에서 반환된 username 저장
        // 로그인 성공 시 InputData 페이지로 이동
        navigate("/inputdata"); // "inputdata" 경로로 이동
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Login failed"); // 에러 메시지
    }
  };

  return (
    <div className="login-container">
      <img src={spaceBackground} alt="Background" className="login-background" />
      <div className="login-content">
        <img src={initialLogo} alt="Logo" className="login-logo" />
        <h1>Welcome Back</h1>
        <p>Log in to access your account</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text" // ID 입력 필드
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
      </div>
    </div>
  );
};

export default LogIn;
