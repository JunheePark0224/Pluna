import React, { useEffect, useState } from "react";
import "./CalendarPage.css";

const CalendarPage = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(new Set()); // 완료된 Task 상태
  const [year, setYear] = useState(2024); // 연도 상태 관리
  const [month, setMonth] = useState(12);
  const [username, setUsername] = useState("Guest");
  const [isEditMode, setIsEditMode] = useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December",
  ];

  const flattenSchedule = (schedule) => {
    const flattened = [];
    schedule.forEach((entry) => {
      if (entry.schedule) flattened.push(...entry.schedule);
      else flattened.push(entry);
    });
    return flattened;
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedId = localStorage.getItem("id");

    if (storedUsername) setUsername(storedUsername);

    const userId = storedId || "junhee0224";
    fetch(`http://localhost:3000/get-schedule/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data[0]?.schedule) {
          const parsedSchedule = typeof data[0].schedule === "string" 
            ? JSON.parse(data[0].schedule) 
            : data[0].schedule;
          setCalendarData(flattenSchedule(parsedSchedule));
        }
      })
      .catch((error) => console.error("Error fetching schedule data:", error));
  }, []);

  const handleToggleCompletion = (date) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(date)) newSet.delete(date); // Toggle: 이미 있으면 제거
      else newSet.add(date); // 없으면 추가
      return newSet;
    });
  };

  const generateMonthDays = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const handlePrevMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 1) {
        setYear((prevYear) => prevYear - 1); // 이전 연도
        return 12; // 12월로 설정
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 12) {
        setYear((prevYear) => prevYear + 1); // 다음 연도
        return 1; // 1월로 설정
      }
      return prevMonth + 1;
    });
  };

  const daysInMonth = generateMonthDays(year, month);

  const totalTasks = calendarData.length;
  const completedTaskCount = completedTasks.size;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTaskCount / totalTasks) * 100) : 0;

  return (
    <div className="calendar-container">
  <div className="calendar-header">
    <h1>{username}'s Study Plan</h1>
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <span>{progressPercentage}%</span>
    </div>
  </div>

  {/* 네비게이션 영역 수정 */}
  <div className="navigation-buttons">
    <button onClick={handlePrevMonth} className="nav-button">
      &lt; Previous
    </button>
    <h2 className="calendar-title">{monthNames[month - 1]} {year}</h2>
    <div className="right-buttons">
      <button onClick={() => setIsEditMode(!isEditMode)} className="edit-button">
        {isEditMode ? "OK" : "Edit"}
      </button>
      <button onClick={handleNextMonth} className="nav-button">
        Next &gt;
      </button>
    </div>
  </div>

  <div className="calendar-grid">
    {daysInMonth.map((day) => {
      const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const tasksForDay = calendarData.find((entry) => entry.date === date);

      return (
        <div key={day} className="calendar-day">
          <div className="calendar-date">
            <strong>{day}</strong>
            {tasksForDay && (
              <button 
                className={`completion-button ${completedTasks.has(date) ? 'completed' : ''}`}
                onClick={() => handleToggleCompletion(date)}
              >
                O
              </button>
            )}
          </div>
          {tasksForDay &&
            tasksForDay.tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="task-entry">
                <p><strong>Time:</strong> {task.start_time} - {task.end_time}</p>
                <p>{task.task}</p>
                {task.workbook && <p><strong>Workbook:</strong> {task.workbook}</p>}
                {task.pages && <p><strong>Pages:</strong> {task.pages}</p>}
              </div>
            ))}
        </div>
      );
    })}
  </div>
</div>
  );
};

export default CalendarPage;
