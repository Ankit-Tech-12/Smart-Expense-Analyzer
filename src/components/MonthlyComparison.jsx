import { useSelector } from "react-redux";
import { selectMonthlyComparison } from "../App/features/expenses/expensesSelector";
import Card from "./Card";

const MonthlyComparison = () => {
  const {
    currentMonthTotal,
    lastMonthTotal,
    difference,
  } = useSelector(selectMonthlyComparison);

  if (currentMonthTotal === 0 && lastMonthTotal === 0) {
    return null;
  }

  const isIncrease = difference > 0;
  const isDecrease = difference < 0;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-2">
        Monthly Comparison
      </h2>

      <p className="text-sm text-gray-600">
        This Month: ₹{currentMonthTotal}
      </p>
      <p className="text-sm text-gray-600">
        Last Month: ₹{lastMonthTotal}
      </p>

      <p
        className={`mt-2 font-semibold ${
          isIncrease
            ? "text-red-600"
            : isDecrease
            ? "text-green-600"
            : "text-gray-600"
        }`}
      >
        {difference === 0
          ? "No change from last month"
          : isIncrease
          ? `Spending increased by ₹${difference}`
          : `Spending decreased by ₹${Math.abs(difference)}`}
      </p>
    </Card>
  );
};

export default MonthlyComparison;
