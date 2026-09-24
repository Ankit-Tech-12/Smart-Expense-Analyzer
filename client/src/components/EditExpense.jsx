import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateExpense } from "../api/expense.api";
import {
  updateExpense as updateExpenseRedux,
} from "../features/expenses/expensesSlice";

import TransactionForm from "./TransactionForm";
import Toast from "./Toast";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const expense = useSelector((state) =>
    state.expenses.expenses.find(
      (expense) => expense._id === id
    )
  );

  const [showToast, setShowToast] = useState(false);

  if (!expense) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/10 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>

          <h2 className="text-lg font-semibold text-gray-200">
            Transaction not found
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            This transaction may have been deleted or no
            longer exists.
          </p>

          <button
            onClick={() => navigate("/expenses")}
            className="mt-5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-medium text-white transition"
          >
            Back to Transactions
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (transactionData) => {
    try {
      const updateData = {};

      // Amount
      if (transactionData.amount !== expense.amount) {
        updateData.amount = transactionData.amount;
      }

      // Type + Category
      if (transactionData.type !== expense.type) {
        updateData.type = transactionData.type;

        // Type changed, so category must also be sent
        updateData.category =
          transactionData.category;
      } else if (
        transactionData.category !== expense.category
      ) {
        updateData.category =
          transactionData.category;
      }

      // Source
      if (
        transactionData.source !==
        (expense.source || "")
      ) {
        updateData.source = transactionData.source;
      }

      // Date
      if (transactionData.date !== expense.date) {
        updateData.date = transactionData.date;
      }

      // Note
      if (
        transactionData.note !==
        (expense.note || "")
      ) {
        updateData.note = transactionData.note;
      }

      // Nothing changed
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
    <>
      <TransactionForm
        mode="edit"
        initialData={expense}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/expenses")}
      />

      <Toast
        show={showToast}
        message="Transaction updated successfully 🎉"
      />
    </>
  );
};

export default EditExpense;