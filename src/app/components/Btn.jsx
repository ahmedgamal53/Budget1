const Btn = ({ children, variant = "primary", small, style: s, ...props }) => {
  const styles = {
    primary: {
      background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
      color: "#fff",
      border: "none",
    },
    danger: {
      background: "linear-gradient(135deg,#ef4444,#b91c1c)",
      color: "#fff",
      border: "none",
    },
    ghost: {
      background: "transparent",
      color: "#8b9bb4",
      border: "1.5px solid #1f2d44",
    },
    success: {
      background: "linear-gradient(135deg,#10b981,#059669)",
      color: "#fff",
      border: "none",
    },
  };
  return (
    <button
      {...props}
      style={{
        padding: small ? "6px 14px" : "11px 20px",
        borderRadius: 10,
        fontSize: small ? 13 : 14,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "opacity 0.15s, transform 0.1s",
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        ...styles[variant],
        ...s,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {children}
    </button>
  );
};

export default Btn;
