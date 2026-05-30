import { motion } from "framer-motion";
import { useConfig } from "@/features/invitation/hooks/use-config";

const HERO_PHOTO_SRC = "/photos/hero.jpg";
const HERO_PHOTO_FALLBACK_SRC = "/wedding-photo.jpg";

const photoMaskStyle = {
  clipPath:
    "polygon(0 0, 100% 0, 100% 88%, 96% 91%, 91% 87%, 86% 92%, 80% 89%, 74% 94%, 67% 90%, 61% 95%, 54% 91%, 48% 96%, 40% 90%, 33% 94%, 26% 89%, 19% 93%, 12% 88%, 6% 92%, 0 89%)",
};

function getWeddingDateLabel(config) {
  const day = String(config.weddingDay || 12).padStart(2, "0");
  const month = config.weddingMonth || "сентября";

  if (!config.weddingDate) {
    return `${day} ${month}`;
  }

  const year = new Date(config.weddingDate).getFullYear();
  return `${day} ${month} ${year}`;
}

function handleHeroPhotoError(event) {
  if (!event.currentTarget.src.endsWith(HERO_PHOTO_FALLBACK_SRC)) {
    event.currentTarget.src = HERO_PHOTO_FALLBACK_SRC;
  }
}

export default function HeroPhoto() {
  const config = useConfig();
  const names =
    config.coupleNames || `${config.brideName} & ${config.groomName}`;

  return (
    <section
      id="home"
      className="hero-photo"
      aria-label="Фото пары в шапке приглашения"
    >
      <motion.img
        className="hero-photo__image"
        src={HERO_PHOTO_SRC}
        alt="Фото пары"
        style={photoMaskStyle}
        onError={handleHeroPhotoError}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />

      <div className="hero-photo__shade" style={photoMaskStyle} />

      <motion.div
        className="hero-photo__content"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.28 }}
      >
        <p className="hero-photo__names">{names}</p>
        <p className="hero-photo__date">{getWeddingDateLabel(config)}</p>
      </motion.div>
    </section>
  );
}
