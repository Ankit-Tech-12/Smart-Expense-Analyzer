import { useEffect, useState } from "react";

const inputClass =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/50 transition";

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

const TransactionForm = ({
  mode = "add",
  initialData = null,
  onSubmit,
  onCancel,
}) => {
  const isEdit = mode === "edit";

  const [type, setType] = useState(
    initialData?.type || "expense"
  );

  const [amount, setAmount] = useState(
    initialData?.amount || ""
  );

  const [category, setCategory] = useState(
    initialData?.category || ""
  );

  const [source, setSource] = useState(
    initialData?.source || ""
  );

  const [date, setDate] = useState(
    initialData?.date || ""
  );

  const [note, setNote] = useState(
    initialData?.note || ""
  );

  const categories =
    type === "income"
      ? incomeCategories
      : expenseCategories;

  /*
   * When editing an existing transaction,
   * update the form if initialData changes.
   */
  useEffect(() => {
    if (!initialData) return;

    setType(initialData.type || "expense");
    setAmount(initialData.amount || "");
    setCategory(initialData.category || "");
    setSource(initialData.source || "");
    setDate(initialData.date || "");
    setNote(initialData.note || "");
  }, [initialData]);

  const handleTypeChange = (newType) => {
    setType(newType);

    // Income and expense have different categories
    setCategory("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      amount: Number(amount),
      type,
      category: category.toLowerCase(),
      source,
      date,
      note,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-1 sm:px-0 py-4 sm:py-6">
      {/* Page Header */}
      <div className="mb-5 sm:mb-6">
        {onCancel && isEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-gray-300 transition mb-3"
          >
            ← Back to Transactions
          </button>
        )}

        <h1 className="text-xl sm:text-2xl font-semibold text-white">
          {isEdit ? "Edit Transaction" : "Add Transaction"}
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {isEdit
            ? "Update the details of your transaction."
            : "Record your income or expense."}
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-[#131c2e] border border-white/5 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">
        {/* Card Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-white/5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-gray-200">
                Transaction details
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {isEdit
                  ? "Make your changes below"
                  : "Enter the details below"}
              </p>
            </div>

            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                type === "income"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {type === "income" ? "Income" : "Expense"}
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-5"
        >
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Transaction Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  handleTypeChange("expense")
                }
                className={`py-3 rounded-xl border font-medium transition ${
                  type === "expense"
                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                    : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <span className="mr-1.5">↘</span>
                Expense
              </button>

              <button
                type="button"
                onClick={() =>
                  handleTypeChange("income")
                }
                className={`py-3 rounded-xl border font-medium transition ${
                  type === "income"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <span className="mr-1.5">↗</span>
                Income
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Amount
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                ₹
              </span>

              <input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                className={`${inputClass} pl-9 text-lg font-medium`}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className={`${inputClass} appearance-none cursor-pointer`}
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
          </div>

          {/* Source */}
          <div>
            <label
              htmlFor="source"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              {type === "income"
                ? "Income Source"
                : "Source"}
            </label>

            <input
              id="source"
              type="text"
              placeholder={
                type === "income"
                  ? "e.g. Company, Client A"
                  : "e.g. Restaurant, Amazon"
              }
              value={source}
              onChange={(e) =>
                setSource(e.target.value)
              }
              className={inputClass}
            />

            <p className="text-xs text-gray-600 mt-1.5">
              Optional
            </p>
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Date
            </label>

            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className={inputClass}
              required
            />
          </div>

          {/* Note */}
          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Note
            </label>

            <textarea
              id="note"
              rows="3"
              placeholder="Add a note about this transaction..."
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              className={`${inputClass} resize-none`}
            />

            <p className="text-xs text-gray-600 mt-1.5">
              Optional
            </p>
          </div>

          {/* Buttons */}
          <div
            className={
              isEdit
                ? "pt-2 flex flex-col-reverse sm:flex-row gap-3"
                : "pt-2"
            }
          >
            {isEdit && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-1/3 border border-white/10 text-gray-300 py-3 rounded-xl font-medium hover:bg-white/5 hover:text-white transition"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className={`${
                isEdit ? "w-full sm:flex-1" : "w-full"
              } bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition-all duration-150 shadow-lg shadow-blue-600/20 active:scale-[0.98]`}
            >
              {isEdit
                ? "Update Transaction"
                : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;