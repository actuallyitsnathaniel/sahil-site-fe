import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Chevron = ({ direction, className }: { direction: "up" | "down"; className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={direction === "down" ? "M6 9l6 6 6-6" : "M6 15l6-6 6 6"} />
  </svg>
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
      {canScrollUp && (
        <Chevron direction="up" className="w-4 h-4 animate-scroll-hint-up" />
      )}
      <span className="text-xs tracking-widest uppercase [writing-mode:vertical-lr]">
        Scroll
      </span>
      {canScrollDown && (
        <Chevron direction="down" className="w-4 h-4 animate-scroll-hint" />
      )}
    </motion.div>
  );
};
