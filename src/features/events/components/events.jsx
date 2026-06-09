import { useEffect, useState } from "react";
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
  background: "var(--champagne)",
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
  const [timeLeft, setTimeLeft] = useState({
    days: "000",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  useEffect(() => {
    const target = new Date(2026, 8, 12, 15, 30, 0);
    const timer = setInterval(() => {
      const diff = target - new Date();
      if (diff <= 0)
        return setTimeLeft({
          days: "000",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      setTimeLeft({
        days: String(Math.floor(diff / 86400000)).padStart(3, "0"),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
        seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            zIndex: 0,
                            color: "var(--antique-dark)",
                            fontSize: 42,
                            lineHeight: 1,
                            transform: "translate(-50%, -45%)",
                          }}
                        >
                          ♥
                        </span>
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
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--muted)",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          До свадьбы осталось
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            gap: 0,
            marginBottom: 22,
          }}
        >
          {[
            [timeLeft.days, "дней"],
            [timeLeft.hours, "часов"],
            [timeLeft.minutes, "минут"],
            [timeLeft.seconds, "секунд"],
          ].map((u, i) => (
            <div key={u[1]} style={{ display: "contents" }}>
              <div style={{ minWidth: 60, textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 44,
                    fontWeight: 300,
                    color: "var(--antique-dark)",
                    lineHeight: 1,
                  }}
                >
                  {u[0]}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginTop: 4,
                  }}
                >
                  {u[1]}
                </div>
              </div>
              {i < 3 && (
                <span
                  style={{
                    fontSize: 28,
                    color: "var(--antique)",
                    padding: "0 6px",
                    alignSelf: "flex-start",
                    marginTop: 6,
                  }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <figure
          style={{
            width: "calc(100% - 48px)",
            maxWidth: 420,
            margin: "0 auto 28px",
            overflow: "hidden",
            borderRadius: 28,
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
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
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
