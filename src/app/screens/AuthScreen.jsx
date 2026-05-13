import { useState } from "react";
import LoginScreen from "../auth/LoginScreen";
import SignupScreen from "../auth/SignupScreen";
import Card from "../components/Card";

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060c17",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>💰</div>
          <h1
            style={{
              color: "#e2e8f0",
              fontSize: 28,
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            BudgetPilot
          </h1>
          <p style={{ color: "#475569", fontSize: 14, marginTop: 6 }}>
            Your personal finance companion
          </p>
        </div>
        <Card>
          <div
            style={{
              display: "flex",
              background: "#111827",
              borderRadius: 10,
              padding: 4,
              marginBottom: 24,
            }}
          >
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                }}
                style={{
                  flex: 1,
                  padding: "8px",
                  border: "none",
                  borderRadius: 8,
                  background: mode === m ? "#1d4ed8" : "transparent",
                  color: mode === m ? "#fff" : "#64748b",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 14,
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>
          {mode === "signup" ? (
  <SignupScreen onSignup={state => { onLogin(state); }} />
) : (
  <LoginScreen onLogin={stored => { onLogin(stored); }} />
)}
        </Card>
      </div>
    </div>
  );
}

export default AuthScreen;
