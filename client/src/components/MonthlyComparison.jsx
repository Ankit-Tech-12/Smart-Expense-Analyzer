import { useEffect, useState } from "react";
import { getMonthlyAnalytics } from "../api/finance.api";
import Card from "./Card";

const MonthlyComparison = () => {
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    const loadMonthlyData = async () => {
      try {
        const response = await getMonthlyAnalytics();

        setMonthlyData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadMonthlyData();
  }, []);

  // Get current month and previous month
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

  const currentMonth =
    monthlyData[currentMonthKey] || {
      income: 0,
      expense: 0,
      balance: 0,
    };

  const previousMonth =
    monthlyData[previousMonthKey] || {
      income: 0,
      expense: 0,
      balance: 0,
    };

  const currentMonthTotal = currentMonth.expense;
  const lastMonthTotal = previousMonth.expense;

  const difference =
    currentMonthTotal - lastMonthTotal;

  if (
    currentMonthTotal === 0 &&
    lastMonthTotal === 0
  ) {
    return null;
  }

  const isIncrease = difference > 0;
  const isDecrease = difference < 0;

  return (
    <Card>
      <h2 className="text-base font-semibold text-gray-200 mb-4">
        Monthly Comparison
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">
            This Month
          </p>

          <p className="text-lg font-bold text-white">
            ₹{currentMonthTotal.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">
            Last Month
          </p>

          <p className="text-lg font-bold text-white">
            ₹{lastMonthTotal.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div
        className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg ${
          isIncrease
            ? "bg-red-500/10 text-red-400"
            : isDecrease
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-white/5 text-gray-400"
        }`}
      >
        <span>
          {isIncrease
            ? "↑"
            : isDecrease
            ? "↓"
            : "→"}
        </span>

        <span>
          {difference === 0
            ? "No change from last month"
            : isIncrease
            ? `Spending up ₹${difference.toLocaleString(
                "en-IN"
              )} from last month`
            : `Spending down ₹${Math.abs(
                difference
              ).toLocaleString("en-IN")} from last month`}
        </span>
      </div>
    </Card>
  );
};

export default MonthlyComparison;