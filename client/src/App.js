import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import initialLogo from "./assets/initiallogo.png";
import backgroundImage from "./assets/space.png";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import About from "./About";
import InputData from "./InputData"; // InputData 컴포넌트 추가
import CalendarPage from "./CalendarPage"; // CalendarPage 사용 중
import ForgotPassword from "./ForgotPassword"; // ForgotPassword 컴포넌트 추가

function MainPage() {
  const [isAnimating, setIsAnimating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {/* Background */}
      <div className="background">
        <img src={backgroundImage} alt="Background" className="background-image" />
      </div>

      {/* Logo */}
      <div className={`logo ${isAnimating ? "large" : "small"}`}>
        <img src={initialLogo} alt="Initial Logo" className="logo-image" />
      </div>

      {/* About Button */}
      <div className="about-button" onClick={() => navigate("/about")}>
        About Pluna
      </div>

      {/* Content */}
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
        <Route path="/inputdata" element={<InputData />} /> {/* InputData 라우팅 추가 */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ForgotPassword 라우팅 추가 */}
        <Route path="/calendar" element={<CalendarPage />} /> {/* CalendarPage 라우트 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
