import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateExpense } from "../api/expense.api";
import { updateExpense as updateExpenseRedux } from "../features/expenses/expensesSlice";
import Toast from "./Toast";

const inputClass =
  "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector(
    (state) => state.categories.categories
  );

  const expense = useSelector((state) =>
    state.expenses.expenses.find(
      (expense) => expense._id === id
    )
  );

  const [amount, setAmount] = useState(
    expense?.amount || ""
  );
  const [category, setCategory] = useState(
    expense?.category || ""
  );
  const [date, setDate] = useState(
    expense?.date || ""
  );
  const [note, setNote] = useState(
    expense?.note || ""
  );

  const [showToast, setShowToast] = useState(false);

  if (!expense) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center text-gray-400">
        Expense not found.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateExpense(id, {
        amount: Number(amount),
        category: category.toLowerCase(),
        date,
        note,
      });

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
          Edit Expense
        </h2>

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

          <div className="flex gap-3">

            <button
              type="button"
              onClick={() => navigate("/expenses")}
              className="w-full border border-white/10 text-gray-300 py-2.5 rounded-xl font-semibold hover:bg-white/5 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-semibold transition-all duration-150 shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Update Expense
            </button>

          </div>

        </form>
      </div>

      <Toast
        show={showToast}
        message="Expense updated successfully !!!"
      />
    </div>
  );
};

export default EditExpense;