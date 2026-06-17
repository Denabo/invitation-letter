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

  // Текст с Заглавной буквы
  const salutation = guestName
    ? `${guestName}, дорогие родные и друзья!`
    : "Дорогие родные и друзья!";

  return (
    <section id="greeting" className="invitation-greeting">
      <RevealOnScroll>
        <img
          src="/Zagalovok.webp"
          alt={names}
          className="invitation-greeting__names-image"
          style={{ display: "block", margin: "0 auto", maxWidth: "80%" }}
        />

        <h3
          style={{
            /* КОПИРУЕМ ИЗ ТВОЕЙ АНКЕТЫ */
            fontFamily: "var(--font-script)",
            color: "var(--antique-dark)",
            textAlign: "center",

            /* НАСТРОЙКИ РАЗМЕРА И ПЛОТНОСТИ */
            fontSize: 45, // Чуть меньше 72, чтобы фраза влезла
            lineHeight: 1, // СБЛИЖАЕМ СТРОКИ (чем меньше число, тем ближе)
            marginTop: 15,
            marginBottom: 10,
            fontWeight: "normal",
          }}
        >
          {salutation}
        </h3>

        <div
          className="invitation-greeting__copy"
          style={{ textAlign: "center" }}
        >
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
          fontFamily: "var(--font-script)",
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
      <Gifts />
      <Wishes />
      <Countdown />
      <Footer />
    </>
  );
}
