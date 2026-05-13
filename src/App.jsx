import { useState, useCallback } from "react";
import { load, save, INITIAL_STATE } from "./app/utils/storage";
import Icon from "./app/components/Icon";

import AuthScreen from "./app/screens/AuthScreen";
import BudgetSetupScreen from "./app/screens/BudgetSetupScreen";
import Dashboard from "./app/screens/Dashboard";
import AddTransactionScreen from "./app/screens/AddTransactionScreen";
import TransactionsScreen from "./app/screens/TransactionsScreen";
import SettingsScreen from "./app/screens/SettingsScreen";

export default function App() {
  const [state, setState] = useState(() => load() || INITIAL_STATE);
  const [screen, setScreen] = useState("home");
  const [editTx, setEditTx] = useState(null);

  const persist = useCallback((next) => {
    setState(next);
    save(next);
  }, []);

  const logout = () => {
    setState(INITIAL_STATE);
  };

  const { user, budget, transactions } = state;

  if (!user) {
    return (
      <AuthScreen
        onLogin={(s) => {
          persist(s);
          setScreen("home");
        }}
      />
    );
  }

  // Budget setup
  if (!budget) {
    return (
      <BudgetSetupScreen onSave={(b) => persist({ ...state, budget: b })} />
    );
  }

  
  // Edit budget
  if (screen === "editBudget") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#060c17",
          padding: 20,
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        <BudgetSetupScreen
          onSave={(b) => {
            persist({ ...state, budget: b });
            setScreen("settings");
          }}
        />
      </div>
    );
  }

  
  const saveTx = (tx) => {
    const exists = transactions.find((t) => t.id === tx.id);
    const next = exists
      ? transactions.map((t) => (t.id === tx.id ? tx : t))
      : [...transactions, tx];
    persist({ ...state, transactions: next });
    setEditTx(null);
    setScreen("transactions");
  };

  const deleteTx = (id) =>
    persist({
      ...state,
      transactions: transactions.filter((t) => t.id !== id),
    });

  const navItems = [
    { id: "home", icon: "home", label: "Home" },
    { id: "add", icon: "plus", label: "Add" },
    { id: "transactions", icon: "list", label: "History" },
    { id: "settings", icon: "settings", label: "Settings" },
  ];

  const renderScreen = () => {
    if (screen === "add" || (screen === "transactions" && editTx)) {
      return (
        <AddTransactionScreen
          editTx={editTx}
          onSave={saveTx}
          onCancel={() => {
            setEditTx(null);
            setScreen(editTx ? "transactions" : "home");
          }}
        />
      );
    }
    if (screen === "transactions") {
      return (
        <TransactionsScreen
          transactions={transactions}
          onEdit={(t) => setEditTx(t)}
          onDelete={deleteTx}
        />
      );
    }
    if (screen === "settings") {
      return (
        <SettingsScreen
          user={user}
          budget={budget}
          transactions={transactions}
          onReset={() => persist({ user, budget: null, transactions: [] })}
          onLogout={logout}
          onEditBudget={() => setScreen("editBudget")}
        />
      );
    }
    return (
      <Dashboard
        budget={budget}
        transactions={transactions}
        onNav={setScreen}
      />
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060c17",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        color: "#e2e8f0",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />
      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(6,12,23,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #1f2d44",
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>💰</span>
          <span style={{ fontWeight: 800, fontSize: 17, color: "#e2e8f0" }}>
            BudgetPilot
          </span>
        </div>
        <div style={{ color: "#475569", fontSize: 13 }}>
          Hi, {user.name.split(" ")[0]} 👋
        </div>
      </div>
      {/* Content */}
      <div
        style={{ maxWidth: 540, margin: "0 auto", padding: "24px 16px 100px" }}
      >
        {renderScreen()}
      </div>
      {/* Bottom Nav */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(6,12,23,0.96)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid #1f2d44",
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0 16px",
          zIndex: 100,
        }}
      >
        {navItems.map(({ id, icon, label }) => {
          const active = screen === id || (id === "add" && screen === "add");
          return (
            <button
              key={id}
              onClick={() => {
                setEditTx(null);
                setScreen(id);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: active ? "#60a5fa" : "#334155",
                fontFamily: "inherit",
                transition: "color 0.2s",
                padding: "4px 16px",
              }}
            >
              {id === "add" ? (
                <div
                  style={{
                    background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
                    borderRadius: 14,
                    padding: "10px",
                    display: "flex",
                    boxShadow: "0 4px 12px rgba(59,130,246,0.4)",
                    transform: active ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.2s",
                  }}
                >
                  <Icon name={icon} size={20} />
                </div>
              ) : (
                <Icon name={icon} size={22} />
              )}
              <span
                style={{ fontSize: 11, fontWeight: id === "add" ? 700 : 600 }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
