import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../features/expenses/expensesSlice";
import { createExpense } from "../api/expense.api";
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

const AddExpense = () => {
  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const categories =
    type === "income" ? incomeCategories : expenseCategories;

  const handleTypeChange = (newType) => {
    setType(newType);

    // Reset category because income and expense
    // have different category options
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createExpense({
        amount: Number(amount),
        type,
        category: category.toLowerCase(),
        source,
        date,
        note,
      });

      dispatch(addExpense(response.data));

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);

      setAmount("");
      setCategory("");
      setSource("");
      setDate("");
      setNote("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-[#131c2e] border border-white/5 rounded-2xl shadow-xl shadow-black/30 p-6">

        <h2 className="text-xl font-semibold text-white mb-6">
          Add Transaction
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
                onClick={() => handleTypeChange("expense")}
                className={`py-2.5 rounded-xl font-medium transition ${
                  type === "expense"
                    ? "bg-blue-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                Expense
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange("income")}
                className={`py-2.5 rounded-xl font-medium transition ${
                  type === "income"
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
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
            required
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${inputClass} appearance-none`}
            required
          >
            <option value="" className="bg-[#131c2e]">
              Select Category
            </option>

            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
                className="bg-[#131c2e]"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
            onChange={(e) => setSource(e.target.value)}
            className={inputClass}
          />

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
            required
          />

          {/* Note */}
          <input
            type="text"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={inputClass}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-semibold transition-all duration-150 shadow-lg shadow-blue-600/20 active:scale-95"
          >
            Add Transaction
          </button>
        </form>
      </div>

      <Toast
        show={showToast}
        message={
          type === "income"
            ? "Income added successfully 🎉"
            : "Expense added successfully 🎉"
        }
      />
    </div>
  );
};

export default AddExpense;