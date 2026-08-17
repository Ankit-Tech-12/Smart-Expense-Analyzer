import { useSelector } from "react-redux";
import { selectSpendingSpike } from "../App/features/expenses/expensesSelector";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";

const SpendingSpikeAlert = () => {
  const { hasSpike, message } = useSelector(selectSpendingSpike);

  return (
    <AnimatePresence>
      {hasSpike && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Card className="bg-red-50 border border-red-200">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600">
                  ⚠️
                </span>
              </div>

              {/* Text */}
              <div>
                <p className="text-sm sm:text-base font-semibold text-red-700">
                  Spending Spike Detected
                </p>
                <p className="text-sm text-red-600 mt-1">
                  {message}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpendingSpikeAlert;
