import { useEffect, useState } from "react";
import { getMonthlyAnalytics } from "../api/finance.api";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";

const SpendingSpikeAlert = () => {
  const [hasSpike, setHasSpike] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadMonthlyData = async () => {
      try {
        const response = await getMonthlyAnalytics();

        const monthlyData = response.data;

        const now = new Date();

        const currentMonthKey = `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, "0")}`;

        const previousDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1
        );

        const previousMonthKey = `${previousDate.getFullYear()}-${String(
          previousDate.getMonth() + 1
        ).padStart(2, "0")}`;

        const currentMonthExpense =
          monthlyData[currentMonthKey]?.expense || 0;

        const previousMonthExpense =
          monthlyData[previousMonthKey]?.expense || 0;

        // No previous spending to compare with
        if (previousMonthExpense === 0) {
          setHasSpike(false);
          return;
        }

        const increase =
          currentMonthExpense - previousMonthExpense;

        const percentageIncrease =
          (increase / previousMonthExpense) * 100;

        // Spending spike = more than 25% increase
        if (percentageIncrease > 25) {
          setHasSpike(true);

          setMessage(
            `Your spending increased by ${Math.round(
              percentageIncrease
            )}% compared to last month.`
          );
        } else {
          setHasSpike(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadMonthlyData();
  }, []);

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