import React, { useState } from "react";
import "./InputData.css";
import initialLogo from "./assets/initiallogo.png"; // 로고
import spaceBackground from "./assets/space.png"; // 배경 이미지

const InputData = () => {
  const [step, setStep] = useState(1); // 현재 단계
  const [subject, setSubject] = useState(""); // 과목 입력
  const [studyStyle1, setStudyStyle1] = useState({
    examDate: "",
    examRange: "",
    difficulty: "",
  }); // 학습 스타일 1 입력
  const [studyStyle2, setStudyStyle2] = useState({
    studyPreference: "",
    breakPreference: "",
    dailyGoal: "",
    schedule: "",
  }); // 학습 스타일 2 입력
  const [message, setMessage] = useState("");

  const handleNextStep = () => {
    if (step === 1 && !subject) {
      setMessage("Please select a subject.");
      return;
    }
    if (
      step === 2 &&
      (!studyStyle1.examDate || !studyStyle1.examRange || !studyStyle1.difficulty)
    ) {
      setMessage("Please fill out all fields in Study Style 1.");
      return;
    }
    setMessage(""); // 오류 메시지 초기화
    setStep(step + 1);
  };

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      !studyStyle2.studyPreference ||
      !studyStyle2.breakPreference ||
      !studyStyle2.dailyGoal ||
      !studyStyle2.schedule
    ) {
      setMessage("Please complete all fields in Study Style 2.");
      return;
    }
    setMessage("Study Plan submitted successfully!");
    console.log({
      subject,
      studyStyle1,
      studyStyle2,
    });
  };

  return (
    <div className="inputdata-container">
      <img src={spaceBackground} alt="Background" className="inputdata-background" />
      <div className="inputdata-box">
        <img src={initialLogo} alt="Logo" className="inputdata-logo" />
        <h1>Pluna Study Plan</h1>
        {message && <p className="inputdata-message">{message}</p>}
        <div className="steps">
          <span className={step === 1 ? "active-step" : ""}>Step 1</span>
          <span className={step === 2 ? "active-step" : ""}>Step 2</span>
          <span className={step === 3 ? "active-step" : ""}>Step 3</span>
        </div>
        {step === 1 && (
          <div>
            <h2>Choose Your Subject</h2>
            <input
              type="text"
              placeholder="Enter your subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="inputdata-input"
            />
            <button className="inputdata-button" onClick={handleNextStep}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>Study Style 1</h2>
            <input
              type="text"
              name="examDate"
              placeholder="Exam Date (e.g., 2024-12-10)"
              value={studyStyle1.examDate}
              onChange={(e) => handleInputChange(e, setStudyStyle1)}
              className="inputdata-input"
            />
            <input
              type="text"
              name="examRange"
              placeholder="Exam Range"
              value={studyStyle1.examRange}
              onChange={(e) => handleInputChange(e, setStudyStyle1)}
              className="inputdata-input"
            />
            <input
              type="text"
              name="difficulty"
              placeholder="Difficulty (e.g., Easy, Medium, Hard)"
              value={studyStyle1.difficulty}
              onChange={(e) => handleInputChange(e, setStudyStyle1)}
              className="inputdata-input"
            />
            <button className="inputdata-button" onClick={handleNextStep}>
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2>Study Style 2</h2>
            <input
              type="text"
              name="studyPreference"
              placeholder="Study Preference"
              value={studyStyle2.studyPreference}
              onChange={(e) => handleInputChange(e, setStudyStyle2)}
              className="inputdata-input"
            />
            <input
              type="text"
              name="breakPreference"
              placeholder="Break Preference"
              value={studyStyle2.breakPreference}
              onChange={(e) => handleInputChange(e, setStudyStyle2)}
              className="inputdata-input"
            />
            <input
              type="text"
              name="dailyGoal"
              placeholder="Daily Study Goal"
              value={studyStyle2.dailyGoal}
              onChange={(e) => handleInputChange(e, setStudyStyle2)}
              className="inputdata-input"
            />
            <input
              type="text"
              name="schedule"
              placeholder="Schedule"
              value={studyStyle2.schedule}
              onChange={(e) => handleInputChange(e, setStudyStyle2)}
              className="inputdata-input"
            />
            <button className="inputdata-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputData;
