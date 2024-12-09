import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import initialLogo from "./assets/initiallogo.png";
import backgroundImage from "./assets/space.png";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import About from "./About";

function MainPage() {
  const [isAnimating, setIsAnimating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {/* 배경 */}
      <div className="background">
        <img src={backgroundImage} alt="Background" className="background-image" />
      </div>

      {/* 로고 */}
      <div className={`logo ${isAnimating ? "large" : "small"}`}>
        <img src={initialLogo} alt="Initial Logo" className="logo-image" />
      </div>

      {/* About 버튼 */}
      <div className="about-button" onClick={() => navigate("/about")}>
        About Pluna
      </div>

      {/* 콘텐츠 */}
      <div className="content">
        <h1 className="main-title">Pluna</h1>
        <div className="button-row">
          <p>If this is your first time,</p>
          <button className="button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
        <div className="button-row">
          <p>If you already have an account,</p>
          <button className="button" onClick={() => navigate("/login")}>
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
