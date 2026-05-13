import { useState } from "react";
import Btn from "../components/Btn";
import Card from "../components/Card";
import Icon from "../components/Icon";

function SettingsScreen({
  user,
  budget,
  transactions,
  onReset,
  onLogout,
  onEditBudget,
}) {
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div>
      <h2
        style={{
          color: "#e2e8f0",
          fontSize: 20,
          fontWeight: 800,
          margin: "0 0 24px",
        }}
      >
        Settings
      </h2>

      <Card style={{ marginBottom: 14 }}>
        <div
          style={{
            color: "#8b9bb4",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 12,
          }}
        >
          Account
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ color: "#e2e8f0", fontWeight: 700 }}>{user.name}</div>
            <div style={{ color: "#475569", fontSize: 13 }}>{user.email}</div>
          </div>
          <Btn variant="ghost" small onClick={onLogout}>
            <Icon name="logout" size={14} /> Log Out
          </Btn>
        </div>
      </Card>

      {budget && (
        <Card style={{ marginBottom: 14 }}>
          <div
            style={{
              color: "#8b9bb4",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 12,
            }}
          >
            Current Budget Cycle
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 4 }}>
            <b>Amount:</b> {budget.amount}
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 4 }}>
            <b>Period:</b> {budget.start} → {budget.end}
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 14 }}>
            <b>Transactions:</b> {transactions.length}
          </div>
          <Btn variant="ghost" small onClick={onEditBudget}>
            <Icon name="edit" size={14} /> Edit Budget
          </Btn>
        </Card>
      )}

      <Card>
        <div
          style={{
            color: "#8b9bb4",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 12,
          }}
        >
          Danger Zone
        </div>
        {confirmReset ? (
          <div>
            <p style={{ color: "#fca5a5", fontSize: 14, marginBottom: 14 }}>
              This will delete ALL transactions and reset your budget. This
              cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn
                variant="danger"
                small
                onClick={() => {
                  onReset();
                  setConfirmReset(false);
                }}
              >
                Yes, Reset Everything
              </Btn>
              <Btn variant="ghost" small onClick={() => setConfirmReset(false)}>
                Cancel
              </Btn>
            </div>
          </div>
        ) : (
          <Btn variant="danger" small onClick={() => setConfirmReset(true)}>
            <Icon name="trash" size={14} /> Reset App Data
          </Btn>
        )}
      </Card>
    </div>
  );
}

export default SettingsScreen;
