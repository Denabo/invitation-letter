import { motion } from "framer-motion";

/**
 * Thin line-art envelope with a heart, gently "breathing" like the footer
 * heart. Decorative accent for the wishes section.
 */
export default function EnvelopeHeart({ size = 64 }) {
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
      <rect
        x="8"
        y="16"
        width="48"
        height="34"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 20l24 17 24-17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 40c-2.2-2-4.6-3.6-4.6-6.1 0-1.5 1.2-2.7 2.7-2.7 1 0 1.6.5 1.9 1 .3-.5.9-1 1.9-1 1.5 0 2.7 1.2 2.7 2.7 0 2.5-2.4 4.1-4.6 6.1Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}
