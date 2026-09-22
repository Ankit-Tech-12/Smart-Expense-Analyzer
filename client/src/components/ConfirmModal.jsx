import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({ show, onCancel, onConfirm }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-sm bg-[#131c2e] border border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <h2 className="text-lg font-semibold text-white">
              Logout?
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Are you sure you want to logout from your account?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg text-sm text-gray-300
                hover:bg-white/5 transition"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg text-sm font-medium
                bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;