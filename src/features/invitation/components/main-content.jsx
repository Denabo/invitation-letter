import { motion } from "framer-motion";
import HeroPhoto from "@/features/invitation/components/hero-photo";
import { Events } from "@/features/events";
import Countdown from "@/features/events/components/countdown";
import { Location } from "@/features/location";
import { Wishes } from "@/features/wishes";
import { Gifts } from "@/features/gifts";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { getGuestName } from "@/lib/invitation-storage";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

function Greeting() {
  const config = useConfig();
  const guestName = getGuestName();
  const names =
    config.coupleNames || `${config.brideName} & ${config.groomName}`;
  const salutation = guestName
    ? `${guestName}, дорогие родные и близкие!`
    : "Дорогие родные и близкие!";

  return (
    <section id="greeting" className="invitation-greeting">
      <RevealOnScroll>
        <img
          src="/Zagalovok.webp"
          alt={names}
          className="invitation-greeting__names-image"
        />
        <p className="invitation-greeting__title">{salutation}</p>
        <div className="invitation-greeting__copy">
          <p>В нашей жизни предстоят счастливые перемены!</p>
          <p>
            Мы хотим, чтобы в этот день рядом с нами были самые близкие и
            дорогие для нас люди. Будем рады разделить с вами чудесный праздник
            в день нашей свадьбы, которая состоится:
          </p>
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
      <HeroPhoto />
      <Greeting />
      <Events />
      <Location />
      <Wishes />
      <Gifts />
      <Countdown />
      <Footer />
    </>
  );
}
