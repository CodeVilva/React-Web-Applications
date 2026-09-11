import { useState } from "react";

function BreakTimer({
  time,
  setTime,
  isRunning,
  setIsRunning,
  active,
}) {
  const [minutesInput, setMinutesInput] = useState(5);
  const [secondsInput, setSecondsInput] = useState(0);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const setCustomTime = () => {
    let minutes = Number(minutesInput) || 0;
    let seconds = Number(secondsInput) || 0;

    if (seconds > 59) {
      minutes += Math.floor(seconds / 60);
      seconds = seconds % 60;
    }

    const totalSeconds = minutes * 60 + seconds;

    setTime(totalSeconds);
    setIsRunning(false);
  };

  const startTimer = () => {
    if (time > 0) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    const totalSeconds =
      Number(minutesInput) * 60 + Number(secondsInput);

    setIsRunning(false);
    setTime(totalSeconds);
  };

  return (
    <section className={`timer-card break-card ${active ? "active" : ""}`}>
      <div className="card-header">
        <div>
          <span className="timer-icon">◌</span>
          <h2>Break</h2>
        </div>

        {active && <span className="active-label">ACTIVE</span>}
      </div>

      <div className="time-display">
        <span>{String(minutes).padStart(2, "0")}</span>
        <span className="colon">:</span>
        <span>{String(seconds).padStart(2, "0")}</span>
      </div>

      <p className="timer-state">
        {isRunning ? "Take a breath" : "Rest and recharge"}
      </p>

      <div className="custom-time">
        <p>Set custom time</p>

        <div className="input-row">
          <div className="time-input">
            <input
              type="number"
              min="0"
              value={minutesInput}
              onChange={(e) => setMinutesInput(e.target.value)}
            />
            <span>min</span>
          </div>

          <span className="input-colon">:</span>

          <div className="time-input">
            <input
              type="number"
              min="0"
              max="59"
              value={secondsInput}
              onChange={(e) => setSecondsInput(e.target.value)}
            />
            <span>sec</span>
          </div>

          <button className="set-button" onClick={setCustomTime}>
            Set
          </button>
        </div>
      </div>

      <div className="controls">
        {!isRunning ? (
          <button
            className="primary-button"
            onClick={startTimer}
            disabled={!active || time === 0}
          >
            ▶ Start
          </button>
        ) : (
          <button className="primary-button" onClick={pauseTimer}>
            ❚❚ Pause
          </button>
        )}

        <button className="secondary-button" onClick={resetTimer}>
          ↻ Reset
        </button>
      </div>
    </section>
  );
}

export default BreakTimer;