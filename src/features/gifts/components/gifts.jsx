import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import Divider from "@/components/ui/divider";
import { useConfig } from "@/features/invitation/hooks/use-config";

export default function Gifts() {
  const config = useConfig();

  return (
    <section id="gifts">
      <RevealOnScroll>
        <h3
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            fontSize: 48,
            fontWeight: 300,
            color: "var(--rose-dark)",
            textAlign: "center",
            marginBottom: 16,
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

      <Divider />

      <RevealOnScroll>
        <h3
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            fontSize: 48,
            fontWeight: 300,
            color: "var(--rose-dark)",
            textAlign: "center",
            marginBottom: 16,
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
      <Divider />
    </section>
  );
}
