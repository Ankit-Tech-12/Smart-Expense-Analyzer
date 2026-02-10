import {configureStore} from "@reduxjs/toolkit"
import expensesReducer from "./features/expenses/expensesSlice"
import categoriesReducer from "./features/category/categoriesSlice"
import { loadState, saveState } from "./utils/localStorage";

const preloadedState = loadState();

export const store=configureStore({
    reducer:{
        expenses:expensesReducer,
        categories: categoriesReducer, 
    },
     preloadedState,
})

// subscribe to store changes
store.subscribe(() => {
  saveState({
    expenses: store.getState().expenses,
    categories: store.getState().categories,
  });
});

