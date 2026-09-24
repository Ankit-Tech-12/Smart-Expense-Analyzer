import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateExpense } from "../api/expense.api";
import { updateExpense as updateExpenseRedux } from "../features/expenses/expensesSlice";
import Toast from "./Toast";

const inputClass =
  "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

const expenseCategories = [
  "food",
  "transport",
  "rent",
  "shopping",
  "health",
  "entertainment",
  "other",
];

const incomeCategories = [
  "salary",
  "freelance",
  "business",
  "investment",
  "other",
];

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const expense = useSelector((state) =>
    state.expenses.expenses.find(
      (expense) => expense._id === id
    )
  );

  const [type, setType] = useState(
    expense?.type || "expense"
  );

  const [amount, setAmount] = useState(
    expense?.amount || ""
  );

  const [category, setCategory] = useState(
    expense?.category || ""
  );

  const [source, setSource] = useState(
    expense?.source || ""
  );

  const [date, setDate] = useState(
    expense?.date || ""
  );

  const [note, setNote] = useState(
    expense?.note || ""
  );

  const [showToast, setShowToast] = useState(false);

  const categories =
    type === "income"
      ? incomeCategories
      : expenseCategories;

  if (!expense) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center text-gray-400">
        Transaction not found.
      </div>
    );
  }

  const handleTypeChange = (newType) => {
    setType(newType);

    // Income and expense have different categories
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateData = {};

      // Only send changed fields

      if (Number(amount) !== expense.amount) {
        updateData.amount = Number(amount);
      }

      if (type !== expense.type) {
        updateData.type = type;

        // Type changed, so send category too
        updateData.category = category.toLowerCase();
      } else if (category !== expense.category) {
        updateData.category = category.toLowerCase();
      }

      if (source !== (expense.source || "")) {
        updateData.source = source;
      }

      if (date !== expense.date) {
        updateData.date = date;
      }

      if (note !== (expense.note || "")) {
        updateData.note = note;
      }

      if (Object.keys(updateData).length === 0) {
        navigate("/expenses");
        return;
      }

      const response = await updateExpense(
        id,
        updateData
      );

      dispatch(updateExpenseRedux(response.data));

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/expenses");
      }, 1200);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-[#131c2e] border border-white/5 rounded-2xl shadow-xl shadow-black/30 p-6">

        <h2 className="text-xl font-semibold text-white mb-6">
          Edit Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Transaction Type */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Transaction Type
            </label>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() =>
                  handleTypeChange("expense")
                }
                className={`py-2.5 rounded-xl font-medium transition ${type === "expense"
                    ? "bg-blue-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
              >
                Expense
              </button>

              <button
                type="button"
                onClick={() =>
                  handleTypeChange("income")
                }
                className={`py-2.5 rounded-xl font-medium transition ${type === "income"
                    ? "bg-blue-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
              >
                Income
              </button>

            </div>
          </div>

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className={inputClass}
            required
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className={`${inputClass} appearance-none`}
            required
          >
            <option
              value=""
              className="bg-[#131c2e]"
            >
              Select Category
            </option>

            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
                className="bg-[#131c2e]"
              >
                {cat.charAt(0).toUpperCase() +
                  cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Source */}
          <input
            type="text"
            placeholder={
              type === "income"
                ? "Source (e.g. Company, Client A)"
                : "Source (optional)"
            }
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            className={inputClass}
          />

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className={inputClass}
            required
          />

          {/* Note */}
          <input
            type="text"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
            className={inputClass}
          />

          <div className="flex gap-3">

            <button
              type="button"
              onClick={() =>
                navigate("/expenses")
              }
              className="w-full border border-white/10 text-gray-300 py-2.5 rounded-xl font-semibold hover:bg-white/5 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-semibold transition-all duration-150 shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Update Transaction
            </button>

          </div>

        </form>
      </div>

      <Toast
        show={showToast}
        message="Transaction updated successfully 🎉"
      />
    </div>
  );
};

export default EditExpense;