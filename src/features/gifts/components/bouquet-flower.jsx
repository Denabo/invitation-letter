import { motion } from "framer-motion";

/**
 * Thin line-art bouquet that gently "breathes" like the envelope/footer heart.
 * Decorative accent placed after the flowers note in the wishes section.
 */
export default function BouquetFlower({ size = 64 }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      style={{ display: "block", margin: "0 auto", color: "var(--antique)" }}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* stems gathered at the tie */}
      <path
        d="M32 52V30M32 52l-9-22M32 52l9-22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* leaves */}
      <path
        d="M32 44c-4 0-7-2-8-5 4-1 7 1 8 5ZM32 44c4 0 7-2 8-5-4-1-7 1-8 5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {/* three flower heads */}
      <circle cx="32" cy="22" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="26" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="44" cy="26" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="22" r="1.6" fill="currentColor" />
      <circle cx="20" cy="26" r="1.4" fill="currentColor" />
      <circle cx="44" cy="26" r="1.4" fill="currentColor" />
      {/* ribbon tie */}
      <path
        d="M27 50c2 1.5 8 1.5 10 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
