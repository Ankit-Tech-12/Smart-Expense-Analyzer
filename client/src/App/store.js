import {configureStore} from "@reduxjs/toolkit"
import transactionsReducer from "../features/transactions/transactionsSlice"
import authReducer from "../features/auth/authSlice";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        transactions:transactionsReducer, 
    }
})

// // subscribe to store changes
// store.subscribe(() => {
//   saveState({
//     expenses: store.getState().expenses,
//     categories: store.getState().categories,
//   });
// });

