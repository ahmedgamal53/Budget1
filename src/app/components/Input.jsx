const Input = ({ label, error, ...props }) => (
  <div style={{ marginBottom: 14 }}>
    {label && (
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          color: "#8b9bb4",
          marginBottom: 6,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
    )}
    <input
      {...props}
      style={{
        width: "100%",
        padding: "10px 14px",
        background: "#111827",
        border: `1.5px solid ${error ? "#ef4444" : "#1f2d44"}`,
        borderRadius: 10,
        color: "#e2e8f0",
        fontSize: 14,
        outline: "none",
        boxSizing: "border-box",
        fontFamily: "inherit",
        transition: "border-color 0.2s",
        ...props.style,
      }}
      onFocus={(e) =>
        (e.target.style.borderColor = error ? "#ef4444" : "#3b82f6")
      }
      onBlur={(e) =>
        (e.target.style.borderColor = error ? "#ef4444" : "#1f2d44")
      }
    />
    {error && (
      <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>
        {error}
      </div>
    )}
  </div>
);

export default Input;
