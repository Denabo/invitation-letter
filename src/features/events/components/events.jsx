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
    <section id="event" style={{ marginBottom: 44 }}>
      <RevealOnScroll>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--text)",
              marginBottom: 16,
            }}
          >
            {config.weddingMonth || "Сентябрь"}
          </p>
          <div
            style={{
              display: "inline-block",
              background: "var(--champagne)",
              padding: "16px 20px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 34px)",
                gap: 4,
                marginBottom: 8,
              }}
            >
              {["пн", "вт", "ср", "чт", "пт", "сб", "вс"].map((d) => (
                <span
                  key={d}
                  style={{
                    fontSize: 10,
                    color: "var(--muted)",
                    letterSpacing: "0.05em",
                    textAlign: "center",
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 34px)",
                gap: 4,
                justifyContent: "center",
              }}
            >
              {Array.from({ length: config.calendarFirstDay ?? 1 }).map(
                (_, i) => (
                  <div key={`e-${i}`} style={{ width: 34, height: 34 }} />
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
                        width: 34,
                        height: 34,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        color: active ? "var(--white)" : "var(--muted)",
                        background: active
                          ? "var(--antique-dark)"
                          : "transparent",
                        borderRadius: active ? "50%" : 0,
                        fontWeight: active ? 500 : 300,
                      }}
                    >
                      {day}
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
            marginBottom: 12,
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
            marginBottom: 44,
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

      <section style={{ marginBottom: 44 }}>
        <h3
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text)",
            textAlign: "center",
            marginBottom: 20,
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
