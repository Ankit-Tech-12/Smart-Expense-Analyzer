import { useDispatch, useSelector } from "react-redux";
import { removeExpense } from "../App/features/expenses/expensesSlice";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  if (expenses.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No expenses added yet.
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-6 bg-white rounded-xl shadow-md">
      <h2 className="text-lg text-gray-800 font-semibold px-4 py-3 border-b">
        Expense List
      </h2>

      <ul className="divide-y capitalize">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex justify-between items-center px-4 py-3"
          >
            <div>
              <p className="font-medium text-gray-800">
                {expense.category}
              </p>
              <p className="text-sm text-gray-500">
                {expense.note || "No note"}
              </p>
              <p className="text-xs text-gray-400">
                {expense.date}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-semibold text-blue-600">
                ₹{expense.amount}
              </span>

              <button
                onClick={() => dispatch(removeExpense(expense.id))}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
