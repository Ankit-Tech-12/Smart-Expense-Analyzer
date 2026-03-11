import { useSelector } from "react-redux";
import { selectTotalExpenses } from "../App/features/expenses/expensesSelector";
import Card from "./Card";

const TotalExpense = () => {
  const total = useSelector(selectTotalExpenses);

  return (
    <Card className="bg-gradient-to-br from-blue-600/20 to-blue-900/10 border-blue-500/20">
      <p className="text-sm text-gray-400 mb-1">Total Expenses</p>
      <p className="text-3xl sm:text-4xl font-bold text-white">
        ₹{total.toLocaleString("en-IN")}
      </p>
      <p className="text-xs text-blue-400 mt-2">All time spending</p>
    </Card>
  );
};

export default TotalExpense;
