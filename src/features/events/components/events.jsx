import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
const RUKI_PHOTO_SRC = "/photos/ruki.jpg";

const PIECE_DURATION = 1;
const LINE_DURATION = 0.9;
const GENTLE_EASE = [0.25, 0.1, 0.25, 1];

/** Срабатывает только когда блок реально доскроллили (не при открытии страницы) */
const SCROLL_VIEWPORT = {
  once: true,
  amount: 0.35,
  margin: "0px 0px -35% 0px",
};

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

function TimelinePiece({ isInView, src, side, left, width, cy, alt, delay }) {
  const fromX = side === "left" ? -28 : 28;

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
        initial={{ opacity: 0, x: fromX, scale: 0.94 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: fromX, scale: 0.94 }
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
        }}
      />
    </div>
  );
}
export default function Events() {
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, SCROLL_VIEWPORT);

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
        <motion.img
          src="/taiming/red line.webp"
          alt="12 сентября — план дня"
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={
            isInView
              ? { opacity: 1, clipPath: "inset(0 0 0% 0)" }
              : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
          }
          transition={{
            duration: LINE_DURATION,
            delay: 0,
            ease: GENTLE_EASE,
          }}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            transformOrigin: "center top",
          }}
        />

        {timeline.map((stop, index) => {
          const baseDelay = 0.15 + index * 0.22;

          return (
            <div key={stop.alt}>
              <TimelinePiece
                isInView={isInView}
                {...stop.icon}
                cy={stop.cy}
                alt={stop.alt}
                delay={baseDelay}
              />
              <TimelinePiece
                isInView={isInView}
                {...stop.text}
                cy={stop.cy}
                alt=""
                delay={baseDelay + 0.12}
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
