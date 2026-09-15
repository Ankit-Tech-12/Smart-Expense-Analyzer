import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, show, type = "success" }) => {
  const bgColor =
    type === "error"
      ? "bg-red-600"
      : "bg-emerald-600";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50
            ${bgColor} text-white
            px-5 py-3 rounded-xl shadow-xl
            text-sm font-medium whitespace-nowrap`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;