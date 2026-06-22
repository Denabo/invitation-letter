"use client";

import { useRef, useState } from "react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import Sparkles from "@/components/ui/sparkles";
import { useConfig } from "@/features/invitation/hooks/use-config";

export default function Location() {
  const config = useConfig();

  const ceremony = config.location?.ceremony ?? {
    name: "Венчание",
    address: "г. Воронеж, Осенняя 24",
    mapsUrl:
      "https://yandex.ru/maps/193/voronezh/house/osennyaya_ulitsa_24/Z0AYdg5jTUYEQFtrfXp0cntmZg==/?ll=39.095092%2C51.653558&z=17.52",
  };

  const banquet = config.location?.banquet ?? {
    name: "Банкет",
    address: 'г. Воронеж, Парк-отель "Лукоморье"',
    mapsUrl:
      "https://yandex.ru/maps/org/lukomorye/80744907903/?ll=39.469502%2C51.615050&z=15.4",
  };

  const slides = [ceremony, banquet];

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
    } else if (diff < -50 && current < slides.length - 1) {
      setCurrent(current + 1);
    }

    touchStartX.current = null;
  };

  return (
    <section id="location" style={{ textAlign: "center", marginBottom: 44 }}>
      <RevealOnScroll>
        <Sparkles>
          <h3
            style={{
              fontFamily: "var(--font-script)",
              fontSize: 72,
              color: "var(--heading-script)",
              textAlign: "center",
              marginBottom: 8,
              lineHeight: 1,
              fontWeight: 400,
            }}
          >
            локация
          </h3>
        </Sparkles>

        <p
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: "var(--text)",
            opacity: 0.9,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </p>

        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              transition: "transform 0.4s ease",
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                style={{
                  minWidth: "100%",
                  boxSizing: "border-box",
                  padding: "0 4px",
                  textAlign: "center",
                }}
              >
                <p
                  className="invitation-info-text"
                  style={{
                    textAlign: "center",
                    marginBottom: 18,
                  }}
                >
                  {slide.name}
                  <br />
                  {slide.address}
                </p>

                <a
                  href={slide.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
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
                    cursor: "pointer",
                    textAlign: "center",
                    textDecoration: "none",
                    transition: "background 0.3s, color 0.3s",
                  }}
                >
                  Карта
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
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
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
      </RevealOnScroll>
    </section>
  );
}
