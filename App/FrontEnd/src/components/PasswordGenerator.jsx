import { useState, useEffect } from "react";
import "../styles/passwordGenerator.css";

export default function PasswordGenerator({ onBack }) {
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = useUpper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
    const numbers = useNumbers ? "0123456789" : "";
    const symbols = useSymbols ? "!@#$%^&*()-_=+[]{};:,.<>?" : "";

    const chars = lower + upper + numbers + symbols;
    if (!chars) {
      setPassword("Select options");
      return;
    }

    let newPass = "";
    for (let i = 0; i < length; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(newPass);
  };

  const copyToClipboard = () => {
    if (password) navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="generator-layout">
      {/* Parte blanca izquierda */}
      <div className="left">
        <h1>Password Generator</h1>
        <p>Create a strong, unique password in seconds</p>

        <div className="password-box">
          <input type="text" value={password} readOnly />
          <button className="copy-btn" onClick={copyToClipboard}>📋</button>
        </div>

        <div className="options">
          <div className="row">
            <label>
              Length:
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                min={4}
                max={50}
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={useUpper}
                onChange={() => setUseUpper(!useUpper)}
              />
              Uppercase
            </label>
          </div>

          <div className="row">
            <label>
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={() => setUseNumbers(!useNumbers)}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={() => setUseSymbols(!useSymbols)}
              />
              Symbols
            </label>
          </div>
        </div>

        <button className="generate-btn" onClick={generatePassword}>
          GENERATE
        </button>
      </div>

      {/* Parte azul derecha */}
      <div className="right-panel">
        <div className="content">
          <h2>Register Now!</h2>
          <p>Return to the account creation form and complete your setup</p>
          <button onClick={onBack} className="back-btn">
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}
