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
    <section id="greeting" className="invitation-greeting">
      <RevealOnScroll>
        <p className="invitation-greeting__title">Дорогие друзья!</p>
        <div className="invitation-greeting__copy">
          <p>
            {guestName
              ? `${guestName}, совсем скоро наступит очень важный и особенный для нас день.`
              : "Совсем скоро наступит очень важный и особенный для нас день."}
          </p>
          <p>{config.greeting}</p>
        </div>
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
          fontFamily: "Pinyon Script, cursive",
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
