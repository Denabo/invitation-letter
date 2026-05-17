import { motion } from "framer-motion";
import { useConfig } from "@/features/invitation/hooks/use-config";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import Divider from "@/components/ui/divider";

export default function Hero() {
  const config = useConfig();

  return (
    <section id="home" style={{ textAlign: "center", padding: "80px 0 0" }}>
      <RevealOnScroll>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 8,
          }}
        >
          since 2024
        </p>
      </RevealOnScroll>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontStyle: "italic",
          fontSize: 72,
          fontWeight: 300,
          lineHeight: 1,
          color: "var(--rose-dark)",
        }}
      >
        love
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontStyle: "italic",
          fontSize: 52,
          fontWeight: 300,
          lineHeight: 1,
          color: "var(--rose-dark)",
        }}
      >
        story
      </motion.div>

      <Divider />

      <RevealOnScroll>
        <div
          style={{
            height: 220,
            position: "relative",
            margin: "0 auto",
            maxWidth: 320,
          }}
        >
          {[
            ["-130px", "10px", "rotate(-6deg)", 1],
            ["-20px", "0", "rotate(5deg)", 2],
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                padding: "10px 10px 32px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transform: card[2],
                position: "absolute",
                left: `calc(50% + ${card[0]})`,
                top: card[1],
                zIndex: card[3],
              }}
            >
              <div
                style={{
                  width: 110,
                  height: 110,
                  background: "#e8e0d8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                фото
              </div>
            </div>
          ))}
          <span
            style={{
              position: "absolute",
              color: "var(--rose)",
              fontSize: 18,
              top: 20,
              right: "calc(50% - 160px)",
            }}
          >
            ♡
          </span>
          <span
            style={{
              position: "absolute",
              color: "var(--rose)",
              fontSize: 18,
              bottom: 20,
              left: "calc(50% + 80px)",
            }}
          >
            ♡
          </span>
        </div>
      </RevealOnScroll>

      <Divider />

      <RevealOnScroll>
        <p
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            fontSize: 36,
            fontWeight: 300,
            color: "var(--rose-dark)",
            textAlign: "center",
          }}
        >
          {config.coupleNames || `${config.brideName} & ${config.groomName}`}
        </p>
      </RevealOnScroll>
    </section>
  );
}
