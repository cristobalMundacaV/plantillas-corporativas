import { motion } from 'framer-motion';

function RevealOnScroll({ children, className = '', delay = 0, amount = 0.25 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

export default RevealOnScroll;