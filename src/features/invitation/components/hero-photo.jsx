import { motion } from "framer-motion";

const HERO_PHOTO_SRC = "/photos/hero.jpg";
const HERO_PHOTO_FALLBACK_SRC = "/wedding-photo.jpg";

function handleHeroPhotoError(event) {
  if (!event.currentTarget.src.endsWith(HERO_PHOTO_FALLBACK_SRC)) {
    event.currentTarget.src = HERO_PHOTO_FALLBACK_SRC;
  }
}

export default function HeroPhoto() {
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
        onError={handleHeroPhotoError}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
    </section>
  );
}
