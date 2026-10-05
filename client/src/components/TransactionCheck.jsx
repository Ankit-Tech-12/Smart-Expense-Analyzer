import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getTransactions,
} from "../api/transaction.api";

import {
       getMonthlyAnalytics,
       getFinancialAnalytics,
} from "../api/finance.api"

import {
    setTransaction,
    setMonthlyAnalytics,
    setCategoryAnalytics,
} from "../features/transactions/transactionsSlice";

const TransactionCheck = () => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );

    useEffect(() => {
        if (!isAuthenticated) return;

        const loadTransactionData = async () => {
            try {
                const [
                    transactionsResponse,
                    monthlyResponse,
                    categoryResponse,
                ] = await Promise.all([
                    getTransactions(),
                    getMonthlyAnalytics(),
                    getFinancialAnalytics(),
                ]);

                // Store transactions in Redux
                dispatch(
                    setTransaction(transactionsResponse.data)
                );

                // Store monthly analytics in Redux
                dispatch(
                    setMonthlyAnalytics(monthlyResponse.data)
                );

                // Store category analytics in Redux
                dispatch(
                    setCategoryAnalytics(categoryResponse.data)
                );

            } catch (error) {
                console.log(error);
            }
        };

        loadTransactionData();
    }, [isAuthenticated, dispatch]);

    return null;
};

export default TransactionCheck;