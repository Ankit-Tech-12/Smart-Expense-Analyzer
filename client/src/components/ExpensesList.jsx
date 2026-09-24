import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { removeExpense } from "../features/expenses/expensesSlice";
import { deleteExpense } from "../api/expense.api";
import Toast from "./Toast";

const categoryColors = {
  food: "bg-orange-500/10 text-orange-400",
  transport: "bg-blue-500/10 text-blue-400",
  rent: "bg-purple-500/10 text-purple-400",
  shopping: "bg-pink-500/10 text-pink-400",
  health: "bg-green-500/10 text-green-400",
  entertainment: "bg-yellow-500/10 text-yellow-400",

  salary: "bg-emerald-500/10 text-emerald-400",
  freelance: "bg-cyan-500/10 text-cyan-400",
  business: "bg-indigo-500/10 text-indigo-400",
  investment: "bg-violet-500/10 text-violet-400",

  other: "bg-gray-500/10 text-gray-400",
};

const ExpenseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const expenses = useSelector(
    (state) => state.expenses.expenses
  );

  const [showToast, setShowToast] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);

      dispatch(removeExpense(id));

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/expenses/edit/${id}`);
  };

  return (
    <>
      {expenses.length === 0 ? (
        <div className="max-w-md mx-auto mt-10 px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
            <span className="text-3xl">🧾</span>
          </div>

          <h2 className="text-lg font-semibold text-gray-200">
            No transactions yet
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Add your first income or expense to start tracking
            your finances.
          </p>

          <button
            onClick={() => navigate("/add")}
            className="mt-5 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium text-white transition"
          >
            + Add Transaction
          </button>
        </div>
      ) : (
        <div className="w-full max-w-5xl mx-auto mt-4 sm:mt-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 px-1">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-100">
                Transactions
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Track your income and expenses
              </p>
            </div>

            <div className="self-start sm:self-auto px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
              <span className="text-xs text-gray-400">
                {expenses.length} transaction
                {expenses.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Transaction container */}
          <div className="bg-[#131c2e] border border-white/5 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">
            <ul className="divide-y divide-white/5">
              {expenses.map((expense) => {
                const colorClass =
                  categoryColors[expense.category] ||
                  categoryColors.other;

                const isIncome = expense.type === "income";

                return (
                  <li
                    key={expense._id}
                    className="group px-4 sm:px-5 py-4 hover:bg-white/[0.025] transition"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Category Icon */}
                      <div
                        className={`hidden xs:flex sm:flex shrink-0 w-10 h-10 rounded-xl items-center justify-center text-sm font-semibold ${
                          isIncome
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {isIncome ? "↗" : "↘"}
                      </div>

                      {/* Transaction Information */}
                      <div className="min-w-0 flex-1">
                        {/* Type + Category */}
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span
                            className={`text-xs font-medium ${
                              isIncome
                                ? "text-emerald-400"
                                : "text-red-400"
                            }`}
                          >
                            {isIncome ? "Income" : "Expense"}
                          </span>

                          <span
                            className={`text-[11px] sm:text-xs font-medium px-2 py-1 rounded-full capitalize ${colorClass}`}
                          >
                            {expense.category}
                          </span>
                        </div>

                        {/* Note */}
                        <p className="text-sm text-gray-200 font-medium truncate">
                          {expense.note || "No note"}
                        </p>

                        {/* Source + Date */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                          {expense.source && (
                            <>
                              <span className="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-xs">
                                {expense.source}
                              </span>

                              <span className="text-gray-700">
                                •
                              </span>
                            </>
                          )}

                          <span className="text-xs text-gray-500">
                            {expense.date}
                          </span>
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="shrink-0 flex flex-col items-end gap-2">
                        {/* Amount */}
                        <span
                          className={`text-sm sm:text-base font-semibold whitespace-nowrap ${
                            isIncome
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {isIncome ? "+" : "-"}₹
                          {expense.amount.toLocaleString("en-IN")}
                        </span>

                        {/* Actions */}
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={() =>
                              handleEdit(expense._id)
                            }
                            className="px-2 py-1 rounded-md text-xs text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(expense._id)
                            }
                            className="px-2 py-1 rounded-md text-xs text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <Toast
        show={showToast}
        message="Transaction deleted successfully 🗑️"
        type="error"
      />
    </>
  );
};

export default ExpenseList;