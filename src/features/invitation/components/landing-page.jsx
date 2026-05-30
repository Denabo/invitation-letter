import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainContent from "@/features/invitation/components/main-content";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100dvh",
  overflow: "hidden",
  zIndex: 100,
  pointerEvents: "none",
};

const landingRootStyle = {
  position: "relative",
  height: "100%",
  overflow: "visible",
  "--bg": "#faf9f6",
  "--antique-dark": "#5d4037",
};

const innerStyle = {
  position: "relative",
  width: "100%",
  maxWidth: 390,
  height: "100dvh",
  margin: "0 auto",
  overflow: "hidden",
  isolation: "isolate",
  contain: "paint",
  background: "transparent",
  boxShadow: "0 0 80px rgba(0,0,0,0.1)",
  pointerEvents: "none",
};

const bottomOrnamentContourShadow = [
  "drop-shadow(0 10px 12px rgba(38, 26, 18, 0.34))",
  "drop-shadow(0 18px 22px rgba(38, 26, 18, 0.24))",
  "drop-shadow(0 20px 34px rgba(38, 26, 18, 0.16))",
].join(" ");

const topOrnamentContourShadow = [
  "drop-shadow(0 18px 20px rgba(38, 26, 18, 0.4))",
  "drop-shadow(0 32px 40px rgba(38, 26, 18, 0.28))",
  "drop-shadow(0 38px 60px rgba(38, 26, 18, 0.18))",
].join(" ");

const bottomOrnamentStyle = {
  position: "absolute",
  left: "50%",
  top: "35.5%",
  width: "125%",
  height: "auto",
  maxWidth: "none",
  zIndex: 2,
  filter: bottomOrnamentContourShadow,
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

const topOrnamentImageStyle = {
  display: "block",
  width: "100%",
  height: "auto",
  maxWidth: "none",
  pointerEvents: "none",
  filter: topOrnamentContourShadow,
};

const sealButtonStyle = {
  position: "absolute",
  left: "50%",
  top: "87%",
  width: "24%",
  height: "19%",
  transform: "translate(-50%, -50%)",
  appearance: "none",
  border: 0,
  borderRadius: "999px",
  padding: 0,
  background: "transparent",
  color: "transparent",
  cursor: "pointer",
  zIndex: 1,
  pointerEvents: "auto",
  WebkitTapHighlightColor: "transparent",
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
    <div style={landingRootStyle}>
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
            <div className="animation-scene" style={innerStyle}>
              <motion.img
                src="/button.webp"
                alt="bottom ornament"
                initial={{ x: "-50%", y: 0, scale: 1 }}
                animate={{ x: "-50%", y: 0, scale: 1 }}
                exit={{ x: "-50%", y: "150%", scale: 1.02 }}
                transition={ornamentExitTransition}
                style={bottomOrnamentStyle}
              />

              <motion.div
                initial={{ x: "-50%", y: "-100%", scale: 1 }}
                animate={{ x: "-50%", y: "-100%", scale: 1 }}
                exit={{ x: "-50%", y: "-250%", scale: 1.02 }}
                transition={ornamentExitTransition}
                style={topOrnamentStyle}
              >
                <img
                  src="/top.webp"
                  alt="top ornament"
                  draggable="false"
                  style={topOrnamentImageStyle}
                />
                <button
                  type="button"
                  aria-label="Открыть приглашение"
                  onClick={handleOpen}
                  style={sealButtonStyle}
                />
              </motion.div>

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            key="main-content"
            className="content-scroll"
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
