import { useState } from "react";
import { useDispatch } from "react-redux";

import { addExpense } from "../features/expenses/expensesSlice";
import { createExpense } from "../api/expense.api";
import TransactionForm from "./TransactionForm";
import Toast from "./Toast";

const AddExpense = () => {
  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (transactionData) => {
    try {
      const response = await createExpense(transactionData);

      dispatch(addExpense(response.data));

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TransactionForm
        mode="add"
        onSubmit={handleSubmit}
      />

      <Toast
        show={showToast}
        message="Transaction added successfully 🎉"
      />
    </>
  );
};

export default AddExpense;