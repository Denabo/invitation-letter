import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainContent from "@/features/invitation/components/main-content";
import { getGuestName } from "@/lib/invitation-storage";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const guestName = getGuestName();

  if (showMain) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <MainContent />
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="envelope"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            width: "85vw",
            maxWidth: 360,
            height: 480,
            background: "#f5f0ea",
            borderRadius: 4,
            boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <p
              style={{
                textAlign: "center",
                marginTop: 44,
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: "0.3em",
                color: "#3d2e2e",
              }}
            >
              ПРИГЛАШЕНИЕ
            </p>
            <p
              style={{
                textAlign: "center",
                marginTop: 12,
                fontSize: 16,
                color: "#3d2e2e",
              }}
            >
              НА{" "}
              <span
                style={{ fontFamily: "Pinyon Script, cursive", fontSize: 26 }}
              >
                свадьбу
              </span>
            </p>
          </div>

          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 84,
              height: 120,
              background: "#ede5d8",
              clipPath: "polygon(0 0, 50% 85%, 100% 0, 100% 100%, 0 100%)",
              transformOrigin: "top",
              transformStyle: "preserve-3d",
              zIndex: 4,
            }}
          />

          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={
              isOpen ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            style={{ position: "absolute", inset: 0, zIndex: 2 }}
          >
            <img
              src="/wedding-photo.jpg"
              alt="wedding"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(30,20,20,0.5) 100%)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 70,
                textAlign: "center",
                color: "#fff",
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  letterSpacing: "0.2em",
                  fontWeight: 400,
                }}
              >
                ДАНИИЛ & ДАША
              </div>
              <div
                style={{
                  fontSize: 14,
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.85)",
                  marginTop: 8,
                }}
              >
                12|09|2026
              </div>
            </motion.div>
            <button
              onClick={() => setShowMain(true)}
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.6)",
                padding: "12px 32px",
                borderRadius: 40,
                background: "transparent",
              }}
            >
              войти
            </button>
          </motion.div>

          <button
            onClick={() => setIsOpen(true)}
            style={{
              position: "absolute",
              left: "50%",
              bottom: 74,
              transform: "translateX(-50%)",
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#6B7556",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 9,
              letterSpacing: "0.1em",
              border: "none",
              zIndex: 5,
              cursor: "pointer",
            }}
          >
            открыть
          </button>

          <div
            style={{
              position: "absolute",
              bottom: 14,
              width: "100%",
              display: "grid",
              justifyItems: "center",
              gap: 6,
              color: "#5a4040",
              fontSize: 13,
              zIndex: 6,
            }}
          >
            <div
              style={{
                width: 200,
                borderBottom: "1px solid #c8b8a8",
                paddingBottom: 4,
              }}
            >
              Для: {guestName || "наших гостей"}
            </div>
            <div
              style={{
                width: 200,
                borderBottom: "1px solid #c8b8a8",
                paddingBottom: 4,
              }}
            >
              От: Даши и Данила
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
