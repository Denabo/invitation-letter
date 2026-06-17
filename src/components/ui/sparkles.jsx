import { motion } from "framer-motion";

/**
 * Decorative four-point sparkle (twinkling star). Purely cosmetic, so it is
 * hidden from assistive tech.
 */
function Star({ size = 16, color = "var(--antique)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 0c1.1 7.2 3.8 9.9 11 11-7.2 1.1-9.9 3.8-11 11-1.1-7.2-3.8-9.9-11-11 7.2-1.1 9.9-3.8 11-11Z"
        fill={color}
      />
    </svg>
  );
}

// Positions are offset from the horizontal centre so the sparkles flank the
// (centred) heading text regardless of its width.
const SPARKLES = [
  {
    top: -10,
    left: "calc(50% - 150px)",
    size: 15,
    dur: 3.2,
    delay: 0,
    color: "var(--antique)",
  },
  {
    top: 6,
    left: "calc(50% + 138px)",
    size: 22,
    dur: 3.9,
    delay: 0.7,
    color: "var(--bisque)",
  },
  {
    top: 44,
    left: "calc(50% - 172px)",
    size: 11,
    dur: 2.8,
    delay: 1.2,
    color: "var(--bisque)",
  },
  {
    top: 34,
    left: "calc(50% + 162px)",
    size: 12,
    dur: 3.4,
    delay: 0.35,
    color: "var(--antique)",
  },
];

/**
 * Wraps centred content (typically a heading) with a few gently twinkling
 * sparkles around it. Adds a soft, festive accent without affecting layout.
 */
export default function Sparkles({ children, style }) {
  return (
    <div style={{ position: "relative", ...style }}>
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            lineHeight: 0,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0.2, scale: 0.7 }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1, 0.7] }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star size={s.size} color={s.color} />
        </motion.span>
      ))}
      {children}
    </div>
  );
}
