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
        <div className="max-w-lg mx-auto mt-10 text-center text-gray-500">
          <p className="text-4xl mb-3">🧾</p>

          <p className="text-sm">
            No transactions yet. Add one to get started!
          </p>
        </div>
      ) : (
        <div className="max-w-lg mx-auto mt-6">
          <div className="bg-[#131c2e] border border-white/5 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">

            <h2 className="text-base font-semibold text-gray-200 px-5 py-4 border-b border-white/5">
              Transaction List

              <span className="ml-2 text-xs text-gray-500 font-normal">
                {expenses.length} item
                {expenses.length !== 1 ? "s" : ""}
              </span>
            </h2>

            <ul className="divide-y divide-white/5">

              {expenses.map((expense) => {
                const colorClass =
                  categoryColors[expense.category] ||
                  categoryColors.other;

                const isIncome = expense.type === "income";

                return (
                  <li
                    key={expense._id}
                    className="flex justify-between items-center px-5 py-3.5 hover:bg-white/[0.02] transition"
                  >

                    {/* Left side */}
                    <div className="flex items-center gap-3">

                      <div>
                        {/* Type */}
                        <p
                          className={`text-xs font-medium mb-1 ${
                            isIncome
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {isIncome ? "Income" : "Expense"}
                        </p>

                        {/* Category */}
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${colorClass}`}
                        >
                          {expense.category}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm text-gray-300">
                          {expense.note || "No note"}
                        </p>

                        {expense.source && (
                          <p className="text-xs text-gray-500">
                            {expense.source}
                          </p>
                        )}

                        <p className="text-xs text-gray-500 mt-0.5">
                          {expense.date}
                        </p>
                      </div>

                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">

                      <span
                        className={`font-semibold text-sm ${
                          isIncome
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {isIncome ? "+" : "-"}₹
                        {expense.amount.toLocaleString("en-IN")}
                      </span>

                      {/* Edit */}
                      <button
                        onClick={() => handleEdit(expense._id)}
                        className="text-xs text-gray-500 hover:text-blue-400 transition font-medium"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDelete(expense._id)
                        }
                        className="text-xs text-gray-500 hover:text-red-400 transition font-medium"
                      >
                        Delete
                      </button>

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