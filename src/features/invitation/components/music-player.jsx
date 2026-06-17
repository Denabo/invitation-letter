import { motion } from "framer-motion";
import { Pause, Play, Volume2 } from "lucide-react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useAudio } from "@/hooks/use-audio";

export default function MusicPlayer() {
  const config = useConfig();
  const { isPlaying, volume, setVolume, toggle } = useAudio({
    src: config.audio?.src || "/audio/fulfilling-humming.mp3",
    loop: true,
  });

  const handleVolume = (e) => setVolume(Number(e.target.value) / 100);

  return (
    <section style={{ margin: "8px 0 28px" }}>
      <RevealOnScroll>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            maxWidth: 320,
            margin: "0 auto",
            padding: "12px 16px",
            border: "1px solid var(--antique)",
            borderRadius: 40,
            background: "transparent",
          }}
        >
          <motion.button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Пауза" : "Включить музыку"}
            whileTap={{ scale: 0.9 }}
            animate={isPlaying ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={
              isPlaying
                ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
            style={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid var(--antique)",
              background: "var(--antique)",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            {isPlaying ? (
              <Pause size={20} fill="#fff" />
            ) : (
              <Play size={20} fill="#fff" style={{ marginLeft: 2 }} />
            )}
          </motion.button>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 6,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {config.audio?.title || "Наша музыка"}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Volume2
                size={16}
                color="var(--antique)"
                style={{ flexShrink: 0 }}
              />
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(volume * 100)}
                onChange={handleVolume}
                aria-label="Громкость"
                style={{
                  width: "100%",
                  accentColor: "var(--antique)",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
