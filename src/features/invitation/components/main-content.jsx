import { motion } from "framer-motion";
import Hero from "@/features/invitation/components/hero";
import { Events } from "@/features/events";
import { Location } from "@/features/location";
import { Wishes } from "@/features/wishes";
import { Gifts } from "@/features/gifts";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { getGuestName } from "@/lib/invitation-storage";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

function Greeting() {
  const config = useConfig();
  const guestName = getGuestName();
  return (
    <section id="greeting" style={{ marginBottom: 44, textAlign: "center" }}>
      <RevealOnScroll>
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text)",
            marginBottom: 14,
          }}
        >
          Дорогой {guestName || "гость"}!
        </p>
        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.9 }}>
          {config.greeting}
        </p>
      </RevealOnScroll>
    </section>
  );
}

function Footer() {
  return (
    <section style={{ padding: "32px 0 48px", textAlign: "center" }}>
      <motion.span
        style={{
          fontSize: 28,
          color: "var(--antique)",
          display: "block",
          marginBottom: 12,
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        ♡
      </motion.span>
      <p
        style={{
          fontFamily: "Great Vibes, cursive",
          fontSize: 48,
          color: "var(--antique-dark)",
        }}
      >
        Ждём вас!
      </p>
    </section>
  );
}

export default function MainContent() {
  return (
    <>
      <Hero />
      <Greeting />
      <Events />
      <Location />
      <Wishes />
      <Gifts />
      <Footer />
    </>
  );
}
