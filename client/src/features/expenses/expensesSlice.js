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
    },
});

export const {
    addExpense,
    setExpenses,
    removeExpense,
} = expensesSlice.actions;

export default expensesSlice.reducer;