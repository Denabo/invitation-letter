import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { useConfig } from "@/features/invitation/hooks/use-config";

export default function Gifts() {
  const config = useConfig();
  return (
    <>
      <section id="gifts" style={{ marginBottom: 44 }}>
        <RevealOnScroll>
          <h3
            style={{
              fontFamily: "Pinyon Script, cursive",
              fontSize: 72,
              color: "var(--antique-dark)",
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            дресс код
          </h3>
          <p
            className="invitation-info-text"
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {config.dressCode?.text}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 14,
              marginTop: 16,
            }}
          >
            {config.dressCode?.colors?.map((c) => (
              <div
                key={c}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
        </RevealOnScroll>
      </section>

      <section id="details" style={{ marginBottom: 44 }}>
        <RevealOnScroll>
          <h3
            style={{
              fontFamily: "Pinyon Script, cursive",
              fontSize: 72,
              color: "var(--antique-dark)",
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            детали
          </h3>
          <p
            className="invitation-info-text"
            style={{
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            {config.gifts?.text}
          </p>
          <a
            href="https://t.me"
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
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Телеграм
          </a>
        </RevealOnScroll>
      </section>
    </>
  );
}
