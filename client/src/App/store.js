import {configureStore} from "@reduxjs/toolkit"
import expensesReducer from "../features/expenses/expensesSlice"
import categoriesReducer from "../features/category/categoriesSlice"
import authReducer from "../features/auth/authSlice";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        expenses:expensesReducer,
        categories: categoriesReducer, 
    }
})

// // subscribe to store changes
// store.subscribe(() => {
//   saveState({
//     expenses: store.getState().expenses,
//     categories: store.getState().categories,
//   });
// });

