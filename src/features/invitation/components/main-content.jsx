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
import Sparkles from "@/components/ui/sparkles";

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
          style={{
            display: "block",
            margin: "0 auto",
            width: "100%",
            maxWidth: "100%",
          }}
        />

        <Sparkles>
          <h3
            style={{
              /* КОПИРУЕМ ИЗ ТВОЕЙ АНКЕТЫ */
              fontFamily: "var(--font-script)",
              color: "var(--heading-script)",
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
        </Sparkles>

        <div
          className="invitation-greeting__copy"
          style={{ textAlign: "center" }}
        >
          <p>
            С огромной радостью и большой любовью приглашаем вас разделить с
            нами трогательный и важный момент нашей жизни!
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
      <Sparkles>
        <p
          style={{
            fontFamily: "var(--font-script)",
            fontSize: 48,
            color: "var(--heading-script)",
          }}
        >
          ждём вас!
        </p>
      </Sparkles>
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
