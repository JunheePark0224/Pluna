import React from "react";
import ReactDOM from "react-dom/client"; // createRoot를 가져옴
import "./index.css";
import App from "./App";

// React 18의 createRoot를 사용
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove or comment out this line if unused
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);
