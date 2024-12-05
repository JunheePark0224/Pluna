import React, { useState, useEffect } from "react";
import "./App.css";
import firstImage from "./assets/firstimage.png";


function App() {
  const [showSecondPage, setShowSecondPage] = useState(false);

  useEffect(() => {
    // Transition after 2 seconds
    const timer = setTimeout(() => {
      setShowSecondPage(true);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="App">
      {/* First Page */}
      <div className={`page page1 ${showSecondPage ? "hidden" : ""}`}>
        <img src={firstImage} alt="First Page" />
      </div>

      {/* Second Page */}
      <div className={`page page2 ${showSecondPage ? "fade-in" : ""}`}>
        <div className="content">
          <h1>Pluna</h1>
          <p>If this is your first time, <strong>Sign Up</strong></p>
          <p>If you already have an account, <strong>Log In</strong></p>
        </div>
      </div>
    </div>
  );
}

export default App;