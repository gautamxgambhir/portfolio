"use client";
export default function Footer() {
  return (
    <footer
      style={{
        background: "#0B0B0D",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "24px 0",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#F2EEE9",
          }}
        >
          Copyright 2026
        </p>
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#F2EEE9",
          }}
        >
          <span>Built by</span>
          <a
            href="https://github.com/gautamxgambhir"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target"
            style={{
              color: "#F2EEE9",
              textDecoration: "underline",
              textUnderlineOffset: 2,
            }}
          >
            Gautam Gambhir
          </a>
        </div>
      </div>
    </footer>
  );
}
