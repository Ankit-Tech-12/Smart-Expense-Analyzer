import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
    name: "expenses",

    initialState: {
        expenses: [],
    },

    reducers: {
        addExpense: (state, action) => {
            state.expenses.push(action.payload);
        },

        setExpenses: (state, action) => {
            state.expenses = action.payload;
        },

        removeExpense: (state, action) => {
            state.expenses = state.expenses.filter(
                (expense) => expense._id !== action.payload
            );
        },

        updateExpense: (state, action) => {
            const index = state.expenses.findIndex(
                (expense) => expense._id === action.payload._id
            );

            if (index !== -1) {
                state.expenses[index] = action.payload;
            }
        },

    },
});

export const {
    addExpense,
    setExpenses,
    removeExpense,
    updateExpense,
} = expensesSlice.actions;

export default expensesSlice.reducer;