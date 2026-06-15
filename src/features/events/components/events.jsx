import RevealOnScroll from "@/components/ui/reveal-on-scroll";

const RUKI_PHOTO_SRC = "/photos/ruki.jpg";

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

function TimelinePiece({ src, left, width, cy, alt }) {
  return (
    <RevealOnScroll
      style={{
        position: "absolute",
        top: `${cy}%`,
        left: `${left}%`,
        width: `${width}%`,
        pointerEvents: "none",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          transform: "translateY(-50%)",
          height: "auto",
        }}
      />
    </RevealOnScroll>
  );
}

export default function Events() {
  return (
    <section id="event" style={{ marginTop: -8, marginBottom: 34 }}>
      <div
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

        {timeline.map((stop) => (
          <div key={stop.alt}>
            <TimelinePiece {...stop.icon} cy={stop.cy} alt={stop.alt} />
            <TimelinePiece {...stop.text} cy={stop.cy} alt="" />
          </div>
        ))}
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
