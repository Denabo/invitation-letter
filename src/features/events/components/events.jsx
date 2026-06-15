import { useRef, useEffect } from "react";
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
  const wrapperRef = useRef(null);

  return (
    <div
      ref={wrapperRef}
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
        initial={false}
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
        onAnimationStart={() => {
          if (!alt) return;
          const rect = wrapperRef.current?.getBoundingClientRect();
          // #region agent log
          fetch("http://127.0.0.1:7845/ingest/4bef384a-8e96-47be-98e1-0b78e8505595", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Debug-Session-Id": "93f2b8",
            },
            body: JSON.stringify({
              sessionId: "93f2b8",
              hypothesisId: "H4",
              location: "events.jsx:TimelinePiece:onAnimationStart",
              message: "piece animation started",
              data: {
                alt,
                cy,
                side,
                isInView,
                scrollY: window.scrollY,
                wrapperTop: rect?.top,
                wrapperHeight: rect?.height,
              },
              timestamp: Date.now(),
            }),
          }).catch(() => {});
          // #endregion
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
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(sectionRef, SCROLL_VIEWPORT);
  const mountCountRef = useRef(0);

  useEffect(() => {
    mountCountRef.current += 1;
    const sectionRect = sectionRef.current?.getBoundingClientRect();
    const timelineRect = timelineRef.current?.getBoundingClientRect();
    // #region agent log
    fetch("http://127.0.0.1:7845/ingest/4bef384a-8e96-47be-98e1-0b78e8505595", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "93f2b8",
      },
      body: JSON.stringify({
        sessionId: "93f2b8",
        hypothesisId: "H5",
        location: "events.jsx:mount",
        message: "Events mounted",
        data: {
          mountCount: mountCountRef.current,
          isInView,
          scrollY: window.scrollY,
          innerHeight: window.innerHeight,
          sectionTop: sectionRect?.top,
          sectionBottom: sectionRect?.bottom,
          timelineTop: timelineRect?.top,
          timelineHeight: timelineRect?.height,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  }, []);

  useEffect(() => {
    const sectionRect = sectionRef.current?.getBoundingClientRect();
    const timelineRect = timelineRef.current?.getBoundingClientRect();
    const visibleHeight = sectionRect
      ? Math.min(sectionRect.bottom, window.innerHeight) -
        Math.max(sectionRect.top, 0)
      : 0;
    const intersectionRatio = sectionRect?.height
      ? Math.max(0, visibleHeight / sectionRect.height)
      : 0;

    // #region agent log
    fetch("http://127.0.0.1:7845/ingest/4bef384a-8e96-47be-98e1-0b78e8505595", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "93f2b8",
      },
      body: JSON.stringify({
        sessionId: "93f2b8",
        hypothesisId: "H1",
        location: "events.jsx:isInViewEffect",
        message: "isInView state changed",
        data: {
          isInView,
          scrollY: window.scrollY,
          innerHeight: window.innerHeight,
          sectionTop: sectionRect?.top,
          sectionBottom: sectionRect?.bottom,
          sectionHeight: sectionRect?.height,
          timelineTop: timelineRect?.top,
          timelineHeight: timelineRect?.height,
          computedIntersectionRatio: intersectionRatio,
          viewportConfig: SCROLL_VIEWPORT,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  }, [isInView]);

  useEffect(() => {
    const onScroll = () => {
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      // #region agent log
      fetch("http://127.0.0.1:7845/ingest/4bef384a-8e96-47be-98e1-0b78e8505595", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "93f2b8",
        },
        body: JSON.stringify({
          sessionId: "93f2b8",
          hypothesisId: "H2",
          location: "events.jsx:scroll",
          message: "scroll event",
          data: {
            isInView,
            scrollY: window.scrollY,
            sectionTop: sectionRect?.top,
            sectionBottom: sectionRect?.bottom,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="event"
      style={{ marginTop: -8, marginBottom: 34 }}
    >
      <div
        ref={timelineRef}
        style={{          position: "relative",
          width: "100%",
          maxWidth: 440,
          margin: "0 auto 8px",
        }}
      >
        <motion.img
          src="/taiming/red line.webp"
          alt="12 сентября — план дня"
          initial={false}
          animate={
            isInView
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.98, y: 12 }
          }
          transition={{
            duration: LINE_DURATION,
            delay: 0,
            ease: GENTLE_EASE,
          }}
          onAnimationStart={() => {
            // #region agent log
            fetch("http://127.0.0.1:7845/ingest/4bef384a-8e96-47be-98e1-0b78e8505595", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Debug-Session-Id": "93f2b8",
              },
              body: JSON.stringify({
                sessionId: "93f2b8",
                hypothesisId: "H3",
                location: "events.jsx:redLine:onAnimationStart",
                message: "red line animation started",
                data: { isInView, scrollY: window.scrollY },
                timestamp: Date.now(),
              }),
            }).catch(() => {});
            // #endregion
          }}          style={{
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
