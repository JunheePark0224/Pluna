import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import initialLogo from "./assets/initiallogo.png";
import backgroundImage from "./assets/space.png";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import About from "./About";

function MainPage() {
  const [isAnimating, setIsAnimating] = useState(true); // 애니메이션 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    // 애니메이션이 1.5초 후 종료되도록 설정
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // 1.5초 후 애니메이션 종료

    return () => clearTimeout(timer); // 타이머 정리
  }, []);

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogIn = () => {
    navigate("/login");
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

      {/* About Pluna 버튼 */}
      <div className="about-button" onClick={handleAboutClick}>
        About Pluna
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
