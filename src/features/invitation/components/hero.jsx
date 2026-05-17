import { motion } from "framer-motion";
import { useConfig } from "@/features/invitation/hooks/use-config";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

export default function Hero() {
  const config = useConfig();

  return (
    <section
      id="home"
      style={{
        paddingTop: 44,
        textAlign: "center",
        position: "relative",
        marginBottom: 44,
      }}
    >
      <motion.span
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
        style={{
          fontFamily: "Pinyon Script, cursive",
          fontSize: 110,
          color: "var(--antique-dark)",
          lineHeight: 0.9,
          display: "block",
        }}
      >
        love
      </motion.span>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          position: "absolute",
          top: 54,
          right: 60,
          fontSize: 9,
          letterSpacing: "0.25em",
          color: "var(--muted)",
          textTransform: "uppercase",
        }}
      >
        since 2024
      </motion.p>
      <motion.span
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut", delay: 0.3 }}
        style={{
          fontFamily: "Pinyon Script, cursive",
          fontSize: 96,
          color: "var(--antique-dark)",
          lineHeight: 0.9,
          display: "block",
        }}
      >
        story
      </motion.span>

      <div style={{ position: "relative", height: 210, margin: "28px 0 24px" }}>
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -20 }}
          animate={{ opacity: 1, x: 0, rotate: -7 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
          style={{
            position: "absolute",
            background: "var(--white)",
            padding: "10px 10px 36px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            transform: "rotate(-7deg)",
            left: "calc(50% - 120px)",
            top: 10,
            zIndex: 1,
          }}
        >
          <div style={{ width: 120, height: 120, background: "#e0d8d0" }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 20 }}
          animate={{ opacity: 1, x: 0, rotate: 6 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
          style={{
            position: "absolute",
            background: "var(--white)",
            padding: "10px 10px 36px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            transform: "rotate(6deg)",
            left: "calc(50% - 10px)",
            top: 0,
            zIndex: 2,
          }}
        >
          <div style={{ width: 120, height: 120, background: "#e0d8d0" }} />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          style={{
            position: "absolute",
            top: 8,
            left: "calc(50% + 70px)",
            color: "var(--antique-dark)",
            fontSize: 16,
          }}
        >
          ♡
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          style={{
            position: "absolute",
            bottom: 8,
            left: "calc(50% - 90px)",
            color: "var(--antique-dark)",
            fontSize: 16,
          }}
        >
          ♡
        </motion.span>
      </div>

      <RevealOnScroll>
        <p
          style={{
            fontFamily: "Pinyon Script, cursive",
            fontSize: 64,
            color: "var(--antique-dark)",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          {config.coupleNames || `${config.brideName} & ${config.groomName}`}
        </p>
      </RevealOnScroll>
    </section>
  );
}
