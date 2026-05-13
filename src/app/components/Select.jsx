import React from "react";

const Select = ({ label, children, ...props }) => (
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
    <select
      {...props}
      style={{
        width: "100%",
        padding: "10px 14px",
        background: "#111827",
        border: "1.5px solid #1f2d44",
        borderRadius: 10,
        color: "#e2e8f0",
        fontSize: 14,
        outline: "none",
        boxSizing: "border-box",
        fontFamily: "inherit",
        cursor: "pointer",
      }}
    >{children}</select>
  </div>
);

export default Select;
