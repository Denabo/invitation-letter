import { useRef, useState } from "react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import Sparkles from "@/components/ui/sparkles";
import { useConfig } from "@/features/invitation/hooks/use-config";
import BouquetFlower from "./bouquet-flower";
import EnvelopeHeart from "./envelope-heart";

const headingStyle = {
  fontFamily: "var(--font-script)",
  fontSize: 72,
  color: "var(--heading-script)",
  textAlign: "center",
  marginBottom: 14,
};

const contacts = [
  { name: "Даниил", phone: "+79107421348" },
  { name: "Дарья", phone: "+79521023266" },
];

function ContactsCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50 && current > 0) {
      setCurrent(current - 1);
    } else if (diff < -50 && current < contacts.length - 1) {
      setCurrent(current + 1);
    }
    touchStartX.current = null;
  };

  return (
    <div>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ overflow: "hidden", width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            transition: "transform 0.4s ease",
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {contacts.map((contact) => (
            <div
              key={contact.phone}
              style={{
                minWidth: "100%",
                boxSizing: "border-box",
                padding: "0 4px",
                textAlign: "center",
              }}
            >
              <a
                href={`tel:${contact.phone}`}
                style={{
                  display: "inline-block",
                  border: "1px solid var(--antique)",
                  borderRadius: 999,
                  padding: "12px 36px",
                  fontSize: 10,
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--antique)",
                  background: "transparent",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                {contact.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: 16,
        }}
      >
        {contacts.map((contact, index) => (
          <button
            key={contact.phone}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={contact.name}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: "var(--antique)",
              opacity: current === index ? 1 : 0.3,
              transition: "opacity 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Gifts() {
  const config = useConfig();
  return (
    <>
      <section id="gifts" style={{ marginBottom: 44 }}>
        <RevealOnScroll>
          <Sparkles>
            <h3 style={headingStyle}>дресс код</h3>
          </Sparkles>
          <p
            className="invitation-info-text"
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {config.dressCode?.text}
          </p>
          
          {/* Первое фото (палитра) */}
          <img
            src="/photos/color.jpg"
            alt="Цветовая палитра нарядов"
            style={{
              display: "block",
              width: "100%",
              marginTop: 8,
            }}
          />
          
          {/* Второе фото (добавленное) */}
          <img
            src="/photos/photo1.png"
            alt="Примеры нарядов"
            style={{
              display: "block",
              width: "100%",
              marginTop: 16, // Отступ между первой и второй фотографией
            }}
          />
        </RevealOnScroll>
      </section>

      <section id="details" style={{ marginBottom: 44 }}>
        <RevealOnScroll>
          <Sparkles>
            <h3 style={headingStyle}>пожелания</h3>
          </Sparkles>

          <p
            className="invitation-info-text"
            style={{ textAlign: "center", marginBottom: 22 }}
          >
            {config.gifts?.money}
          </p>

          <div style={{ margin: "26px 0" }}>
            <EnvelopeHeart />
          </div>

          <p
            className="invitation-info-text"
            style={{ textAlign: "center", marginBottom: 18 }}
          >
            {config.gifts?.flowers}
          </p>

          <div style={{ margin: "26px 0" }}>
            <BouquetFlower />
          </div>

          <ContactsCarousel />
        </RevealOnScroll>
      </section>
    </>
  );
}