import { motion } from "framer-motion";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

const RUKI_PHOTO_SRC = "/photos/ruki.jpg";

// Aspect ratio of the backbone illustration (896 x 1728)
const LINE_ASPECT = (1728 / 896) * 100;

/*
 * Each stop is pinned to one of the three dots on the red line.
 * cy = vertical center of the dot (% of the illustration height).
 * The icon and the time-text sit on opposite sides of the line and
 * animate in from their respective edge as you scroll.
 */
const timeline = [
  {
    cy: 33.7,
    alt: "11:00 — Венчание, ул. Осенняя, 24",
    icon: { src: "/taiming/кольца.webp", side: "left", left: 4, width: 26 },
    text: {
      src: "/taiming/кольца время.webp",
      side: "right",
      left: 57,
      width: 37,
    },
  },
  {
    cy: 62.4,
    alt: "15:00 — Велком, Парк-отель Лукоморье",
    icon: { src: "/taiming/стаканы.webp", side: "right", left: 64, width: 28 },
    text: {
      src: "/taiming/стаканы время.webp",
      side: "left",
      left: 2,
      width: 35,
    },
  },
  {
    cy: 82.1,
    alt: "16:00 — Банкет, Парк-отель Лукоморье",
    icon: { src: "/taiming/ьанкет.webp", side: "left", left: 4, width: 30 },
    text: {
      src: "/taiming/Банкет время.webp",
      side: "right",
      left: 57,
      width: 37,
    },
  },
];

function TimelinePiece({ src, side, left, width, cy, alt, delay }) {
  const fromX = side === "left" ? -36 : 36;
  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      initial={{ opacity: 0, x: fromX, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        top: `${cy}%`,
        left: `${left}%`,
        width: `${width}%`,
        height: "auto",
        transform: "translateY(-50%)",
        pointerEvents: "none",
      }}
    />
  );
}

export default function Events() {
  return (
    <section id="event" style={{ marginBottom: 34 }}>
      <RevealOnScroll>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 440,
            margin: "0 auto 8px",
            paddingTop: `${LINE_ASPECT}%`,
          }}
        >
          {/* The hand-drawn red backbone with the date header */}
          <img
            src="/taiming/red line.webp"
            alt="12 сентября — план дня"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />

          {timeline.map((stop) => (
            <div key={stop.alt} style={{ display: "contents" }}>
              <TimelinePiece
                {...stop.icon}
                cy={stop.cy}
                alt={stop.alt}
                delay={0}
              />
              <TimelinePiece {...stop.text} cy={stop.cy} alt="" delay={0.18} />
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <figure
          style={{
            width: "100%",
            maxWidth: "100%",
            margin: "36px 0 40px",
            overflow: "hidden",
            lineHeight: 0,
          }}
        >
          <img
            src={RUKI_PHOTO_SRC}
            alt="Руки пары"
            loading="lazy"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </figure>
      </RevealOnScroll>
    </section>
  );
}
