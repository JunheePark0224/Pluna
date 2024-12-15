import React, { useEffect, useState } from "react";
import "./CalendarPage.css";

const CalendarPage = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(12);
  const [username, setUsername] = useState("Guest");
  const [isEditMode, setIsEditMode] = useState(false);

  const flattenSchedule = (schedule) => {
    const flattened = [];
    schedule.forEach((entry) => {
      if (entry.schedule) {
        flattened.push(...entry.schedule);
      } else {
        flattened.push(entry);
      }
    });
    return flattened;
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedId = localStorage.getItem("id");

    if (storedUsername) setUsername(storedUsername);

    const userId = storedId || "junhee0224";

    fetch(`http://localhost:3000/get-schedule/${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (data && data[0]?.schedule) {
          const parsedSchedule =
            typeof data[0].schedule === "string"
              ? JSON.parse(data[0].schedule)
              : data[0].schedule;
          setCalendarData(flattenSchedule(parsedSchedule));
        }
      })
      .catch((error) => console.error("Error fetching schedule data:", error));
  }, []);

  const generateMonthDays = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const daysInMonth = generateMonthDays(year, month);

  const handlePrevMonth = () => {
    setMonth((prev) => (prev === 1 ? 12 : prev - 1));
    if (month === 1) setYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setMonth((prev) => (prev === 12 ? 1 : prev + 1));
    if (month === 12) setYear((prev) => prev + 1);
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      // Save changes when exiting edit mode
      fetch(`http://localhost:3000/update-schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(calendarData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to update schedule on server");
          console.log("Schedule updated successfully");
        })
        .catch((error) => console.error("Error updating schedule:", error));
    }
    setIsEditMode((prev) => !prev);
  };

  const handleTaskChange = (date, taskIndex, field, value) => {
    setCalendarData((prevData) =>
      prevData.map((entry) => {
        if (entry.date === date) {
          return {
            ...entry,
            tasks: entry.tasks.map((task, index) =>
              index === taskIndex ? { ...task, [field]: value } : task
            ),
          };
        }
        return entry;
      })
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>{username}'s Study Plan</h1>
        <button onClick={handleEditToggle} className="edit-button">
          {isEditMode ? "OK" : "Edit"}
        </button>
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrevMonth} className="nav-button">
          &lt; Previous
        </button>
        <h2>
          {year}년 {month}월
        </h2>
        <button onClick={handleNextMonth} className="nav-button">
          Next &gt;
        </button>
      </div>
      <div className="calendar-grid">
        {daysInMonth.map((day) => {
          const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const tasksForDay = calendarData.find((entry) => entry.date === date);

          return (
            <div key={day} className="calendar-day">
              <div className="calendar-date">
                <strong>{day}</strong>
              </div>
              {tasksForDay &&
                tasksForDay.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="task-entry">
                    <p>
                      <strong>Time:</strong>{" "}
                      {isEditMode ? (
                        <span
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          onBlur={(e) =>
                            handleTaskChange(date, taskIndex, "start_time", e.target.textContent)
                          }
                        >
                          {task.start_time}
                        </span>
                      ) : (
                        task.start_time
                      )}{" "}
                      -{" "}
                      {isEditMode ? (
                        <span
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          onBlur={(e) =>
                            handleTaskChange(date, taskIndex, "end_time", e.target.textContent)
                          }
                        >
                          {task.end_time}
                        </span>
                      ) : (
                        task.end_time
                      )}
                    </p>
                    <p>
                      {isEditMode ? (
                        <span
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          onBlur={(e) =>
                            handleTaskChange(date, taskIndex, "task", e.target.textContent)
                          }
                        >
                          {task.task}
                        </span>
                      ) : (
                        task.task
                      )}
                    </p>
                    {task.workbook && (
                      <p>
                        <strong>Workbook:</strong>{" "}
                        {isEditMode ? (
                          <span
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onBlur={(e) =>
                              handleTaskChange(date, taskIndex, "workbook", e.target.textContent)
                            }
                          >
                            {task.workbook}
                          </span>
                        ) : (
                          task.workbook
                        )}
                      </p>
                    )}
                    {task.pages && (
                      <p>
                        <strong>Pages:</strong>{" "}
                        {isEditMode ? (
                          <span
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onBlur={(e) =>
                              handleTaskChange(date, taskIndex, "pages", e.target.textContent)
                            }
                          >
                            {task.pages}
                          </span>
                        ) : (
                          task.pages
                        )}
                      </p>
                    )}
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
