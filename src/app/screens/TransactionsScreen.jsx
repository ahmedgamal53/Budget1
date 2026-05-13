import { useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import Btn from "../components/Btn";
import Card from "../components/Card";
import Icon from "../components/Icon";

function TransactionsScreen({ transactions, onEdit, onDelete }) {
  const [filter, setFilter] = useState({
    type: "all",
    category: "all",
    search: "",
  });
  const [confirm, setConfirm] = useState(null);

  const allCats = [...new Set(transactions.map((t) => t.category))].sort();

  const visible = transactions
    .filter((t) => {
      if (filter.type !== "all" && t.type !== filter.type) return false;
      if (filter.category !== "all" && t.category !== filter.category)
        return false;
      if (
        filter.search &&
        !t.description.toLowerCase().includes(filter.search.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => b.id - a.id);

  return (
    <div>
      <h2
        style={{
          color: "#e2e8f0",
          fontSize: 20,
          fontWeight: 800,
          margin: "0 0 20px",
        }}
      >
        Transaction History
      </h2>

      <Card style={{ marginBottom: 16, padding: 14 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <Icon name="filter" size={16} />
          <span style={{ color: "#8b9bb4", fontSize: 13, fontWeight: 600 }}>
            Filters
          </span>
        </div>
        <Input
          placeholder="Search description…"
          value={filter.search}
          onChange={(e) => setFilter((f) => ({ ...f, search: e.target.value }))}
          style={{ marginBottom: 0 }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginTop: 10,
          }}
        >
          <Select
            value={filter.type}
            onChange={(e) => setFilter((f) => ({ ...f, type: e.target.value }))}
          >
            <option value="all">All Types</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </Select>
          <Select
            value={filter.category}
            onChange={(e) =>
              setFilter((f) => ({ ...f, category: e.target.value }))
            }
          >
            <option value="all">All Categories</option>
            {allCats.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      <div style={{ color: "#475569", fontSize: 12, marginBottom: 10 }}>
        {visible.length} transaction{visible.length !== 1 ? "s" : ""}
      </div>

      {visible.length === 0 ? (
        <Card>
          <div
            style={{ textAlign: "center", color: "#334155", padding: "32px 0" }}
          >
            No transactions match your filters
          </div>
        </Card>
      ) : (
        visible.map((t) => (
          <Card key={t.id} style={{ marginBottom: 10, padding: "14px 16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}
                >
                  {t.description}
                </div>
                <div style={{ color: "#475569", fontSize: 12, marginTop: 3 }}>
                  <span
                    style={{
                      background:
                        t.type === "income"
                          ? "rgba(16,185,129,0.12)"
                          : "rgba(239,68,68,0.12)",
                      color: t.type === "income" ? "#34d399" : "#f87171",
                      padding: "1px 8px",
                      borderRadius: 99,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {t.type}
                  </span>
                  {" · "}
                  {t.category}
                  {" · "}
                  {t.date}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    color: t.type === "income" ? "#34d399" : "#f87171",
                    fontWeight: 800,
                    fontSize: 16,
                    marginRight: 6,
                  }}
                >
                  {t.type === "income" ? "+" : "-"}
                  {t.amount}
                </div>
                <Btn variant="ghost" small onClick={() => onEdit(t)}>
                  <Icon name="edit" size={14} />
                </Btn>
                {confirm === t.id ? (
                  <Btn
                    variant="danger"
                    small
                    onClick={() => {
                      onDelete(t.id);
                      setConfirm(null);
                    }}
                  >
                    Confirm
                  </Btn>
                ) : (
                  <Btn variant="ghost" small onClick={() => setConfirm(t.id)}>
                    <Icon name="trash" size={14} />
                  </Btn>
                )}
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default TransactionsScreen;
