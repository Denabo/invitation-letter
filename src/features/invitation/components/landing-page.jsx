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

const ornamentBaseStyle = {
  position: "absolute",
  left: "50%",
  width: "160%",
  height: "auto",
  maxWidth: "none",
  transform: "translateX(-50%)",
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
              style={{
                ...ornamentBaseStyle,
                bottom: "-8%",
                zIndex: 3,
              }}
            />

            <motion.img
              src="/top.webp"
              alt="top ornament"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "-4%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "103%",
                height: "auto",
                maxWidth: "none",
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
                border: "1px solid rgba(117, 88, 57, 0.45)",
                color: "var(--antique-dark)",
                background:
                  "linear-gradient(180deg, rgba(255, 252, 244, 0.96) 0%, rgba(245, 234, 214, 0.96) 100%)",
                boxShadow:
                  "0 10px 25px rgba(117, 88, 57, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.85)",
                borderRadius: 9999,
                padding: "14px 34px",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                backdropFilter: "blur(2px)",
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
