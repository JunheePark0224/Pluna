import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import initialLogo from "./assets/initiallogo.png"; // 로고 추가

function About() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <div className="about-page">
      {/* 뒤로가기 버튼 */}
      <button className="back-button" onClick={handleBack}>
        Back
      </button>

      {/* 로고 */}
      <img src={initialLogo} alt="Pluna Logo" className="about-logo" />
      <h1>About Pluna</h1>
      <p>
        Pluna is a web platform designed to help students plan their studies
        efficiently and achieve their goals. We provide personalized study
        plans tailored to each individual, ensuring effective goal attainment
        and progress tracking.
      </p>
      <p>
        <strong>Our Purpose:</strong> To simplify study planning for students,
        enabling them to focus on what matters most: learning and growth.
      </p>
      <p><strong>Benefits for Users:</strong></p>
      <ul>
        <li>Personalized study plans based on your needs.</li>
        <li>Real-time progress tracking and visualization.</li>
        <li>Improved time management and productivity.</li>
        <li>Access to resources and tips for efficient learning.</li>
      </ul>
    </div>
  );
}

export default About;
