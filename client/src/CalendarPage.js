import React, { useEffect, useState } from "react";
import "./Calendar.css";

const CalendarPage = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // localStorage에서 username 가져오기
    const savedUsername = localStorage.getItem("username");
    setUsername(savedUsername || "Guest"); // 값이 없으면 기본값으로 'Guest'
  }, []);

  const calendarData = [
    {
      date: "2024-12-01",
      task: "General Study Session",
    },
    {
      date: "2024-12-02",
      task: "Complete Practice Problems",
    },
    {
      date: "2024-12-03",
      task: "Review Notes",
    },
  ];

  return (
    <div className="calendar-container">
      <h1>{username}'s Study Page</h1> {/* Username 표시 */}
      <div className="calendar-grid">
        {calendarData.map((entry, index) => (
          <div key={index} className="calendar-item">
            <h3>{entry.date}</h3>
            <p>{entry.task}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
