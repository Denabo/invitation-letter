import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainContent from "@/features/invitation/components/main-content";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  margin: "0 auto",
  width: "100%",
  maxWidth: 390,
  height: "100vh",
  zIndex: 100,
  overflow: "hidden",
  background: "var(--bg, #faf9f6)",
};

const bottomOrnamentStyle = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: "125%",
  height: "auto",
  maxWidth: "none",
  bottom: "-4%",
  zIndex: 2,
};

const topOrnamentStyle = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: "103%",
  height: "auto",
  maxWidth: "none",
  top: "-4%",
  zIndex: 3,
};

const sideOrnamentBaseStyle = {
  position: "absolute",
  width: "64%",
  height: "auto",
  maxWidth: "none",
  top: "50%",
  zIndex: 1,
};

const smoothTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

export default function LandingPage() {
  const [opened, setOpened] = useState(false);

  return (
    <div style={{ "--bg": "#faf9f6", "--antique-dark": "#5d4037" }}>
      <AnimatePresence initial={false} mode="wait">
        {!opened && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.85,
                duration: 0.45,
                ease: "easeOut",
              },
            }}
            style={overlayStyle}
          >
            <motion.img
              src="/button.webp"
              alt="bottom ornament"
              initial={{
                opacity: 0,
                y: 0,
                scale: 1,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 320,
                scale: 1.02,
              }}
              transition={smoothTransition}
              style={bottomOrnamentStyle}
            />

            <motion.img
              src="/top.webp"
              alt="top ornament"
              initial={{
                opacity: 0,
                y: 0,
                scale: 1,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -320,
                scale: 1.02,
              }}
              transition={smoothTransition}
              style={topOrnamentStyle}
            />

            <motion.img
              src="/left.webp"
              alt="left ornament"
              initial={{
                opacity: 0,
                x: 0,
                y: "-50%",
                scale: 1,
                rotate: 0,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: "-50%",
                scale: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                x: -320,
                y: "-50%",
                scale: 1.015,
                rotate: -2,
              }}
              transition={smoothTransition}
              style={{
                ...sideOrnamentBaseStyle,
                left: "-18%",
              }}
            />

            <motion.img
              src="/right.webp"
              alt="right ornament"
              initial={{
                opacity: 0,
                x: 0,
                y: "-50%",
                scale: 1,
                rotate: 0,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: "-50%",
                scale: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                x: 320,
                y: "-50%",
                scale: 1.015,
                rotate: 2,
              }}
              transition={smoothTransition}
              style={{
                ...sideOrnamentBaseStyle,
                right: "-18%",
              }}
            />

            <motion.button
              type="button"
              onClick={() => setOpened(true)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: { delay: 0, duration: 0.2 },
              }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
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
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MainContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
