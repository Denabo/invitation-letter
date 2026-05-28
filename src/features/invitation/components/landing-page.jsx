import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainContent from "@/features/invitation/components/main-content";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100dvh",
  zIndex: 100,
  pointerEvents: "none",
};

const innerStyle = {
  position: "relative",
  width: "100%",
  maxWidth: 390,
  minHeight: "100dvh",
  margin: "0 auto",
  overflow: "hidden",
  isolation: "isolate",
  contain: "paint",
  background: "transparent",
  boxShadow: "0 0 80px rgba(0,0,0,0.1)",
  pointerEvents: "auto",
};

const bottomOrnamentStyle = {
  position: "absolute",
  left: "50%",
  top: "35.5%",
  width: "125%",
  height: "auto",
  maxWidth: "none",
  zIndex: 2,
};

const topOrnamentStyle = {
  position: "absolute",
  left: "50%",
  top: "52%",
  width: "103%",
  height: "auto",
  maxWidth: "none",
  zIndex: 3,
};

const sideOrnamentBaseStyle = {
  position: "absolute",
  width: "100%",
  height: "auto",
  maxWidth: "none",
  top: "50%",
  zIndex: 1,
};

const ORNAMENT_EXIT_DURATION = 8;

const ornamentExitTransition = {
  duration: ORNAMENT_EXIT_DURATION,
  ease: [0.76, 0, 0.24, 1],
};

export default function LandingPage() {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
  };

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
                delay: ORNAMENT_EXIT_DURATION,
                duration: 0.01,
                ease: "linear",
              },
            }}
            style={overlayStyle}
          >
            <div style={innerStyle}>
              <motion.img
                src="/button.webp"
                alt="bottom ornament"
                initial={{ x: "-50%", y: 0, scale: 1 }}
                animate={{ x: "-50%", y: 0, scale: 1 }}
                exit={{ x: "-50%", y: "150%", scale: 1.02 }}
                transition={ornamentExitTransition}
                style={bottomOrnamentStyle}
              />

              <motion.img
                src="/top.webp"
                alt="top ornament"
                initial={{ x: "-50%", y: "-100%", scale: 1 }}
                animate={{ x: "-50%", y: "-100%", scale: 1 }}
                exit={{ x: "-50%", y: "-250%", scale: 1.02 }}
                transition={ornamentExitTransition}
                style={topOrnamentStyle}
              />

              <motion.img
                src="/left.webp"
                alt="left ornament"
                initial={{ x: 0, y: "-50%", scale: 1, rotate: 0 }}
                animate={{ x: 0, y: "-50%", scale: 1, rotate: 0 }}
                exit={{ x: "-150%", y: "-50%", scale: 1.015, rotate: -2 }}
                transition={ornamentExitTransition}
                style={{ ...sideOrnamentBaseStyle, left: "-18%", top: "57%" }}
              />

              <motion.img
                src="/right.webp"
                alt="right ornament"
                initial={{ x: 0, y: "-50%", scale: 1, rotate: 0 }}
                animate={{ x: 0, y: "-50%", scale: 1, rotate: 0 }}
                exit={{ x: "150%", y: "-50%", scale: 1.015, rotate: 2 }}
                transition={ornamentExitTransition}
                style={{ ...sideOrnamentBaseStyle, right: "-18%" }}
              />

              <motion.button
                type="button"
                onClick={handleOpen}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  position: "absolute",
                  left: "50%",
                  x: "-50%",
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            key="main-content"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0 }}
          >
            <MainContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
