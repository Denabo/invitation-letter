import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import Sparkles from "@/components/ui/sparkles";
import { getGuestName } from "@/lib/invitation-storage";
import { api } from "@/lib/api";

const labelStyle = {
  fontSize: 9,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: 8,
  display: "block",
};

const inputStyle = {
  border: "none",
  borderBottom: "1px solid var(--border)",
  background: "transparent",
  width: "100%",
  padding: "10px 0",
  fontSize: 14,
  color: "var(--text)",
  outline: "none",
};

const fieldStyle = { marginBottom: 24 };

const optionRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px 20px",
  marginTop: 4,
};

const optionStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
  color: "var(--text)",
  cursor: "pointer",
};

const radioStyle = { accentColor: "var(--antique)", cursor: "pointer" };

function RadioGroup({ name, value, options, onChange }) {
  return (
    <div style={optionRowStyle}>
      {options.map((opt) => (
        <label key={opt.value} style={optionStyle}>
          <input
            type="radio"
            name={name}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            style={radioStyle}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

const YES_NO = [
  { value: "yes", label: "Да" },
  { value: "no", label: "Нет" },
];

const PRESENCE_OPTIONS = [
  { value: "ATTENDING", label: "Обязательно приду" },
  { value: "NOT_ATTENDING", label: "К сожалению, не смогу прийти" },
  { value: "MAYBE", label: "Отвечу позже" },
];

const PRESENCE_LABEL = {
  ATTENDING: "Обязательно приду",
  NOT_ATTENDING: "Не смогу прийти",
  MAYBE: "Отвечу позже",
};

const emptyChild = () => ({ name: "", age: "" });

function buildMessage({
  withPartner,
  partnerName,
  presence,
  withKids,
  children,
  hasCar,
  hasFreeSeats,
  freeSeats,
}) {
  const parts = [];
  parts.push(`Присутствие: ${PRESENCE_LABEL[presence]}`);

  if (withPartner === "yes") {
    parts.push(`С парой: да${partnerName ? ` (${partnerName})` : ""}`);
  } else {
    parts.push("С парой: нет");
  }

  if (withKids === "yes") {
    const kids = children
      .filter((c) => c.name || c.age)
      .map((c) => `${c.name || "—"} (${c.age || "?"})`)
      .join(", ");
    parts.push(`С детьми: да${kids ? ` — ${kids}` : ""}`);
  } else {
    parts.push("С детьми: нет");
  }

  if (hasCar === "yes") {
    if (hasFreeSeats === "yes") {
      parts.push(`Машина: да, свободных мест: ${freeSeats || "?"}`);
    } else {
      parts.push("Машина: да, свободных мест нет");
    }
  } else {
    parts.push("Машина: нет");
  }

  return parts.join(" | ").slice(0, 500);
}

export default function Wishes() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [name, setName] = useState(getGuestName() || "");
  const [withPartner, setWithPartner] = useState("no");
  const [partnerName, setPartnerName] = useState("");
  const [presence, setPresence] = useState("ATTENDING");
  const [withKids, setWithKids] = useState("no");
  const [children, setChildren] = useState([emptyChild()]);
  const [hasCar, setHasCar] = useState("no");
  const [hasFreeSeats, setHasFreeSeats] = useState("no");
  const [freeSeats, setFreeSeats] = useState("");

  const updateChild = (index, key, value) => {
    setChildren((prev) =>
      prev.map((child, i) =>
        i === index ? { ...child, [key]: value } : child,
      ),
    );
  };

  const addChild = () => setChildren((prev) => [...prev, emptyChild()]);

  const removeChild = (index) =>
    setChildren((prev) => prev.filter((_, i) => i !== index));

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSubmitError("");
    try {
      await api.createRsvp({
        name,
        attendance: presence,
        withPartner,
        partnerName,
        withKids,
        children,
        hasCar,
        hasFreeSeats,
        freeSeats,
        message: buildMessage({
          withPartner,
          partnerName,
          presence,
          withKids,
          children,
          hasCar,
          hasFreeSeats,
          freeSeats,
        }),
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error.message ||
          "Не удалось отправить анкету. Попробуйте ещё раз чуть позже.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="wishes" style={{ marginBottom: 44 }}>
      <RevealOnScroll>
        <Sparkles>
          <h3
            style={{
              fontFamily: "var(--font-script)",
              fontSize: 72,
              color: "var(--heading-script)",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            анкета
          </h3>
        </Sparkles>
        <p
          className="invitation-info-text"
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          Чтобы сделать праздник более комфортным,
          <br />
          пожалуйста, заполните анкету гостя.
        </p>
      </RevealOnScroll>

      {!submitted && (
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            border: "1px solid var(--antique)",
            borderRadius: 40,
            padding: "12px 36px",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--antique)",
            background: "transparent",
            display: "block",
            margin: "0 auto",
            cursor: "pointer",
          }}
        >
          Анкета гостя
        </button>
      )}

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.p
            key="thanks"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="invitation-info-text"
            style={{ textAlign: "center", marginTop: 8 }}
          >
            Спасибо! Ваша анкета отправлена.
          </motion.p>
        ) : (
          open && (
            <motion.div
              key="form"
              initial={{ height: 0, opacity: 0, overflow: "hidden" }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <form
                onSubmit={submit}
                style={{
                  marginTop: 24,
                  maxWidth: 360,
                  marginInline: "auto",
                  paddingInline: 4,
                }}
              >
                {/* 1. Имя и фамилия */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Ваше имя и фамилия</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Имя Фамилия"
                    required
                    style={inputStyle}
                  />
                </div>

                {/* 2. Придёте с парой? */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Вы придёте с парой?</label>
                  <RadioGroup
                    name="withPartner"
                    value={withPartner}
                    options={YES_NO}
                    onChange={setWithPartner}
                  />
                  <AnimatePresence>
                    {withPartner === "yes" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginTop: 12 }}
                      >
                        <input
                          value={partnerName}
                          onChange={(e) => setPartnerName(e.target.value)}
                          type="text"
                          placeholder="Имя и фамилия партнёра"
                          style={inputStyle}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Ваше присутствие */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Ваше присутствие</label>
                  <RadioGroup
                    name="presence"
                    value={presence}
                    options={PRESENCE_OPTIONS}
                    onChange={setPresence}
                  />
                </div>

                {/* 4. С детьми? */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Будете ли вы с детьми?</label>
                  <RadioGroup
                    name="withKids"
                    value={withKids}
                    options={YES_NO}
                    onChange={setWithKids}
                  />
                  <AnimatePresence>
                    {withKids === "yes" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginTop: 16 }}
                      >
                        {children.map((child, index) => (
                          <div key={index} style={{ marginBottom: 16 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 4,
                              }}
                            >
                              <span style={labelStyle}>
                                Ребёнок {index + 1}
                              </span>
                              {children.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeChild(index)}
                                  style={{
                                    border: "none",
                                    background: "transparent",
                                    color: "var(--muted)",
                                    fontSize: 11,
                                    cursor: "pointer",
                                  }}
                                >
                                  удалить
                                </button>
                              )}
                            </div>
                            <input
                              value={child.name}
                              onChange={(e) =>
                                updateChild(index, "name", e.target.value)
                              }
                              type="text"
                              placeholder="Имя"
                              style={{ ...inputStyle, marginBottom: 10 }}
                            />
                            <input
                              value={child.age}
                              onChange={(e) =>
                                updateChild(index, "age", e.target.value)
                              }
                              type="number"
                              min="0"
                              max="18"
                              placeholder="Возраст"
                              style={inputStyle}
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addChild}
                          style={{
                            border: "1px dashed var(--antique)",
                            borderRadius: 40,
                            padding: "8px 20px",
                            fontSize: 11,
                            color: "var(--antique)",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                        >
                          + Добавить ребёнка
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 5. Есть ли машина? */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Есть ли у вас машина?</label>
                  <RadioGroup
                    name="hasCar"
                    value={hasCar}
                    options={YES_NO}
                    onChange={setHasCar}
                  />
                </div>

                {/* 6. Свободные места */}
                <AnimatePresence>
                  {hasCar === "yes" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={fieldStyle}
                    >
                      <label style={labelStyle}>
                        Есть ли в машине свободные места?
                      </label>
                      <RadioGroup
                        name="hasFreeSeats"
                        value={hasFreeSeats}
                        options={YES_NO}
                        onChange={setHasFreeSeats}
                      />
                      <AnimatePresence>
                        {hasFreeSeats === "yes" && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                              overflow: "hidden",
                            }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ marginTop: 12 }}
                          >
                            <input
                              value={freeSeats}
                              onChange={(e) => setFreeSeats(e.target.value)}
                              type="number"
                              min="1"
                              max="8"
                              placeholder="Сколько мест?"
                              style={inputStyle}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                {submitError && (
                  <p
                    role="alert"
                    style={{
                      color: "#b91c1c",
                      fontSize: 13,
                      textAlign: "center",
                      margin: "16px 0 0",
                    }}
                  >
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    border: "1px solid var(--antique)",
                    borderRadius: 40,
                    padding: "12px 36px",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--antique)",
                    background: "transparent",
                    display: "block",
                    margin: "24px auto 0",
                    cursor: sending ? "default" : "pointer",
                    opacity: sending ? 0.7 : 1,
                  }}
                >
                  {sending ? "Отправляем…" : "Отправить анкету"}
                </button>
              </form>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </section>
  );
}
