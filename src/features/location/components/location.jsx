import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import Divider from "@/components/ui/divider";
import { useConfig } from "@/features/invitation/hooks/use-config";

export default function Location() {
  const config = useConfig();
  return (
    <section id="location">
      <RevealOnScroll>
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            Локация
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 2,
              marginBottom: 20,
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
              border: "1px solid var(--rose-dark)",
              color: "var(--rose-dark)",
              padding: "14px 32px",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "transparent",
              cursor: "pointer",
              display: "block",
              maxWidth: 280,
              margin: "0 auto",
              textAlign: "center",
              textDecoration: "none",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            Карта
          </a>
        </div>
      </RevealOnScroll>
      <Divider />
    </section>
  );
}
