import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { useInvitation } from "@/features/invitation";
import { getGuestName } from "@/lib/invitation-storage";
import { api } from "@/lib/api";

const scriptTitleStyle = {
  fontFamily: "Great Vibes, cursive",
  fontSize: 64,
  fontWeight: 400,
  color: "var(--antique-dark)",
  textAlign: "center",
};

export default function Wishes() {
  const { uid } = useInvitation();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(getGuestName() || "");
  const [attendance, setAttendance] = useState("ATTENDING");
  const [guestCount, setGuestCount] = useState("Только я");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await api.createWish(uid, {
      name,
      attendance,
      message: `${message} | ${guestCount}`,
    });
    setMessage("");
  };

  return (
    <section id="wishes" style={{ marginBottom: 36 }}>
      <RevealOnScroll>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={scriptTitleStyle}
        >
          анкета
        </motion.h3>
        <p
          style={{
            fontSize: 13,
            color: "var(--text)",
            lineHeight: 2,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Чтобы сделать праздник более комфортным,
          <br />
          пожалуйста, заполните анкету гостя.
        </p>
      </RevealOnScroll>

      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          border: "1px solid var(--antique-dark)",
          borderRadius: 40,
          padding: "16px 32px",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--antique-dark)",
          background: "transparent",
          cursor: "pointer",
          display: "block",
          margin: "20px auto 16px",
        }}
      >
        Анкета гостя
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <form onSubmit={submit}>
              <RevealOnScroll>
                <label
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text)",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Ваше имя
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Имя Фамилия"
                  style={{
                    border: "none",
                    borderBottom: "1px solid var(--border)",
                    background: "transparent",
                    width: "100%",
                    padding: "12px 0",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 300,
                    fontSize: 14,
                    color: "var(--text)",
                    outline: "none",
                    marginBottom: 20,
                  }}
                />
              </RevealOnScroll>
              <RevealOnScroll delay={0.15}>
                <label
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text)",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Вы придёте?
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 20,
                  }}
                >
                  <label>
                    <input
                      type="radio"
                      name="att"
                      checked={attendance === "ATTENDING"}
                      onChange={() => setAttendance("ATTENDING")}
                    />{" "}
                    С радостью буду
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="att"
                      checked={attendance === "NOT_ATTENDING"}
                      onChange={() => setAttendance("NOT_ATTENDING")}
                    />{" "}
                    К сожалению нет
                  </label>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.3}>
                <label
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text)",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Количество гостей
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  style={{
                    border: "none",
                    borderBottom: "1px solid var(--border)",
                    background: "transparent",
                    width: "100%",
                    padding: "12px 0",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 300,
                    fontSize: 14,
                    color: "var(--text)",
                    outline: "none",
                    marginBottom: 20,
                  }}
                >
                  <option>Только я</option>
                  <option>Я + 1</option>
                  <option>Я + 2</option>
                </select>
              </RevealOnScroll>
              <RevealOnScroll delay={0.45}>
                <label
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text)",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Пожелания / аллергии
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Ваши пожелания..."
                  style={{
                    border: "none",
                    borderBottom: "1px solid var(--border)",
                    background: "transparent",
                    width: "100%",
                    padding: "12px 0",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 300,
                    fontSize: 14,
                    color: "var(--text)",
                    outline: "none",
                    marginBottom: 20,
                  }}
                />
              </RevealOnScroll>
              <button
                type="submit"
                style={{
                  border: "1px solid var(--antique-dark)",
                  color: "var(--antique-dark)",
                  padding: "16px 32px",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: "transparent",
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                Отправить анкету
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
