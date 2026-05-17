import { motion } from "framer-motion";
import { useConfig } from "@/features/invitation/hooks/use-config";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

export default function Hero() {
  const config = useConfig();

  return (
    <section
      id="home"
      style={{ textAlign: "center", padding: "72px 0 0", marginBottom: 64 }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            fontFamily: "Great Vibes, cursive",
            fontSize: 86,
            fontWeight: 700,
            lineHeight: 1,
            color: "var(--antique-dark)",
          }}
        >
          love
        </motion.div>
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "var(--muted)",
            position: "absolute",
            top: 8,
            right: -40,
          }}
        >
          since 2024
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        style={{
          fontFamily: "Great Vibes, cursive",
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1,
          color: "var(--antique-dark)",
        }}
      >
        story
      </motion.div>

      <div
        style={{
          height: 180,
          position: "relative",
          margin: "32px auto",
          maxWidth: 320,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -120, rotate: -15 }}
          animate={{ opacity: 1, x: 0, rotate: -6 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          style={{
            background: "#fff",
            padding: "10px 10px 32px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            position: "absolute",
            left: "calc(50% - 130px)",
            top: 10,
            zIndex: 1,
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 120, rotate: 15 }}
          animate={{ opacity: 1, x: 0, rotate: 5 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
          style={{
            background: "#fff",
            padding: "10px 10px 32px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            position: "absolute",
            left: "calc(50% - 20px)",
            top: 0,
            zIndex: 2,
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
        </motion.div>

        {[
          { top: 20, right: "calc(50% - 160px)" },
          { bottom: 20, left: "calc(50% + 80px)" },
        ].map((heart, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.1 }}
            style={{
              position: "absolute",
              color: "var(--antique)",
              fontSize: 18,
              ...heart,
            }}
          >
            ♡
          </motion.span>
        ))}
      </div>

      <RevealOnScroll>
        <p
          style={{
            fontFamily: "Great Vibes, cursive",
            fontStyle: "italic",
            fontSize: 48,
            color: "var(--antique-dark)",
            marginTop: 32,
            textAlign: "center",
          }}
        >
          {config.coupleNames || `${config.brideName} & ${config.groomName}`}
        </p>
      </RevealOnScroll>
      <div style={{ marginTop: 48 }} />
    </section>
  );
}
