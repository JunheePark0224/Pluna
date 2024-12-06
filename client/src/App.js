import React, { useState, useEffect } from "react";
import "./App.css";
import initialLogo from "./assets/initiallogo.png";
import backgroundImage from "./assets/space.png";

function App() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // 애니메이션이 3초 후 종료

    return () => clearTimeout(timer);
  }, []);

  const handleSignUp = () => {
    alert("Sign Up button clicked!"); // 회원가입 로직 추가
  };

  const handleLogIn = () => {
    alert("Log In button clicked!"); // 로그인 로직 추가
  };

  return (
    <div className="App">
      {/* 배경 */}
      <div className="background">
        <img
          src={backgroundImage}
          alt="Background"
          className="background-image"
        />
      </div>

      {/* 로고 */}
      <div className={`logo ${isAnimating ? "large" : "small"}`}>
        <img src={initialLogo} alt="Initial Logo" className="logo-image" />
      </div>

      {/* 콘텐츠 */}
      <div className="content">
        <h1 className="main-title">Pluna</h1>
        <div className="button-row">
          <p>If this is your first time,</p>
          <button className="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
        <div className="button-row">
          <p>If you already have an account,</p>
          <button className="button" onClick={handleLogIn}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
