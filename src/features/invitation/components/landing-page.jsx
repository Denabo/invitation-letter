import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainContent from "@/features/invitation/components/main-content";

const overlayStyle = {
  position: "absolute",
  inset: 0,
  background: "var(--bg)",
  zIndex: 100,
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const pieceBase = {
  position: "absolute",
  maxWidth: "42vw",
  width: "220px",
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
            transition={{ duration: 0.5 }}
            style={overlayStyle}
          >
            <motion.img
              src="/left.svg"
              alt="left"
              initial={{ x: 0, y: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: -420, y: 30, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ ...pieceBase, left: 0, top: "20%" }}
            />
            <motion.img
              src="/right.svg"
              alt="right"
              initial={{ x: 0, y: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: 420, y: 30, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ ...pieceBase, right: 0, top: "20%" }}
            />
            <motion.img
              src="/top.svg"
              alt="top"
              initial={{ x: 0, y: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={{ y: -320, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                maxWidth: "unset",
                pointerEvents: "none",
              }}
            />
            <motion.img
              src="/button.svg"
              alt="button"
              initial={{ x: 0, y: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={{ y: 320, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                maxWidth: "unset",
                pointerEvents: "none",
              }}
            />

            <motion.button
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
