import { useRef, useState, useEffect } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import PasswordGenerator from "../components/PasswordGenerator";
import "../styles/auth.css";

export default function Auth() {
  const containerRef = useRef(null);
  const [screen, setScreen] = useState("signIn"); // "signIn", "signUp", "generator"

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.classList.remove("active", "generator-active");

    if (screen === "signUp") {
      container.classList.add("active");
    } else if (screen === "generator") {
      container.classList.add("generator-active");
    }
  }, [screen]);

  const activateSignIn = () => setScreen("signIn");
  const activateSignUp = () => setScreen("signUp");
  const goToGenerator = () => setScreen("generator");
  const returnToSignUp = () => setScreen("signUp");

  return (
    <div className="container" ref={containerRef}>
      <div className="form-container sign-in">
        {screen === "signIn" && <SignInForm />}
      </div>

      <div className="form-container sign-up">
        {screen === "signUp" && (
          <SignUpForm onGeneratePassword={goToGenerator} />
        )}
      </div>

      {screen === "generator" && (
        <div className="form-container generator">
          <PasswordGenerator onBack={returnToSignUp} />
        </div>
      )}

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="toggle-btn" onClick={activateSignIn}>
              Sign In
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="toggle-btn" onClick={activateSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
