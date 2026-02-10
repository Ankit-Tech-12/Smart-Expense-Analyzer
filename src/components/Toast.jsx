import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="
            fixed bottom-4 left-1/2 -translate-x-1/2
            bg-green-600 text-white
            px-4 py-3 rounded-xl shadow-lg
            text-sm sm:text-base
            z-50
          "
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
