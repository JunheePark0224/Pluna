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
  const [uploadedFile, setUploadedFile] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [concentrationType, setConcentrationType] = useState("");
  const [breakPreference, setBreakPreference] = useState("");
  const [scheduleDetails, setScheduleDetails] = useState("");
  const [sleepTime, setSleepTime] = useState("");

  const handleInputChange = (index, field, value) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject, i) =>
        i === index ? { ...subject, [field]: value } : subject
      )
    );
  };

  const handleCheckboxChange = (index) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject, i) =>
        i === index ? { ...subject, enabled: !subject.enabled } : subject
      )
    );
  };

  const handleNextStep = () => {
    if (
      step === 1 &&
      subjects.some(
        (subject) =>
          subject.enabled &&
          (!subject.subject.trim() || 
           !subject.range.trim() || 
           !subject.difficulty.trim() || 
           !subject.studyHour.trim())
      )
    ) {
      setError("Please fill in all required fields for enabled subjects.");
      return;
    }
  
    setError(""); // 에러 메시지 초기화
    setStep(step + 1);
  };
  
  
  

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    alert("Submitted successfully! Redirecting to Calendar...");
    window.location.href = "/calendar"; // 달력 페이지로 이동
  };

  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]);
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
          <span
            className={step === 4 ? "active-step" : ""}
            style={{ cursor: "pointer" }}
            onClick={() => setStep(4)} // Pro Version 클릭 시 Step 4로 이동
          >
            Pro Version
          </span>
        </div>

        


        {/* Step 1 */}
{step === 1 && (
  <div>
    <p>All fields are required to proceed to the next step.</p>
    {/* 에러 메시지: 한 번만 출력되도록 */}
    {error && <p className="inputdata-error">{error}</p>}
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
    <div className="navigation-buttons-right">
      <button className="inputdata-button next" onClick={handleNextStep}>
        Next
      </button>
    </div>
  </div>
)}




        {/* Step 2 */}
        {step === 2 && (
          <div>
            <p>This step is optional. You can proceed without filling all the fields.</p>
            <h2>Information</h2>
            <div className="inputdata-column">
              {subjects.map(
                (subject, index) =>
                  subject.enabled && (
                    <div key={index}>
                      <h3>{subject.subject || `Subject ${index + 1}`}</h3>
                      <input
                        type="text"
                        placeholder="Exam Date (e.g., 2024-12-10)"
                        className="inputdata-input"
                      />
                      <textarea
                        placeholder="Subject-Specific Notes (e.g., I don't want to study this subject on Saturdays.)"
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

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <p>This step is optional. You can proceed without filling all the fields.</p>
            <h2>General Information</h2>
            <div className="inputdata-column">
              <div className="radio-group">
                <label>Concentration Type</label>
                <div>
                  <span
                    className={`radio-item ${concentrationType === "Short" ? "active" : ""}`}
                    onClick={() => setConcentrationType("Short")}
                  >
                    Short
                  </span>
                  <span
                    className={`radio-item ${concentrationType === "Long" ? "active" : ""}`}
                    onClick={() => setConcentrationType("Long")}
                  >
                    Long
                  </span>
                </div>
              </div>
              <div className="radio-group">
                <label>Break Preference</label>
                <div>
                  <span
                    className={`radio-item ${breakPreference === "Short" ? "active" : ""}`}
                    onClick={() => setBreakPreference("Short")}
                  >
                    Short
                  </span>
                  <span
                    className={`radio-item ${breakPreference === "Long" ? "active" : ""}`}
                    onClick={() => setBreakPreference("Long")}
                  >
                    Long
                  </span>
                </div>
              </div>
              <textarea
                placeholder="Schedule details"
                value={scheduleDetails}
                onChange={(e) => setScheduleDetails(e.target.value)}
                className="inputdata-textarea"
              />
              <input
                type="text"
                placeholder="Sleep time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                className="inputdata-input"
              />
            </div>
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

        {/* Step 4 - Pro Version */}
        {step === 4 && (
          <div>
            <h2>Pro Version: Upload File and Describe Your Question</h2>
            <input type="file" onChange={handleFileUpload} className="file-input" />
            {uploadedFile && <p className="file-name">Uploaded File: {uploadedFile.name}</p>}
            <textarea
              placeholder="Describe the problem or specify which part is difficult."
              className="inputdata-textarea"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <div className="navigation-buttons">
              <button className="inputdata-button previous" onClick={handlePreviousStep}>
                Previous
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputData;