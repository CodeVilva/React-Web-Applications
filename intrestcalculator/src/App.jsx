import { useState } from "react";
import "./App.css";

function App() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [interest, setInterest] = useState(null);
  const [total, setTotal] = useState(null);

  const calculateInterest = () => {
    const p = Number(principal);
    const r = Number(rate);
    const t = Number(time);

    if (p <= 0 || r < 0 || t <= 0) {
      alert("Please enter valid values.");
      return;
    }

    const si = (p * r * t) / 100;
    const amount = p + si;

    setInterest(si);
    setTotal(amount);
  };

  const resetCalculator = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setInterest(null);
    setTotal(null);
  };

  return (
    <div className="app">
      <div className="calculator">
        <h1>Simple Interest Calculator</h1>
        <p className="subtitle">
          Calculate interest quickly and easily
        </p>

        <div className="input-group">
          <label>Principal Amount</label>
          <input
            type="number"
            placeholder="Enter principal amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Interest Rate (%)</label>
          <input
            type="number"
            placeholder="Enter annual rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Time (Years)</label>
          <input
            type="number"
            placeholder="Enter time in years"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="buttons">
          <button onClick={calculateInterest}>
            Calculate
          </button>

          <button className="reset" onClick={resetCalculator}>
            Reset
          </button>
        </div>

        {interest !== null && (
          <div className="result">
            <div className="result-item">
              <span>Simple Interest</span>
              <strong>₹{interest.toFixed(2)}</strong>
            </div>

            <div className="result-item">
              <span>Total Amount</span>
              <strong>₹{total.toFixed(2)}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;