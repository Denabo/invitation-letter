import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const REVEAL_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

const HIDDEN = { opacity: 0, y: 24 };
const VISIBLE = { opacity: 1, y: 0 };

// Reveal as soon as the element's top crosses this fraction of the viewport
// height. A value below 1 means it starts animating slightly before the element
// is fully on screen.
const TRIGGER_RATIO = 0.92;

/**
 * Returns `true` once the referenced element has scrolled into view, and stays
 * `true` afterwards.
 *
 * Why a manual getBoundingClientRect check instead of framer-motion's
 * `whileInView` or an IntersectionObserver?
 *
 *  - `whileInView` and observers are torn down/re-created by React StrictMode's
 *    double mount in dev, so they frequently never fire on real user scroll
 *    (they only re-evaluate on an HMR re-render — which is exactly the bug we
 *    kept hitting).
 *  - Observer `threshold`/`rootMargin` tuning is brittle: bottom-of-page
 *    elements that sit under the fixed bottom bar never reach the required
 *    visibility ratio, so the timer/footer never animated.
 *
 * A rect check on scroll/resize is simple, deterministic, and fires for every
 * element the same way — including the very first paint and the elements at the
 * bottom of the page.
 */
export function useReveal(ref) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return undefined;

    let frameId = 0;

    const check = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const triggerLine = viewportHeight * TRIGGER_RATIO;

      // Visible if any part of the element is within (or above) the trigger line
      // and it has not fully scrolled past the top.
      if (rect.top <= triggerLine && rect.bottom >= 0) {
        setRevealed(true);
      }
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(check);
    };

    // Initial check after layout settles (covers elements already in view on
    // mount, e.g. right after the envelope opens).
    frameId = requestAnimationFrame(check);

    // `capture: true` lets us catch scroll from any scrolling ancestor too,
    // since scroll events don't bubble.
    window.addEventListener("scroll", onScrollOrResize, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScrollOrResize, { capture: true });
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [ref, revealed]);

  return revealed;
}

/**
 * Reveals its children with a consistent fade + rise the moment they scroll into
 * the viewport. Every section on the page uses this so the motion is identical.
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  className,
  style,
  ready = true,
}) {
  const ref = useRef(null);
  const revealed = useReveal(ref);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={HIDDEN}
      animate={revealed && ready ? VISIBLE : HIDDEN}
      transition={{ ...REVEAL_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
}
