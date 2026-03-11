import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../App/features/expenses/expensesSlice";
import Toast from "./Toast";

const inputClass =
  "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

const AddExpense = () => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const categories = useSelector((state) => state.categories.categories);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addExpense({
        id: Date.now(),
        amount: Number(amount),
        category,
        date,
        note,
      })
    );

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
    setAmount("");
    setCategory("");
    setDate("");
    setNote("");
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-[#131c2e] border border-white/5 rounded-2xl shadow-xl shadow-black/30 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Add Expense</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${inputClass} appearance-none`}
            required
          >
            <option value="" className="bg-[#131c2e]">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#131c2e]">
                {cat}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
            required
          />

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
            Add Expense
          </button>
        </form>
      </div>

      <Toast show={showToast} message="Expense added successfully 🎉" />
    </div>
  );
};

export default AddExpense;
