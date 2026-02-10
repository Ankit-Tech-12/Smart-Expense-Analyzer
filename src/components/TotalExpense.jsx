import { useSelector } from "react-redux";
import { selectTotalExpenses } from "../App/features/expenses/expensesSelector";
import Card from "./Card";

const TotalExpense = () => {
  const total = useSelector(selectTotalExpenses);

  return (
     <Card className="bg-blue-50 dark:bg-blue-900">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Total Expenses
      </p>
      <p className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-300">
        ₹{total}
      </p>
    </Card>
  );
};

export default TotalExpense;
