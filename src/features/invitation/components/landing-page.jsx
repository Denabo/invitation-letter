import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainContent from "@/features/invitation/components/main-content";

const smoothTransition = {
  duration: 2.8,
  ease: [0.16, 1, 0.3, 1],
};

export default function LandingPage() {
  const [opened, setOpened] = useState(false);

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        {!opened && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { delay: 1.6, duration: 0.5, ease: "easeOut" },
            }}
            style={{
              position: "fixed",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(100%, 390px)",
              height: "100vh",
              zIndex: 100,
              overflow: "hidden",
              background: "var(--bg)",
            }}
          >
            {/* BOTTOM */}
            <motion.img
              src="/button.webp"
              alt=""
              loading="eager"
              decoding="async"
              initial={{ opacity: 0, x: "-50%", y: 0 }}
              animate={{ opacity: 1, x: "-50%", y: 0 }}
              exit={{ opacity: 0, x: "-50%", y: 380 }}
              transition={smoothTransition}
              style={{
                position: "absolute",
                left: "50%",
                width: "125%",
                height: "auto",
                maxWidth: "none",
                bottom: "-4%",
                zIndex: 2,
                willChange: "transform, opacity",
              }}
            />

            {/* TOP */}
            <motion.img
              src="/top.webp"
              alt=""
              loading="eager"
              decoding="async"
              initial={{ opacity: 0, x: "-50%", y: 0 }}
              animate={{ opacity: 1, x: "-50%", y: 0 }}
              exit={{ opacity: 0, x: "-50%", y: -380 }}
              transition={smoothTransition}
              style={{
                position: "absolute",
                left: "50%",
                width: "103%",
                height: "auto",
                maxWidth: "none",
                top: "-4%",
                zIndex: 3,
                willChange: "transform, opacity",
              }}
            />

            {/* LEFT */}
<motion.img
  src="/left.webp"
  alt=""
  loading="eager"
  decoding="async"
  initial={{ opacity: 0, x: 0, y: "-50%" }}
  animate={{ opacity: 1, x: 0, y: "-50%" }}
  exit={{ opacity: 0, x: -480, y: "-50%" }}
  transition={smoothTransition}
  style={{
    position: "absolute",
    width: "60%",
    height: "auto",
    maxWidth: "none",
    top: "50%",
    left: "-8%", // вынесен за край
    zIndex: 1,
    willChange: "transform, opacity",
  }}
/>
            {/* RIGHT */}
            <motion.img
              src="/right.webp"
              alt=""
              loading="eager"
              decoding="async"
              initial={{ opacity: 0, x: 0, y: "-50%" }}
              animate={{ opacity: 1, x: 0, y: "-50%" }}
              exit={{ opacity: 0, x: 380, y: "-50%" }}
              transition={smoothTransition}
              style={{
                position: "absolute",
                width: "52%",
                height: "auto",
                maxWidth: "none",
                top: "50%",
                right: 0,
                zIndex: 1,
                willChange: "transform, opacity",
              }}
            />

            {/* КНОПКА */}
            <motion.button
              type="button"
              onClick={() => setOpened(true)}
              initial={{ opacity: 0, scale: 0.9, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%" }}
              exit={{
                opacity: 0,
                scale: 0.9,
                x: "-50%",
                transition: { delay: 0, duration: 0.25 },
              }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              style={{
                position: "absolute",
                left: "50%",
                bottom: "12%",
                border: "1px solid var(--antique-dark)",
                color: "var(--antique-dark)",
                background: "white",
                borderRadius: 999,
                padding: "14px 32px",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                zIndex: 120,
                willChange: "transform, opacity",
                touchAction: "manipulation",
              }}
            >
              открыть
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{
              maxWidth: 390,
              margin: "0 auto",
              background: "var(--bg)",
              minHeight: "100vh",
            }}
          >
            <MainContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}