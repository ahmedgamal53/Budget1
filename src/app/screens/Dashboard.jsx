import Card from "../components/Card";
import Btn from "../components/Btn";
import Icon from "../components/Icon";
import { fmt } from "../utils/format"; // we'll create format.js

function Dashboard({ budget, transactions, onNav }) {
  const spent = transactions
    .filter(
      (t) =>
        t.type === "expense" && t.date >= budget.start && t.date <= budget.end,
    )
    .reduce((s, t) => s + t.amount, 0);
  const remaining = budget.amount - spent;
  const pct = Math.min(100, (spent / budget.amount) * 100);
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(budget.end) - new Date()) / 86400000),
  );
  const dailyLimit = daysLeft > 0 ? remaining / daysLeft : 0;
  const warn = pct >= 80;

  const recent = [...transactions].sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <div>
      {warn && (
        <div
          style={{
            background: "rgba(245,158,11,0.12)",
            border: "1.5px solid #f59e0b",
            borderRadius: 14,
            padding: "14px 18px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Icon name="warn" size={20} />
          <div>
            <div style={{ color: "#fbbf24", fontWeight: 700, fontSize: 14 }}>
              ⚠ Budget Warning
            </div>
            <div style={{ color: "#92400e", fontSize: 13 }}>
              You've used {pct.toFixed(0)}% of your budget. Spend carefully!
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 16,
        }}
      >
        {[
          { label: "Budget", val: fmt(budget.amount), color: "#60a5fa" },
          { label: "Spent", val: fmt(spent), color: "#f87171" },
          {
            label: "Remaining",
            val: fmt(remaining),
            color: remaining >= 0 ? "#34d399" : "#f87171",
          },
          { label: "Daily Limit", val: fmt(dailyLimit), color: "#a78bfa" },
        ].map(({ label, val, color }) => (
          <Card key={label} style={{ padding: 16 }}>
            <div
              style={{
                color: "#475569",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {label}
            </div>
            <div style={{ color, fontSize: 22, fontWeight: 800, marginTop: 4 }}>
              {val}
            </div>
          </Card>
        ))}
      </div>
      <Card style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <span style={{ color: "#8b9bb4", fontSize: 13, fontWeight: 600 }}>
            Budget Progress
          </span>
          <span
            style={{
              color: warn ? "#fbbf24" : "#60a5fa",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {pct.toFixed(0)}%
          </span>
        </div>
        <div style={{ height: 10, background: "#1f2d44", borderRadius: 99 }}>
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background:
                pct >= 100 ? "#ef4444" : pct >= 80 ? "#f59e0b" : "#3b82f6",
              borderRadius: 99,
              transition: "width 0.4s",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
            color: "#475569",
            fontSize: 12,
          }}
        >
          <span>{budget.start}</span>
          <span>{daysLeft} days left</span>
          <span>{budget.end}</span>
        </div>
      </Card>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <span style={{ color: "#8b9bb4", fontWeight: 700, fontSize: 13 }}>
            Recent Transactions
          </span>
          <Btn variant="ghost" small onClick={() => onNav("transactions")}>
            <Icon name="list" size={14} /> See All
          </Btn>
        </div>
        {recent.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#334155",
              padding: "24px 0",
              fontSize: 14,
            }}
          >
            No transactions yet
          </div>
        ) : (
          recent.map((t) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #111827",
              }}
            >
              <div>
                <div
                  style={{ color: "#cbd5e1", fontSize: 14, fontWeight: 600 }}
                >
                  {t.description}
                </div>
                <div style={{ color: "#475569", fontSize: 12 }}>
                  {t.category} · {t.date}
                </div>
              </div>
              <div
                style={{
                  color: t.type === "income" ? "#34d399" : "#f87171",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {t.type === "income" ? "+" : "-"}
                {fmt(t.amount)}
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
