import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTransactions } from "../api/transaction.api";
import { setTransaction } from "../features/transactions/transactionsSlice";

const TransactionCheck = () => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );

    useEffect(() => {
        if (!isAuthenticated) return;

        const loadTransactions = async () => {
            try {
                const response = await getTransactions();

                dispatch(setTransaction(response.data));
            } catch (error) {
                console.log(error);
            }
        };

        loadTransactions();
    }, [isAuthenticated, dispatch]);

    return null;
};

export default TransactionCheck;