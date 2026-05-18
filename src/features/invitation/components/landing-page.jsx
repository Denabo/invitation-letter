import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainContent from "@/features/invitation/components/main-content";

const overlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 100,
  overflow: "hidden",
  background: "var(--bg)",
};

const sharedSvgStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(44vw, 320px)",
  maxWidth: "320px",
  maxHeight: "44vh",
  pointerEvents: "none",
};

export default function LandingPage() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!opened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.75 }}
            style={overlayStyle}
          >
            <motion.img
              src="/top.svg"
              alt="top"
              initial={{ scale: 0.9, opacity: 0, y: -40 }}
              animate={{ scale: 1, opacity: 1, y: -120 }}
              exit={{ y: -420, opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              style={{ ...sharedSvgStyle, zIndex: 4 }}
            />

            <motion.img
              src="/left.svg"
              alt="left"
              initial={{ scale: 0.9, opacity: 0, x: -40 }}
              animate={{ scale: 1, opacity: 1, x: -160, y: 80 }}
              exit={{ x: -460, opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
              style={{ ...sharedSvgStyle, zIndex: 2 }}
            />

            <motion.img
              src="/right.svg"
              alt="right"
              initial={{ scale: 0.9, opacity: 0, x: 40 }}
              animate={{ scale: 1, opacity: 1, x: 160, y: 80 }}
              exit={{ x: 460, opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
              style={{ ...sharedSvgStyle, zIndex: 2 }}
            />

            <motion.img
              src="/button.svg"
              alt="bottom"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 160 }}
              exit={{ y: 460, opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
              style={{ ...sharedSvgStyle, zIndex: 3 }}
            />

            <motion.button
              type="button"
              onClick={() => setOpened(true)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, duration: 0.35 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                border: "1px solid var(--antique-dark)",
                color: "var(--antique-dark)",
                background: "var(--white)",
                borderRadius: 999,
                padding: "14px 30px",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                pointerEvents: "auto",
                zIndex: 120,
              }}
            >
              открыть
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 0.6, delay: opened ? 0.2 : 0 }}
      >
        <MainContent />
      </motion.div>
    </>
  );
}
