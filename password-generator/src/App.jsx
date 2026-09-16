import { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let newPassword = "";

    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }

    setPassword(newPassword);
  };

  return (
    <div className="app-shell">
      <div className="app-card">
        <p className="eyebrow">Security Tool</p>
        <h1>Password Generator</h1>

        <div className="password-panel">
          <input
            type="text"
            className="password-input"
            value={password}
            readOnly
            placeholder="Your password"
            aria-label="Generated password"
          />
        </div>

        <button className="generate-button" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
