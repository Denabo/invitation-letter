import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { useConfig } from "@/features/invitation/hooks/use-config";

export default function Location() {
  const config = useConfig();
  return (
    <section id="location" style={{ textAlign: "center", marginBottom: 44 }}>
      <RevealOnScroll>
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text)",
            marginBottom: 12,
          }}
        >
          Локация
        </p>
        <p
          style={{
            fontSize: 13,
            color: "var(--muted)",
            lineHeight: 1.9,
            marginBottom: 18,
          }}
        >
          {config.location?.name}
          <br />
          {config.location?.address}
        </p>
        <a
          href={config.location?.mapsUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "block",
            width: "100%",
            border: "1px solid var(--antique-dark)",
            color: "var(--antique-dark)",
            padding: 14,
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "transparent",
            cursor: "pointer",
            textAlign: "center",
            textDecoration: "none",
            transition: "background 0.3s, color 0.3s",
          }}
        >
          Карта
        </a>
      </RevealOnScroll>
    </section>
  );
}
