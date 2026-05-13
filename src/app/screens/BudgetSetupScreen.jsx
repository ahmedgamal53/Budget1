import { useState } from "react";
import Input from "../components/Input";
import Btn from "../components/Btn";
import Card from "../components/Card";
import Icon from "../components/Icon";
import { today } from "../utils/date"; // we will create date helper

function BudgetSetupScreen({ onSave }) {
  const [form, setForm] = useState({
    amount: "",
    start: today(),
    end: "",
    cycle: "monthly",
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const presets = { monthly: 30, weekly: 7, biweekly: 14 };
  const applyPreset = (c) => {
    const s = today();
    const e = new Date(Date.now() + presets[c] * 86400000)
      .toISOString()
      .split("T")[0];
    setForm((f) => ({ ...f, cycle: c, start: s, end: e }));
  };

  const submit = () => {
    const e = {};
    if (!form.amount || isNaN(form.amount) || +form.amount <= 0)
      e.amount = "Enter a valid budget amount";
    if (!form.end || form.end <= form.start)
      e.end = "End date must be after start";
    setErrors(e);
    if (Object.keys(e).length) return;
    onSave({ ...form, amount: +form.amount, spent: 0, id: Date.now() });
  };

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
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📅</div>
          <h2
            style={{
              color: "#e2e8f0",
              fontSize: 22,
              fontWeight: 800,
              margin: 0,
            }}
          >
            Create Budget Cycle
          </h2>
          <p style={{ color: "#475569", fontSize: 14, marginTop: 6 }}>
            Set up your spending plan
          </p>
        </div>
        <Card>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {Object.keys(presets).map((c) => (
              <button
                key={c}
                onClick={() => applyPreset(c)}
                style={{
                  flex: 1,
                  padding: "8px 4px",
                  border: `1.5px solid ${form.cycle === c ? "#3b82f6" : "#1f2d44"}`,
                  borderRadius: 8,
                  background:
                    form.cycle === c ? "rgba(59,130,246,0.15)" : "transparent",
                  color: form.cycle === c ? "#60a5fa" : "#64748b",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "inherit",
                }}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          <Input
            label="Budget Amount ($)"
            type="number"
            placeholder="e.g. 2000"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            error={errors.amount}
          />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Input
              label="Start Date"
              type="date"
              value={form.start}
              onChange={(e) => set("start", e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={form.end}
              onChange={(e) => set("end", e.target.value)}
              error={errors.end}
            />
          </div>
          <Btn
            onClick={submit}
            style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
          >
            <Icon name="check" size={16} /> Create Budget
          </Btn>
        </Card>
      </div>
    </div>
  );
}

export default BudgetSetupScreen;
