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
  const [studentInfo, setStudentInfo] = useState({
    concentration: "",
    breakPreference: "",
    schedule: "",
    sleepTime: "",
  });

  const handleInputChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleCheckboxChange = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].enabled = !updatedSubjects[index].enabled;
    setSubjects(updatedSubjects);
  };

  const handleStudentInfoChange = (field, value) => {
    setStudentInfo({ ...studentInfo, [field]: value });
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Check if all required fields in Step 1 are filled
      const allFilled = subjects.every(
        (subject) => !subject.enabled || (subject.subject && subject.range && subject.difficulty && subject.studyHour)
      );
      if (!allFilled) {
        alert("Please fill out all required fields to proceed.");
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
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

        {step === 1 && (
          <div>
            <h2>Necessary Information for Subjects</h2>
            <p>All fields are required to proceed to the next step.</p>
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
                        placeholder="Difficulty (e.g., Easy, Hard)"
                        value={subject.difficulty}
                        onChange={(e) => handleInputChange(index, "difficulty", e.target.value)}
                        className="inputdata-input"
                      />
                      <input
                        type="text"
                        placeholder="Study Hours (e.g., 2 hours per day)"
                        value={subject.studyHour}
                        onChange={(e) => handleInputChange(index, "studyHour", e.target.value)}
                        className="inputdata-input"
                      />
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
            <h2>Optional Information for Subjects</h2>
            <p>This step is optional. You can proceed without filling all the fields.</p>
            <div className="subjects-grid">
              {subjects.map((subject, index) =>
                subject.enabled ? (
                  <div key={index} className="subject-column">
                    <h3>{subject.subject || `Subject ${index + 1}`}</h3>
                    <input
                      type="text"
                      placeholder="Exam Date (e.g., 2024-12-10)"
                      className="inputdata-input"
                    />
                    <textarea
                      placeholder="Subject-Specific Notes (e.g., Avoid Saturdays)"
                      className="inputdata-input textarea"
                      rows="4"
                    />
                  </div>
                ) : null
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
            <h2>Optional Information for the Student</h2>
            <p>This step is optional. You can proceed without filling all the fields.</p>
            <div className="subjects-grid">
              <div className="subject-column">
                <input
                  type="text"
                  placeholder="Concentration Type (Short or Long)"
                  value={studentInfo.concentration}
                  onChange={(e) => handleStudentInfoChange("concentration", e.target.value)}
                  className="inputdata-input"
                />
                <input
                  type="text"
                  placeholder="Break Preference (Short or Long)"
                  value={studentInfo.breakPreference}
                  onChange={(e) => handleStudentInfoChange("breakPreference", e.target.value)}
                  className="inputdata-input"
                />
                <input
                  type="text"
                  placeholder="Schedule (e.g., Mon 1-6 p.m.)"
                  value={studentInfo.schedule}
                  onChange={(e) => handleStudentInfoChange("schedule", e.target.value)}
                  className="inputdata-input"
                />
                <input
                  type="text"
                  placeholder="Sleep Time (e.g., 10 p.m. - 6 a.m.)"
                  value={studentInfo.sleepTime}
                  onChange={(e) => handleStudentInfoChange("sleepTime", e.target.value)}
                  className="inputdata-input"
                />
              </div>
            </div>
            <div className="navigation-buttons">
              <button className="inputdata-button previous" onClick={handlePreviousStep}>
                Previous
              </button>
              <button className="inputdata-button submit">Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputData;
