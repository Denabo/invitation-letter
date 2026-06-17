import { useEffect, useState } from "react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

export default function Countdown() {
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
    <section style={{ marginBottom: 8 }}>
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
                    fontFamily: "var(--font-serif)",
                    fontSize: 44,
                    fontWeight: 300,
                    color: "var(--heading-script)",
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
    </section>
  );
}
