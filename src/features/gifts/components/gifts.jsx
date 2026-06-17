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
            href="tel:+79107421348"
            style={{
              border: "1px solid var(--antique)",
              borderRadius: 40,
              padding: "12px 36px",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--antique)",
              background: "transparent",
              display: "block",
              width: "fit-content",
              margin: "0 auto",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            контакты
          </a>
        </RevealOnScroll>
      </section>
    </>
  );
}
