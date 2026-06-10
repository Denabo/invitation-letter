import { motion } from "framer-motion";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { useConfig } from "@/features/invitation/hooks/use-config";

/* ── Custom inline SVG icons (identical on every device) ── */

function RingsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle
        cx="9"
        cy="15"
        r="5.2"
        fill="none"
        stroke="var(--rose-line)"
        strokeWidth="1.6"
      />
      <circle
        cx="15"
        cy="15"
        r="5.2"
        fill="none"
        stroke="var(--rose-line)"
        strokeWidth="1.6"
      />
      <path
        d="M12 9.4l-1.7-3a1 1 0 0 1 .9-1.5h1.6a1 1 0 0 1 .9 1.5z"
        fill="var(--rose-line)"
      />
    </svg>
  );
}

function GlassIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M5 4h14l-6 8v6"
        fill="none"
        stroke="var(--rose-line)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M8 18h10"
        stroke="var(--rose-line)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="16" cy="6" r="1.5" fill="var(--rose-line)" />
    </svg>
  );
}

function PlateIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle
        cx="12"
        cy="13"
        r="6"
        fill="none"
        stroke="var(--rose-line)"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="13" r="2.4" fill="var(--rose-line)" />
      <path
        d="M5 3v6M3.4 3v3.2M6.6 3v3.2"
        stroke="var(--rose-line)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M19 3c-1.4 0-2 1.8-2 3.4 0 1.2.7 2 2 2.2V3z"
        fill="var(--rose-line)"
      />
    </svg>
  );
}

const iconByName = {
  Венчание: RingsIcon,
  Велком: GlassIcon,
  Банкет: PlateIcon,
};

/* viewBox geometry — nodes & connecting serpentine line */
const VIEW_W = 300;
const VIEW_H = 540;

const NODES = [
  { x: 95, y: 100, side: "right" },
  { x: 205, y: 270, side: "left" },
  { x: 95, y: 440, side: "right" },
];

const LINE_PATH = `
  M150,0
  C150,42 95,56 95,100
  C95,152 205,206 205,270
  C205,340 95,392 95,440
  C95,486 150,502 150,540
`;

export default function Timeline() {
  const config = useConfig();
  const schedule = config.schedule || [];

  return (
    <section style={{ marginBottom: 34 }}>
      <RevealOnScroll>
        <h3
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text)",
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          Тайминг дня
        </h3>

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 360,
            margin: "0 auto",
            aspectRatio: `${VIEW_W} / ${VIEW_H}`,
          }}
        >
          {/* Rose serpentine connecting line */}
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
            aria-hidden="true"
          >
            <motion.path
              d={LINE_PATH}
              fill="none"
              stroke="var(--rose-line)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Event nodes */}
          {schedule.map((item, index) => {
            const node = NODES[index] || NODES[NODES.length - 1];
            const Icon = iconByName[item.name] || RingsIcon;
            const leftPct = (node.x / VIEW_W) * 100;
            const topPct = (node.y / VIEW_H) * 100;

            return (
              <div
                key={item.time + item.name}
                style={{
                  position: "absolute",
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: node.side === "right" ? "row" : "row-reverse",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {/* Animated icon bubble */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 14,
                    delay: 0.5 + index * 0.45,
                  }}
                  style={{
                    flexShrink: 0,
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    background: "var(--white)",
                    border: "2px solid var(--rose-line)",
                    boxShadow: "0 4px 14px rgba(200, 60, 75, 0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon />
                </motion.div>

                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.45 }}
                  style={{
                    textAlign: node.side === "right" ? "left" : "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: 18,
                      fontStyle: "italic",
                      color: "var(--rose-line)",
                      lineHeight: 1,
                    }}
                  >
                    {item.time}
                  </div>
                  <div
                    style={{
                      fontFamily: "Pinyon Script, cursive",
                      fontSize: 30,
                      color: "var(--rose-line)",
                      lineHeight: 1.1,
                    }}
                  >
                    {item.name}
                  </div>
                  {item.place && (
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        color: "var(--muted)",
                      }}
                    >
                      {item.place}
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </RevealOnScroll>
    </section>
  );
}
