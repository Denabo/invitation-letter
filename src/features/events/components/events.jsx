import { motion } from "framer-motion";
import { GlassWater, CircleDot, UtensilsCrossed } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

const iconMap = {
  Welcome: GlassWater,
  Церемония: CircleDot,
  Банкет: UtensilsCrossed,
};

const RUKI_PHOTO_SRC = "/photos/ruki.jpg";

const calendarCardStyle = {
  width: "calc(100% - 48px)",
  maxWidth: 420,
  margin: "0 auto",
  padding: "24px 22px 26px",
  background: "var(--blush)",
  borderRadius: 34,
  border: "10px solid rgba(255, 255, 255, 0.82)",
  boxShadow:
    "inset 0 0 0 1px rgba(139, 79, 88, 0.08), 0 10px 30px rgba(93, 64, 55, 0.08)",
};

const calendarGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  columnGap: 7,
  rowGap: 8,
};

const calendarDayStyle = {
  minWidth: 0,
  height: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
};

export default function Events() {
  const config = useConfig();

  return (
    <section id="event" style={{ marginBottom: 34 }}>
      <RevealOnScroll>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={calendarCardStyle}>
            <p
              style={{
                fontFamily: "Pinyon Script, cursive",
                fontSize: 44,
                lineHeight: 1,
                color: "var(--antique-dark)",
                marginBottom: 16,
              }}
            >
              {config.weddingMonth || "Сентябрь"}
            </p>
            <div
              style={{
                ...calendarGridStyle,
                paddingBottom: 8,
                marginBottom: 6,
                borderBottom: "1px solid rgba(90, 58, 58, 0.16)",
              }}
            >
              {["пн", "вт", "ср", "чт", "пт", "сб", "вс"].map((d) => (
                <span
                  key={d}
                  style={{
                    color: "var(--muted)",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
            <div style={calendarGridStyle}>
              {Array.from({ length: config.calendarFirstDay ?? 1 }).map(
                (_, i) => (
                  <div key={`e-${i}`} style={calendarDayStyle} />
                ),
              )}
              {Array.from({ length: config.calendarDaysInMonth ?? 30 }).map(
                (_, i) => {
                  const day = i + 1;
                  const active = day === (config.weddingDay ?? 12);
                  return (
                    <div
                      key={day}
                      style={{
                        ...calendarDayStyle,
                        position: "relative",
                        color: active ? "var(--white)" : "var(--muted)",
                        fontWeight: active ? 500 : 300,
                      }}
                    >
                      {active && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 32 29"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            zIndex: 0,
                            width: 38,
                            height: 38,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <path
                            fill="var(--antique-dark)"
                            d="M16 28.5l-2.32-2.11C5.44 18.96 0 14.04 0 8.5 0 3.96 3.58.5 8 .5c2.54 0 4.99 1.18 6.62 3.04L16 5.1l1.38-1.56C19.01 1.68 21.46.5 24 .5c4.42 0 8 3.46 8 8 0 5.54-5.44 10.46-13.68 17.89L16 28.5z"
                          />
                        </svg>
                      )}
                      <span style={{ position: "relative", zIndex: 1 }}>
                        {day}
                      </span>
                    </div>
                  );
                },
              )}
            </div>
          </div>
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

      <section style={{ marginBottom: 34 }}>
        <h3
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text)",
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          Тайминг
        </h3>
        {config.schedule?.map((item, index) => {
          const Icon = iconMap[item.name] || CircleDot;
          return (
            <motion.div
              key={item.time + item.name}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border)",
                  borderTop: index === 0 ? "1px solid var(--border)" : "none",
                }}
              >
                <Icon size={26} color="var(--antique-dark)" strokeWidth={1.2} />
                <div>
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: 20,
                      color: "var(--antique-dark)",
                      fontStyle: "italic",
                    }}
                  >
                    {item.time}
                  </div>
                  <div
                    className="invitation-info-text"
                    style={{
                      fontSize: 16,
                      color: "var(--muted)",
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>
    </section>
  );
}
