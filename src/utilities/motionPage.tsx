import { motion } from "framer-motion";

export const itemVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const pageTransition = (OgComponent: JSX.ElementType) => {
  return () => (
    <motion.div
      id="appear"
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: "some" }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <OgComponent />
    </motion.div>
  );
};
export default pageTransition;
