import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
    name: "transactions",

    initialState: {
        transactions: [],

        monthlyAnalytics: {},

        categoryAnalytics: {
            incomeByCategory: {},
            expenseByCategory: {},
        },
    },

    reducers: {
        // Add a new transaction
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
        },

        // Replace all transactions
        setTransaction: (state, action) => {
            state.transactions = action.payload;
        },

        // Remove a transaction
        removeTransaction: (state, action) => {
            state.transactions = state.transactions.filter(
                (transaction) => transaction._id !== action.payload
            );
        },

        // Update an existing transaction
        updateTransaction: (state, action) => {
            const index = state.transactions.findIndex(
                (transaction) =>
                    transaction._id === action.payload._id
            );

            if (index !== -1) {
                state.transactions[index] = action.payload;
            }
        },

        // Store monthly income/expense analytics
        setMonthlyAnalytics: (state, action) => {
            state.monthlyAnalytics = action.payload;
        },

        // Store category-wise income/expense analytics
        setCategoryAnalytics: (state, action) => {
            state.categoryAnalytics = action.payload;
        },
    },
});

export const {
    addTransaction,
    setTransaction,
    removeTransaction,
    updateTransaction,
    setMonthlyAnalytics,
    setCategoryAnalytics,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;