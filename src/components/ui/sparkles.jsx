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
const HEADING_SPARKLES = [
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

// Spread across the whole wrapped area (e.g. the timeline image), as
// percentages so it scales with the container.
const SCATTER_SPARKLES = [
  {
    top: "4%",
    left: "12%",
    size: 16,
    dur: 3.4,
    delay: 0,
    color: "var(--antique)",
  },
  {
    top: "9%",
    left: "82%",
    size: 12,
    dur: 3.0,
    delay: 0.8,
    color: "var(--bisque)",
  },
  {
    top: "33%",
    left: "88%",
    size: 18,
    dur: 3.8,
    delay: 0.4,
    color: "var(--bisque)",
  },
  {
    top: "46%",
    left: "6%",
    size: 13,
    dur: 2.9,
    delay: 1.1,
    color: "var(--antique)",
  },
  {
    top: "68%",
    left: "84%",
    size: 15,
    dur: 3.5,
    delay: 0.6,
    color: "var(--antique)",
  },
  {
    top: "80%",
    left: "10%",
    size: 12,
    dur: 3.1,
    delay: 1.4,
    color: "var(--bisque)",
  },
];

/**
 * Wraps content with a few gently twinkling sparkles. `variant="heading"`
 * flanks a centred heading; `variant="scatter"` spreads them across the whole
 * wrapped area. Purely cosmetic, never affects layout.
 */
export default function Sparkles({ children, style, variant = "heading" }) {
  const sparkles = variant === "scatter" ? SCATTER_SPARKLES : HEADING_SPARKLES;
  return (
    <div style={{ position: "relative", ...style }}>
      {sparkles.map((s, i) => (
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
