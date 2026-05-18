import { motion } from "framer-motion";
import MainContent from "@/features/invitation/components/main-content";

const overlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 100,
  overflow: "hidden",
  pointerEvents: "none",
};

export default function LandingPage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={overlayStyle}
      >
        <motion.img
          src="/top.svg"
          alt="top"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(100vw, 720px)",
            maxWidth: "100vw",
            zIndex: 3,
          }}
        />

        <motion.img
          src="/left.svg"
          alt="left"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "min(40vw, 260px)",
            zIndex: 1,
          }}
        />

        <motion.img
          src="/right.svg"
          alt="right"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "min(40vw, 260px)",
            zIndex: 1,
          }}
        />

        <motion.img
          src="/button.svg"
          alt="bottom"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(90vw, 520px)",
            zIndex: 2,
          }}
        />
      </motion.div>

      <MainContent />
    </>
  );
}
