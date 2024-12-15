import React, { useState } from "react";
import "./InputData.css";
import initialLogo from "./assets/initiallogo.png";
import spaceBackground from "./assets/space.png";

const InputData = () => {
  const [step, setStep] = useState(1);
  const [subjects, setSubjects] = useState([
    { enabled: true, subject: "", range: "", difficulty: "", studyHour: "" },
    { enabled: false, subject: "", range: "", difficulty: "", studyHour: "" },
    { enabled: false, subject: "", range: "", difficulty: "", studyHour: "" },
  ]);
  const [error, setError] = useState("");

  // 입력 필드 상태 업데이트
  const handleInputChange = (index, field, value) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject, i) =>
        i === index ? { ...subject, [field]: value } : subject
      )
    );
  };

  // 체크박스 상태 업데이트
  const handleCheckboxChange = (index) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject, i) =>
        i === index ? { ...subject, enabled: !subject.enabled } : subject
      )
    );
  };

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (
      step === 1 &&
      subjects.some(
        (subject) =>
          subject.enabled &&
          (!subject.subject || !subject.range || !subject.difficulty || !subject.studyHour)
      )
    ) {
      setError("All fields are required to proceed to the next step.");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  // 이전 단계로 이동
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    window.location.href = "/calendar"; // 캘린더 페이지로 이동
  };

  return (
    <div className="inputdata-container">
      <img src={spaceBackground} alt="Background" className="inputdata-background" />
      <div className="inputdata-box">
        <img src={initialLogo} alt="Logo" className="inputdata-logo" />
        <h1>Pluna Study Plan</h1>
        <div className="steps">
          <span className={step === 1 ? "active-step" : ""}>Step 1</span>
          <span className={step === 2 ? "active-step" : ""}>Step 2</span>
          <span className={step === 3 ? "active-step" : ""}>Step 3</span>
        </div>

        {error && <p className="inputdata-error">{error}</p>}

        {step === 1 && (
          <div>
            <p>All fields are required to proceed to the next step.</p>
            <h2>Select and Fill Fields</h2>
            <div className="subjects-grid">
              {subjects.map((subject, index) => (
                <div key={index} className="subject-column">
                  <label>
                    <input
                      type="checkbox"
                      checked={subject.enabled}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    Subject {index + 1}
                  </label>
                  {subject.enabled && (
                    <>
                      <input
                        type="text"
                        placeholder="Subject (e.g., Korean, Math)"
                        value={subject.subject}
                        onChange={(e) => handleInputChange(index, "subject", e.target.value)}
                        className="inputdata-input"
                      />
                      <input
                        type="text"
                        placeholder="Range (e.g., Math I, II)"
                        value={subject.range}
                        onChange={(e) => handleInputChange(index, "range", e.target.value)}
                        className="inputdata-input"
                      />
                      <input
                        type="text"
                        placeholder="Study Hours (e.g., 2 hours)"
                        value={subject.studyHour}
                        onChange={(e) => handleInputChange(index, "studyHour", e.target.value)}
                        className="inputdata-input"
                      />
                      <div className="question-container">
                        <label>Workbook Level</label>
                        <div className="radio-group-horizontal">
                          <span
                            className={`radio-item ${subject.difficulty === "Easy" ? "active" : ""}`}
                            onClick={() => handleInputChange(index, "difficulty", "Easy")}
                          >
                            Easy
                          </span>
                          <span
                            className={`radio-item ${subject.difficulty === "Medium" ? "active" : ""}`}
                            onClick={() => handleInputChange(index, "difficulty", "Medium")}
                          >
                            Medium
                          </span>
                          <span
                            className={`radio-item ${subject.difficulty === "Hard" ? "active" : ""}`}
                            onClick={() => handleInputChange(index, "difficulty", "Hard")}
                          >
                            Hard
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button className="inputdata-button next" onClick={handleNextStep}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p>This step is optional. You can proceed without filling all the fields.</p>
            <h2>Information</h2>
            <div className="inputdata-column">
              {subjects.map(
                (subject, index) =>
                  subject.enabled && (
                    <div key={index} style={{ width: "30%" }}>
                      <h3>{subject.subject || `Subject ${index + 1}`}</h3>
                      <input
                        type="text"
                        placeholder="Exam Date (e.g., 2024-12-10)"
                        className="inputdata-input"
                      />
                      <textarea
                        placeholder="Notes (e.g., 'I don't want to study this subject on Saturdays,' or 'I will focus on this subject 2 weeks before the exam.)"
                        className="inputdata-textarea"
                      />
                    </div>
                  )
              )}
            </div>
            <div className="navigation-buttons">
              <button className="inputdata-button previous" onClick={handlePreviousStep}>
                Previous
              </button>
              <button className="inputdata-button next" onClick={handleNextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p>This step is optional. You can proceed without filling all the fields.</p>
            <h2>General Information</h2>
            <textarea
              placeholder="Schedule details"
              className="inputdata-textarea"
            ></textarea>
            <input
              type="text"
              placeholder="Sleep time"
              className="inputdata-input"
            />
            <div className="navigation-buttons">
              <button className="inputdata-button previous" onClick={handlePreviousStep}>
                Previous
              </button>
              <button className="inputdata-button submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputData;
