import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Chevron = ({
  direction,
  visible,
  animationClassName,
}: {
  direction: "up" | "down";
  visible: boolean;
  animationClassName: string;
}) => (
  // Visibility (opacity-0/100) and the infinite pulse (animate-scroll-hint*)
  // both drive `opacity` — applying them to the same element lets the pulse's
  // keyframes fight the visibility toggle. Splitting them across a wrapper
  // (visibility) and the inner svg (pulse) keeps each transition independent,
  // so toggling visibility never resets or desyncs the continuous animation.
  <span className={`transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
    <svg
      className={`w-4 h-4 ${animationClassName}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "down" ? "M6 9l6 6 6-6" : "M6 15l6-6 6 6"} />
    </svg>
  </span>
);

export const ScrollHint = () => {
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  // Re-derive on scroll AND resize/content-load: the document's scrollable
  // range shifts as images/fonts/async content settle, so a one-time mount
  // check would quickly go stale (e.g. reporting "at bottom" before the page
  // has reached its final height).
  useEffect(() => {
    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      setCanScrollUp(scrollY > 1);
      setCanScrollDown(scrollY < maxScroll - 1);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <motion.div
      className="hidden md:flex fixed bottom-6 left-6 z-[1] flex-col items-center gap-2 text-white/50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      {/* Both chevrons stay mounted at all times — toggling them in and out
          would restart their CSS animations independently each time, leaving
          them perpetually out of phase with one another. Keeping them mounted
          lets their infinite animations run continuously and in sync; only
          opacity (and the layout space it occupies) changes with scroll state. */}
      <Chevron direction="up" visible={canScrollUp} animationClassName="animate-scroll-hint-up" />
      <span className="text-xs tracking-widest uppercase [writing-mode:vertical-lr]">
        Scroll
      </span>
      <Chevron direction="down" visible={canScrollDown} animationClassName="animate-scroll-hint" />
    </motion.div>
  );
};
