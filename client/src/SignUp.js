import React, { useState } from "react";
import backgroundImage from "./assets/space.png"; // 배경 이미지
import logoImage from "./assets/initiallogo.png"; // 로고 이미지

function SignUp() {
  const [formData, setFormData] = useState({
    nickname: "",
    id: "",
    password: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    console.log("User Data:", formData);
    alert("Sign Up Successful!");
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="auth-box">
        <div className="logo-container">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </div>
        <h1>Sign Up</h1>
        <p>Create your account to get started!</p>
        <label>Nickname:</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="Enter your nickname"
        />
        <label>ID:</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Enter your ID"
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
}

export default SignUp;
