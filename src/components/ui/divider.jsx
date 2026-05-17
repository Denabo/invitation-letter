export default function Divider({ horizontal = false }) {
  if (horizontal) {
    return (
      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--border)",
          margin: "32px 0",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: 1,
        height: 60,
        background: "var(--border)",
        margin: "40px auto",
      }}
    />
  );
}
