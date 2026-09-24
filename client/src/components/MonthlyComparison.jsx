import { useEffect, useState } from "react";
import { getMonthlyAnalytics } from "../api/finance.api";
import Card from "./Card";

const MonthlyComparison = ({ type = "expense" }) => {
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

  const currentMonth = monthlyData[currentMonthKey] || {
    income: 0,
    expense: 0,
    balance: 0,
  };

  const previousMonth = monthlyData[previousMonthKey] || {
    income: 0,
    expense: 0,
    balance: 0,
  };

  const currentMonthTotal = currentMonth[type];
  const lastMonthTotal = previousMonth[type];

  const difference =
    currentMonthTotal - lastMonthTotal;

  if (
    currentMonthTotal === 0 &&
    lastMonthTotal === 0
  ) {
    return null;
  }

  const isIncome = type === "income";
  const isIncrease = difference > 0;
  const isDecrease = difference < 0;

  // For expenses:
  // increase = red, decrease = green
  //
  // For income:
  // increase = green, decrease = red
  const statusClass = isIncome
    ? isIncrease
      ? "bg-emerald-500/10 text-emerald-400"
      : isDecrease
      ? "bg-red-500/10 text-red-400"
      : "bg-white/5 text-gray-400"
    : isIncrease
    ? "bg-red-500/10 text-red-400"
    : isDecrease
    ? "bg-emerald-500/10 text-emerald-400"
    : "bg-white/5 text-gray-400";

  const title = isIncome
    ? "Monthly Income"
    : "Monthly Spending";

  const changeText =
    difference === 0
      ? "No change from last month"
      : isIncome
      ? isIncrease
        ? `Income up ₹${difference.toLocaleString(
            "en-IN"
          )} from last month`
        : `Income down ₹${Math.abs(
            difference
          ).toLocaleString("en-IN")} from last month`
      : isIncrease
      ? `Spending up ₹${difference.toLocaleString(
          "en-IN"
        )} from last month`
      : `Spending down ₹${Math.abs(
          difference
        ).toLocaleString("en-IN")} from last month`;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-200">
          {title}
        </h2>

        <span
          className={`text-xs px-2.5 py-1 rounded-full ${
            isIncome
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {isIncome ? "Income" : "Expense"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* This Month */}
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">
            This Month
          </p>

          <p className="text-lg font-bold text-white">
            ₹
            {currentMonthTotal.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        {/* Last Month */}
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">
            Last Month
          </p>

          <p className="text-lg font-bold text-white">
            ₹
            {lastMonthTotal.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>
      </div>

      <div
        className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg ${statusClass}`}
      >
        <span>
          {isIncrease
            ? "↑"
            : isDecrease
            ? "↓"
            : "→"}
        </span>

        <span>{changeText}</span>
      </div>
    </Card>
  );
};

export default MonthlyComparison;