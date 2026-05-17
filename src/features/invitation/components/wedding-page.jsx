import "./wedding-page.css";
import { useEffect, useMemo, useState } from "react";
import { useConfig } from "@/features/invitation/hooks/use-config";

const WEEK_DAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

function Section({ children, className = "" }) {
  return <section className={`sl-reveal ${className}`}>{children}</section>;
}

function Divider() {
  return <div className="sl-divider" />;
}

function Countdown({ targetDate }) {
  const target = useMemo(() => new Date(targetDate), [targetDate]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  return (
    <>
      <p className="sl-countdown-label">До свадьбы осталось</p>
      <div className="sl-countdown sl-reveal-delay-1">
        {[
          `${String(days).padStart(3, "0")}|дней`,
          `${String(hours).padStart(2, "0")}|часов`,
          `${String(mins).padStart(2, "0")}|минут`,
          `${String(secs).padStart(2, "0")}|секунд`,
        ].map((item) => {
          const [num, label] = item.split("|");
          return (
            <div key={label} className="sl-countdown-unit">
              <div className="sl-countdown-num">{num}</div>
              <div className="sl-countdown-unit-label">{label}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function WeddingPage() {
  const config = useConfig();
  const date = config?.date || "2026-08-14";
  const dt = new Date(date);
  const monthLabel = dt.toLocaleDateString("ru-RU", { month: "long" });
  const year = dt.getFullYear();
  const month = dt.getMonth();
  const weddingDay = dt.getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  return (
    <div className="sl-page">
      <Section className="sl-hero">
        <p className="sl-hero-since">since 2024</p>
        <div className="sl-hero-script">love</div>
        <div className="sl-hero-script-2">story</div>
      </Section>
      <Divider />

      <Section className="sl-photos-grid">
        <div className="sl-polaroid sl-polaroid-1">
          <div className="sl-polaroid-placeholder">фото 1</div>
        </div>
        <div className="sl-polaroid sl-polaroid-2">
          <div className="sl-polaroid-placeholder">фото 2</div>
        </div>
      </Section>
      <Divider />

      <Section className="sl-names">
        <div className="sl-names-script">
          {config.groomName} &amp; {config.brideName}
        </div>
      </Section>
      <Divider />

      <Section className="sl-greeting">
        <p className="sl-title">Дорогие гости!</p>
        <p className="sl-muted">
          Совсем скоро наступит очень важный и особенный для нас день. Мы
          приглашаем вас разделить эту радость вместе с нами.
        </p>
      </Section>
      <Divider />

      <Section className="sl-calendar-wrap">
        <p className="sl-month">{monthLabel}</p>
        <div className="sl-calendar">
          <div className="sl-cal-header">
            {WEEK_DAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="sl-cal-body">
            {calendarCells.map((day, idx) => (
              <div
                key={`${day}-${idx}`}
                className={`sl-cal-day ${day === weddingDay ? "highlighted" : ""}`}
              >
                {day || ""}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Countdown targetDate={`${date}T15:30:00`} />
      <Divider />

      <Section className="sl-greeting">
        <p className="sl-title">Локация</p>
        <p className="sl-muted">
          {config.location}
          <br />
          {config.address}
        </p>
        <a
          className="sl-btn"
          href={config.maps_url}
          target="_blank"
          rel="noreferrer"
        >
          Карта
        </a>
      </Section>
    </div>
  );
}
