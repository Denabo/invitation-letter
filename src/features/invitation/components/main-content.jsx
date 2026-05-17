import { motion } from "framer-motion";
import Hero from "@/features/invitation/components/hero";
import { Events } from "@/features/events";
import { Location } from "@/features/location";
import { Wishes } from "@/features/wishes";
import { Gifts } from "@/features/gifts";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { getGuestName } from "@/lib/invitation-storage";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

function SectionDivider() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        width: 60,
        margin: "0 auto 64px",
      }}
    />
  );
}

function Footer() {
  return (
    <footer style={{ paddingTop: 48, paddingBottom: 48 }}>
      <motion.span
        style={{
          fontSize: 24,
          color: "var(--antique)",
          display: "block",
          marginBottom: 16,
          textAlign: "center",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        ♡
      </motion.span>
      <p
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontStyle: "italic",
          fontSize: 28,
          fontWeight: 300,
          color: "var(--antique-dark)",
          textAlign: "center",
        }}
      >
        Ждём вас!
      </p>
    </footer>
  );
}

function Greeting() {
  const config = useConfig();
  const guestName = getGuestName();
  return (
    <section id="greeting" style={{ marginBottom: 64 }}>
      <RevealOnScroll>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Дорогой {guestName || "гость"}!
        </p>
        <p
          style={{
            color: "var(--muted)",
            lineHeight: 2.2,
            fontSize: 13,
            textAlign: "center",
          }}
        >
          {config.greeting}
        </p>
      </RevealOnScroll>
    </section>
  );
}

export default function MainContent() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <Greeting />
      <SectionDivider />
      <Events />
      <SectionDivider />
      <Location />
      <SectionDivider />
      <Gifts />
      <SectionDivider />
      <Wishes />
      <SectionDivider />
      <Footer />
    </>
  );
}
