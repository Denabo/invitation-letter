import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainContent from "@/features/invitation/components/main-content";

const overlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 100,
  overflow: "hidden",
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
            transition={{ duration: 0.45 }}
            style={overlayStyle}
          >
            <motion.img
              src="/top.svg"
              alt="top"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -340, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(100vw, 720px)",
                maxWidth: "100vw",
                pointerEvents: "none",
                zIndex: 3,
              }}
            />

            <motion.img
              src="/left.svg"
              alt="left"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -380, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.05 }}
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "min(40vw, 260px)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            <motion.img
              src="/right.svg"
              alt="right"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 380, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: "min(40vw, 260px)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            <motion.img
              src="/button.svg"
              alt="bottom"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 340, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.07 }}
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(90vw, 520px)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />

            <motion.button
              type="button"
              onClick={() => setOpened(true)}
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
        transition={{ duration: 0.6 }}
      >
        <MainContent />
      </motion.div>
    </>
  );
}
