import { useRef } from "react";
import { motion } from "framer-motion";
import RevealOnScroll, { useReveal } from "@/components/ui/reveal-on-scroll";

const RUKI_PHOTO_SRC = "/photos/ruki.jpg";

const PIECE_DURATION = 0.72;
const GENTLE_EASE = [0.22, 1, 0.36, 1];

const timeline = [
  {
    cy: 27.7,
    alt: "11:00 — Венчание, ул. Осенняя, 24",
    icon: { src: "/taiming/кольца.webp", side: "left", left: 13, width: 26 },
    text: {
      src: "/taiming/кольца время.webp",
      side: "right",
      left: 54,
      width: 25,
    },
  },
  {
    cy: 56.4,
    alt: "15:00 — Велком, Парк-отель Лукоморье",
    icon: { src: "/taiming/стаканы.webp", side: "right", left: 54, width: 28 },
    text: {
      src: "/taiming/стаканы время.webp",
      side: "left",
      left: 20,
      width: 23,
    },
  },
  {
    cy: 75.1,
    alt: "16:00 — Банкет, Парк-отель Лукоморье",
    icon: { src: "/taiming/ьанкет.webp", side: "left", left: 13, width: 30 },
    text: {
      src: "/taiming/Банкет время.webp",
      side: "right",
      left: 57,
      width: 25,
    },
  },
];

function TimelinePiece({ isVisible, src, side, left, width, cy, alt, delay }) {
  const fromX = side === "left" ? -18 : 18;

  return (
    <div
      style={{
        position: "absolute",
        top: `${cy}%`,
        left: `${left}%`,
        width: `${width}%`,
        transform: "translateY(-50%)",
        pointerEvents: "none",
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 0, x: fromX, scale: 0.96, filter: "blur(6px)" }}
        animate={
          isVisible
            ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, x: fromX, scale: 0.96, filter: "blur(6px)" }
        }
        transition={{
          duration: PIECE_DURATION,
          delay,
          ease: GENTLE_EASE,
        }}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          willChange: "opacity, transform, filter",
        }}
      />
    </div>
  );
}

export default function Events() {
  const timelineRef = useRef(null);
  const isTimelineVisible = useReveal(timelineRef);

  return (
    <section id="event" style={{ marginTop: -8, marginBottom: 34 }}>
      <div
        ref={timelineRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 440,
          margin: "0 auto 8px",
        }}
      >
        <img
          src="/taiming/red line.webp"
          alt="12 сентября — план дня"
          loading="lazy"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
          }}
        />

        {timeline.map((stop, index) => {
          const baseDelay = index * 0.16;

          return (
            <div key={stop.alt}>
              <TimelinePiece
                isVisible={isTimelineVisible}
                {...stop.icon}
                cy={stop.cy}
                alt={stop.alt}
                delay={baseDelay}
              />
              <TimelinePiece
                isVisible={isTimelineVisible}
                {...stop.text}
                cy={stop.cy}
                alt=""
                delay={baseDelay + 0.08}
              />
            </div>
          );
        })}
      </div>

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
