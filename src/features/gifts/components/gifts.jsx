import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import Sparkles from "@/components/ui/sparkles";
import { useConfig } from "@/features/invitation/hooks/use-config";
import EnvelopeHeart from "./envelope-heart";

const headingStyle = {
  fontFamily: "var(--font-script)",
  fontSize: 72,
  color: "var(--heading-script)",
  textAlign: "center",
  marginBottom: 14,
};

export default function Gifts() {
  const config = useConfig();
  return (
    <>
      <section id="gifts" style={{ marginBottom: 44 }}>
        <RevealOnScroll>
          <Sparkles>
            <h3 style={headingStyle}>дресс код</h3>
          </Sparkles>
          <p
            className="invitation-info-text"
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {config.dressCode?.text}
          </p>
          <img
            src="/photos/color.jpg"
            alt="Цветовая палитра нарядов"
            style={{
              display: "block",
              width: "100%",
              borderRadius: 16,
              marginTop: 8,
            }}
          />
        </RevealOnScroll>
      </section>

      <section id="details" style={{ marginBottom: 44 }}>
        <RevealOnScroll>
          <Sparkles>
            <h3 style={headingStyle}>пожелания</h3>
          </Sparkles>

          <p
            className="invitation-info-text"
            style={{ textAlign: "center", marginBottom: 22 }}
          >
            {config.gifts?.money}
          </p>

          <div style={{ margin: "26px 0" }}>
            <EnvelopeHeart />
          </div>

          <p
            className="invitation-info-text"
            style={{ textAlign: "center", marginBottom: 18 }}
          >
            {config.gifts?.flowers}
          </p>

          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "block",
              width: "100%",
              border: "1px solid var(--antique)",
              color: "var(--antique)",
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
