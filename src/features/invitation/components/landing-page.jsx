import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainContent from "@/features/invitation/components/main-content";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "min(100%, 390px)",
  height: "100vh",
  zIndex: 100,
  overflow: "hidden",
  background: "var(--bg)",
};

const bottomOrnamentStyle = {
  position: "absolute",
  left: "50%",
  width: "125%",
  height: "auto",
  maxWidth: "none",
  transform: "translateX(-50%)",
  bottom: "-4%",
  zIndex: 3,
  filter: "drop-shadow(0px -4px 12px rgba(0,0,0,0.12))",
};

const topOrnamentStyle = {
  position: "absolute",
  left: "50%",
  width: "103%",
  height: "auto",
  maxWidth: "none",
  transform: "translateX(-50%)",
  top: "-4%",
  zIndex: 4,
  filter: "drop-shadow(0px 6px 12px rgba(0,0,0,0.12))",
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
            transition={{ duration: 0.45, delay: 0.7 }}
            style={overlayStyle}
          >
            <motion.img
              src="/button.webp"
              alt="bottom ornament"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              style={bottomOrnamentStyle}
            />

            <motion.img
              src="/top.webp"
              alt="top ornament"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              style={topOrnamentStyle}
            />

            <motion.button
              type="button"
              onClick={() => setOpened(true)}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, duration: 0.35 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              style={{
                position: "absolute",
                left: "50%",
                bottom: "9%",
                transform: "translateX(-50%)",
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

      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <MainContent />
        </motion.div>
      )}
    </>
  );
}
