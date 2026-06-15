import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const REVEAL_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

const HIDDEN = { opacity: 0, y: 24 };
const VISIBLE = { opacity: 1, y: 0 };

/**
 * Reveals its children with a consistent fade + rise the moment they scroll
 * into the viewport.
 *
 * NOTE: We intentionally do NOT use framer-motion's `whileInView`. Under React
 * StrictMode (enabled in dev) components mount, unmount and remount, which tears
 * down framer-motion's internal IntersectionObserver and leaves it unable to
 * fire on real user scroll (it would only re-evaluate on an HMR re-render).
 * Owning the observer inside a `useEffect` makes the cleanup StrictMode-safe so
 * every element reveals reliably while the user scrolls.
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  className,
  style,
}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || revealed) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [revealed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={HIDDEN}
      animate={revealed ? VISIBLE : HIDDEN}
      transition={{ ...REVEAL_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
}
