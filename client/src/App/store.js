import {configureStore} from "@reduxjs/toolkit"
import transactionsReducer from "../features/transactions/transactionsSlice"
import categoriesReducer from "../features/category/categoriesSlice"
import authReducer from "../features/auth/authSlice";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        transactions:transactionsReducer,
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

