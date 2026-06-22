import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { useAudio } from "@/hooks/use-audio";

export default function MusicPlayer() {
  const { isPlaying, toggle } = useAudio({
    src: "/audio/dasha.mp3", // ← захардкодили путь
    loop: true,
  });

  return (
    <section style={{ margin: "8px 0 28px" }}>
      <RevealOnScroll>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "none",
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
        </div>
      </RevealOnScroll>
    </section>
  );
}