import { motion } from "framer-motion";
import { useConfig } from "@/features/invitation/hooks/use-config";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

const photoIntroTransition = {
  duration: 0.9,
  ease: "easeOut",
};

function getWeddingDateLabel(config) {
  const day = String(config.weddingDay || 12).padStart(2, "0");
  const month = config.weddingMonth || "Сентябрь";

  if (!config.weddingDate) {
    return `${day} ${month}`;
  }

  const year = new Date(config.weddingDate).getFullYear();
  return `${day} ${month} ${year}`;
}

export default function Hero() {
  const config = useConfig();
  const names =
    config.coupleNames || `${config.brideName} & ${config.groomName}`;

  return (
    <section
      id="home"
      className="invitation-hero"
      aria-label="Главный экран приглашения"
    >
      <motion.div
        className="invitation-hero__cover"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={photoIntroTransition}
        role="img"
        aria-label="Фото пары"
      >
        <div className="invitation-hero__cover-glow" />
        <p className="invitation-hero__eyebrow">wedding day</p>
      </motion.div>

      <RevealOnScroll>
        <div
          className="invitation-hero__polaroids"
          aria-label="Фотографии пары"
        >
          <motion.figure
            className="invitation-hero__polaroid invitation-hero__polaroid--left"
            initial={{ opacity: 0, x: -42, rotate: -9 }}
            whileInView={{ opacity: 1, x: 0, rotate: -3 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="invitation-hero__polaroid-photo" />
          </motion.figure>
          <motion.figure
            className="invitation-hero__polaroid invitation-hero__polaroid--right"
            initial={{ opacity: 0, x: 42, rotate: 8 }}
            whileInView={{ opacity: 1, x: 0, rotate: 2 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          >
            <div className="invitation-hero__polaroid-photo" />
          </motion.figure>
          <motion.p
            className="invitation-hero__names"
            initial={{ opacity: 0, x: "-50%", y: 12, scale: 0.96 }}
            whileInView={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
          >
            {names}
          </motion.p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="invitation-hero__date-block">
          <p className="invitation-hero__date">{getWeddingDateLabel(config)}</p>
          <p className="invitation-hero__caption">
            С любовью приглашаем вас разделить с нами этот день
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <div
          className="invitation-hero__landscape"
          role="img"
          aria-label="Пейзаж с горами и природой"
        >
          <div className="invitation-hero__landscape-sun" />
          <div className="invitation-hero__mountain invitation-hero__mountain--back" />
          <div className="invitation-hero__mountain invitation-hero__mountain--front" />
        </div>
      </RevealOnScroll>
    </section>
  );
}
