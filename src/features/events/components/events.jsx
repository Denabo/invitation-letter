import RevealOnScroll from "@/components/ui/reveal-on-scroll";

const RUKI_PHOTO_SRC = "/photos/ruki.jpg";

// Коэффициент появления: 0.5 — это середина экрана. 
// Попробуйте 0.2 или 0.3 для более раннего появления снизу.
const TRIGGER_RATIO = 0.9;

const timeline = [
  {
    cy: 34.7,
    alt: "11:00 — Венчание, ул. Осенняя, 24",
    icon: { src: "/taiming/кольца.webp", left: 13, width: 26 },
    text: { src: "/taiming/кольца время.webp", left: 54, width: 25 },
  },
  {
    cy: 61.4,
    alt: "15:00 — Велком, Парк-отель Лукоморье",
    icon: { src: "/taiming/стаканы.webp", left: 54, width: 28 },
    text: { src: "/taiming/стаканы время.webp", left: 15, width: 23 },
  },
  {
    cy: 80.1,
    alt: "16:00 — Банкет, Парк-отель Лукоморье",
    icon: { src: "/taiming/ьанкет.webp", left: 13, width: 30 },
    text: { src: "/taiming/Банкет время.webp", left: 57, width: 25 },
  },
];

function TimelineItem({ item }) {
  return (
    <div
      style={{
        position: "absolute",
        top: `${item.cy}%`,
        left: 0,
        width: "100%",
        pointerEvents: "none",
      }}
    >
      <RevealOnScroll triggerRatio={TRIGGER_RATIO}>
        <div style={{ position: "relative", width: "100%" }}>
          {/* Иконка события */}
          <div
            style={{
              position: "absolute",
              left: `${item.icon.left}%`,
              width: `${item.icon.width}%`,
              transform: "translateY(-50%)",
            }}
          >
            <img
              src={item.icon.src}
              alt={item.alt}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          {/* Текст времени */}
          <div
            style={{
              position: "absolute",
              left: `${item.text.left}%`,
              width: `${item.text.width}%`,
              transform: "translateY(-50%)",
            }}
          >
            <img
              src={item.text.src}
              alt=""
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}

export default function Events() {
  return (
    <section id="event" style={{ marginTop: 1, marginBottom: 34 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 440,
          margin: "0 auto 8px",
          // ВАЖНО: Укажите здесь соотношение сторон вашей картинки red line.webp
          // Это зафиксирует высоту контейнера и уберет "дергание" анимации.
          aspectRatio: "440 / 920", 
        }}
      >
        {/* Фоновая картинка (линия) */}
        <img
          src="/taiming/red line.webp"
          alt="12 сентября — план дня"
          loading="eager"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />

        {/* Элементы поверх линии */}
        {timeline.map((item, index) => (
          <TimelineItem key={index} item={item} />
        ))}
      </div>

      {/* Фото рук в конце секции */}
      <div style={{ marginTop: -40 }}>
        <RevealOnScroll triggerRatio={TRIGGER_RATIO}>
          <figure
            style={{
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
              lineHeight: 0,
              margin: 0,
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
      </div>
    </section>
  );
}