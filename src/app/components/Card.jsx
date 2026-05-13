const Card = ({ children, style: s, warning }) => (
  <div
    style={{
      background: warning ? "rgba(251,191,36,0.08)" : "#0f172a",
      border: `1.5px solid ${warning ? "#f59e0b" : "#1f2d44"}`,
      borderRadius: 16,
      padding: 20,
      ...s,
    }}
  >
    {children}
  </div>
);

export default Card;
