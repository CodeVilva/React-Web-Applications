import { useEffect, useState } from "react";
import FocusTimer from "./components/FocusTimer";
import BreakTimer from "./components/BreakTimer";
import "./App.css";

function App() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);

  const [focusRunning, setFocusRunning] = useState(false);
  const [breakRunning, setBreakRunning] = useState(false);

  const [activeTimer, setActiveTimer] = useState("focus");

  // Focus countdown
  useEffect(() => {
    if (!focusRunning || focusTime === 0) return;

    const timer = setInterval(() => {
      setFocusTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [focusRunning, focusTime]);

  // Break countdown
  useEffect(() => {
    if (!breakRunning || breakTime === 0) return;

    const timer = setInterval(() => {
      setBreakTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [breakRunning, breakTime]);

  // Focus finished → Break starts
  useEffect(() => {
    if (focusTime === 0 && focusRunning) {
      setFocusRunning(false);

      alert("Focus time is over!");

      setActiveTimer("break");
      setBreakRunning(true);
    }
  }, [focusTime, focusRunning]);

  // Break finished → Focus starts
  useEffect(() => {
    if (breakTime === 0 && breakRunning) {
      setBreakRunning(false);

      alert("Break time is over!");

      setActiveTimer("focus");
      setFocusRunning(true);
    }
  }, [breakTime, breakRunning]);

  return (
    <main className="app">
      <header className="header">
        <p className="eyebrow">PRODUCTIVITY TIMER</p>
        <h1>Focus & Break</h1>
        <p className="subtitle">
          Stay focused. Take a break. Repeat.
        </p>
      </header>

      <div className="timer-container">
        <FocusTimer
          time={focusTime}
          setTime={setFocusTime}
          isRunning={focusRunning}
          setIsRunning={setFocusRunning}
          active={activeTimer === "focus"}
        />

        <BreakTimer
          time={breakTime}
          setTime={setBreakTime}
          isRunning={breakRunning}
          setIsRunning={setBreakRunning}
          active={activeTimer === "break"}
        />
      </div>

      <div className="cycle-status">
        <span className="status-dot"></span>
        {activeTimer === "focus"
          ? "Focus session"
          : "Break session"}
      </div>
    </main>
  );
}

export default App;