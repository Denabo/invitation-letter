import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { useConfig } from "@/features/invitation/hooks/use-config";

export default function Gifts() {
  const config = useConfig();

  return (
    <section id="gifts" style={{ marginBottom: 40 }}>
      <RevealOnScroll>
        <h3
          style={{
            fontFamily: "Great Vibes, cursive",
            fontSize: 58,
            fontWeight: 400,
            color: "var(--rose-dark)",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          дресс код
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "var(--muted)",
            lineHeight: 2,
            textAlign: "center",
          }}
        >
          {config.dressCode?.text}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: 24,
          }}
        >
          {config.dressCode?.colors?.map((color) => (
            <div
              key={color}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: color,
              }}
            />
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <h3
          style={{
            fontFamily: "Great Vibes, cursive",
            fontSize: 58,
            fontWeight: 400,
            color: "var(--rose-dark)",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          детали
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "var(--muted)",
            lineHeight: 2,
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {config.gifts?.text
            ?.replace("в конвертах. ", "в конвертах.\n\n")
            .replace("для нас ", "для нас\n")
            .replace("будет бутылочка ", "будет бутылочка\n")}
        </p>
      </RevealOnScroll>
    </section>
  );
}
