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
    <section id="event" style={{ marginBottom: 36 }}>
      <RevealOnScroll>
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: 20,
            }}
          >
            {config.weddingMonth || "Сентябрь"}
          </p>
          <div
            style={{
              display: "block",
              width: "100%",
              border: "1px solid var(--border)",
              padding: "20px 24px",
              background: "var(--champagne)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 36px)",
                gap: 4,
                marginBottom: 8,
              }}
            >
              {["пн", "вт", "ср", "чт", "пт", "сб", "вс"].map((d) => (
                <span
                  key={d}
                  style={{
                    fontSize: 10,
                    color: "var(--text)",
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
                gridTemplateColumns: "repeat(7, 36px)",
                gap: 4,
              }}
            >
              {Array.from({ length: config.calendarFirstDay ?? 1 }).map(
                (_, i) => (
                  <div key={`e-${i}`} style={{ width: 36, height: 36 }} />
                ),
              )}
              {Array.from({ length: config.calendarDaysInMonth ?? 30 }).map(
                (_, i) => {
                  const day = i + 1;
                  const isActive = day === (config.weddingDay ?? 12);
                  return (
                    <div
                      key={day}
                      style={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        color: isActive ? "#fff" : "var(--muted)",
                        background: isActive
                          ? "var(--antique-dark)"
                          : "transparent",
                        borderRadius: isActive ? "50%" : 0,
                        fontWeight: isActive ? 500 : 300,
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
      <RevealOnScroll delay={0.15}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textAlign: "center",
            color: "var(--text)",
            margin: "40px 0 16px",
          }}
        >
          До свадьбы осталось
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            gap: 8,
          }}
        >
          {[
            [timeLeft.days, "дней"],
            [timeLeft.hours, "часов"],
            [timeLeft.minutes, "минут"],
            [timeLeft.seconds, "секунд"],
          ].map((u, idx) => (
            <div key={u[1]} style={{ display: "contents" }}>
              <div style={{ minWidth: 60, textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 48,
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
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text)",
                    marginTop: 4,
                  }}
                >
                  {u[1]}
                </div>
              </div>
              {idx < 3 && (
                <span
                  style={{
                    fontSize: 24,
                    color: "var(--antique)",
                    padding: "0 4px",
                    marginTop: 8,
                  }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <section style={{ textAlign: "center" }}>
        <h3
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "var(--text)",
            marginBottom: 12,
          }}
        >
          Тайминг
        </h3>
        {config.schedule?.map((item, index) => {
          const Icon = iconMap[item.name] || CircleDot;
          return (
            <motion.div
              key={item.time + item.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  justifyContent: "center",
                  padding: "16px 0",
                }}
              >
                <Icon size={28} color="var(--antique-dark)" strokeWidth={1.5} />
                <div style={{ textAlign: "left", minWidth: 120 }}>
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: 20,
                      color: "var(--antique-dark)",
                    }}
                  >
                    {item.time}
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--text)",
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </div>
              {index < config.schedule.length - 1 && (
                <div style={{ borderTop: "1px solid var(--border)" }} />
              )}
            </motion.div>
          );
        })}
      </section>
    </section>
  );
}
