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

const flapBase = {
  position: "absolute",
  left: 0,
  width: "100%",
  pointerEvents: "none",
  background: "var(--white)",
  borderLeft: "1px solid var(--border)",
  borderRight: "1px solid var(--border)",
};

const paperTexture =
  "radial-gradient(circle at 10% 20%, rgba(0, 0, 0, 0.04) 0, rgba(0, 0, 0, 0.04) 2px, transparent 3px), radial-gradient(circle at 80% 45%, rgba(0, 0, 0, 0.035) 0, rgba(0, 0, 0, 0.035) 2px, transparent 3px), linear-gradient(180deg, #fffdfa 0%, #f7f1ea 100%)";

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
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: -420, opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              style={{
                ...flapBase,
                top: 0,
                height: "54%",
                clipPath: "polygon(0 0, 100% 0, 100% 57%, 50% 83%, 0 57%)",
                backgroundImage: paperTexture,
              }}
            />

            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: 420, opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              style={{
                ...flapBase,
                bottom: 0,
                height: "54%",
                clipPath:
                  "polygon(0 44%, 50% 18%, 100% 44%, 100% 100%, 0 100%)",
                backgroundImage: paperTexture,
              }}
            />

            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: -260, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "48.2%",
                left: 0,
                width: "50%",
                height: "1px",
                background: "rgba(120, 93, 80, 0.35)",
                zIndex: 110,
              }}
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: 260, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "48.2%",
                right: 0,
                width: "50%",
                height: "1px",
                background: "rgba(120, 93, 80, 0.35)",
                zIndex: 110,
              }}
            />

            <motion.button
              onClick={() => setOpened(true)}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "48.2%",
                transform: "translate(-50%, -50%)",
                border: "2px solid #5f7563",
                color: "#415447",
                background:
                  "radial-gradient(circle at 35% 30%, #8ea294 0%, #6d8673 40%, #54705f 100%)",
                borderRadius: "9999px",
                width: 92,
                height: 92,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                zIndex: 120,
                boxShadow: "0 10px 24px rgba(0, 0, 0, 0.22)",
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
