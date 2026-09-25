import { useState } from "react";
import { useDispatch } from "react-redux";

import { addTransaction } from "../features/transactions/transactionsSlice";
import { createTransaction } from "../api/transaction.api";
import TransactionForm from "./TransactionForm";
import Toast from "./Toast";

const AddTransaction = () => {
  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (transactionData) => {
    try {
      const response = await createTransaction(transactionData);

      dispatch(addTransaction(response.data));

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

export default AddTransaction;