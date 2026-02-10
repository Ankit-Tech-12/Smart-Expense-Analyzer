import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../App/features/expenses/expensesSlice";
import Toast from "./Toast";

const AddExpense = () => {
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const categories = useSelector(
        (state) => state.categories.categories
    );

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const expense = {
            id: Date.now(),
            amount: Number(amount),
            category,
            date,
            note,
        };

        dispatch(addExpense(expense));

        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);

        setAmount("");
        setCategory("");
        setDate("");
        setNote("");
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 text-gray-800 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Add Expense
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Category</option>

                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="text"
                    placeholder="Note (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                    Add Expense
                </button>
            </form>

            <Toast
                show={showToast}
                message="Expense added successfully 🎉"
            />
        </div>
    );
};

export default AddExpense;
