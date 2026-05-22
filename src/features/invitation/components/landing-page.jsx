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

const layerBaseStyle = {
  position: "absolute",
  pointerEvents: "none",
  objectFit: "contain",
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
              src="/left.svg"
              alt="left ornament"
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -460, opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
              style={{
                ...layerBaseStyle,
                left: 0,
                top: 0,
                width: "45%",
                height: "60%",
                objectPosition: "top left",
                zIndex: 2,
              }}
            />

            <motion.img
              src="/right.svg"
              alt="right ornament"
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 460, opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
              style={{
                ...layerBaseStyle,
                right: 0,
                top: 0,
                width: "45%",
                height: "60%",
                objectPosition: "top right",
                zIndex: 2,
              }}
            />

            <motion.img
              src="/button.svg"
              alt="bottom ornament"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 500, opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
              style={{
                ...layerBaseStyle,
                left: 0,
                bottom: 0,
                width: "100%",
                height: "35%",
                objectPosition: "bottom center",
                zIndex: 3,
              }}
            />

            <motion.img
              src="/top.svg"
              alt="top ornament"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -500, opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              style={{
                ...layerBaseStyle,
                left: 0,
                top: 0,
                width: "100%",
                height: "110%",
                objectPosition: "top center",
                zIndex: 4,
              }}
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
