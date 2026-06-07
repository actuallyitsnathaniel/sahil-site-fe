import { motion } from "framer-motion";

export const ScrollHint = () => {
  return (
    <motion.div
      className="hidden md:flex fixed bottom-6 left-6 z-[1] flex-col items-center gap-2 text-white/50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <span className="text-xs tracking-widest uppercase [writing-mode:vertical-lr]">
        Scroll
      </span>
      <svg
        className="w-4 h-4 animate-scroll-hint"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </motion.div>
  );
};
