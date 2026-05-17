import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { useInvitation } from "@/features/invitation";
import { getGuestName } from "@/lib/invitation-storage";
import { api } from "@/lib/api";

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
    <section id="wishes" style={{ marginBottom: 44 }}>
      <RevealOnScroll>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "Pinyon Script, cursive",
            fontSize: 72,
            color: "var(--antique-dark)",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          анкета
        </motion.h3>
        <p
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: "var(--muted)",
            textAlign: "center",
            lineHeight: 1.8,
            marginBottom: 20,
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
          padding: "12px 36px",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--antique-dark)",
          background: "transparent",
          display: "block",
          margin: "0 auto",
          cursor: "pointer",
        }}
      >
        Анкета гостя
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, overflow: "hidden" }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <form onSubmit={submit} style={{ marginTop: 20 }}>
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 6,
                    display: "block",
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
                    padding: "10px 0",
                    fontSize: 14,
                    color: "var(--text)",
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 6,
                    display: "block",
                  }}
                >
                  Вы придёте?
                </label>
                <div>
                  <label>
                    <input
                      type="radio"
                      checked={attendance === "ATTENDING"}
                      onChange={() => setAttendance("ATTENDING")}
                    />{" "}
                    С радостью буду
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      checked={attendance === "NOT_ATTENDING"}
                      onChange={() => setAttendance("NOT_ATTENDING")}
                    />{" "}
                    К сожалению нет
                  </label>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 6,
                    display: "block",
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
                    padding: "10px 0",
                    fontSize: 14,
                    color: "var(--text)",
                    outline: "none",
                  }}
                >
                  <option>Только я</option>
                  <option>Я + 1</option>
                  <option>Я + 2</option>
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 6,
                    display: "block",
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
                    padding: "10px 0",
                    fontSize: 14,
                    color: "var(--text)",
                    outline: "none",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  border: "1px solid var(--antique-dark)",
                  color: "var(--antique-dark)",
                  padding: "14px",
                  width: "100%",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  background: "transparent",
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
