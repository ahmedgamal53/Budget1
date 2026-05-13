import { useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import Btn from "../components/Btn";
import Card from "../components/Card";
import Icon from "../components/Icon";
import { CATEGORIES } from "../utils/storage";

function AddTransactionScreen({ editTx, onSave, onCancel }) {
  const [form, setForm] = useState(
    editTx
      ? { ...editTx }
      : {
          type: "expense",
          amount: "",
          category: CATEGORIES.expense[0],
          description: "",
          date: new Date().toISOString().split("T")[0],
        },
  );
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "type") next.category = CATEGORIES[v][0];
      return next;
    });
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = () => {
    const e = {};
    if (!form.amount || isNaN(form.amount) || +form.amount <= 0)
      e.amount = "Enter valid amount";
    if (!form.description.trim()) e.description = "Description required";
    setErrors(e);
    if (Object.keys(e).length) return;
    onSave({ ...form, amount: +form.amount, id: editTx?.id || Date.now() });
  };

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
        {editTx ? "Edit Transaction" : "Add Transaction"}
      </h2>
      <Card>
        <div
          style={{
            display: "flex",
            background: "#111827",
            borderRadius: 10,
            padding: 4,
            marginBottom: 20,
          }}
        >
          {["expense", "income"].map((t) => (
            <button
              key={t}
              onClick={() => set("type", t)}
              style={{
                flex: 1,
                padding: "9px",
                border: "none",
                borderRadius: 8,
                background:
                  form.type === t
                    ? t === "expense"
                      ? "#991b1b"
                      : "#065f46"
                    : "transparent",
                color: form.type === t ? "#fff" : "#64748b",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 14,
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              {t === "expense" ? "💸 Expense" : "💰 Income"}
            </button>
          ))}
        </div>

        <Input
          label="Amount ($)"
          type="number"
          placeholder="0.00"
          value={form.amount}
          onChange={(e) => set("amount", e.target.value)}
          error={errors.amount}
        />
        <Select
          label="Category"
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
        >
          {CATEGORIES[form.type].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
        <Input
          label="Description"
          placeholder="What was this for?"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          error={errors.description}
        />
        <Input
          label="Date"
          type="date"
          value={form.date}
          onChange={(e) => set("date", e.target.value)}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <Btn
            onClick={submit}
            style={{ flex: 1, justifyContent: "center" }}
            variant={form.type === "income" ? "success" : "primary"}
          >
            <Icon name="check" size={16} />{" "}
            {editTx ? "Save Changes" : "Add Transaction"}
          </Btn>
          <Btn variant="ghost" onClick={onCancel}>
            Cancel
          </Btn>
        </div>
      </Card>
    </div>
  );
}

export default AddTransactionScreen;
