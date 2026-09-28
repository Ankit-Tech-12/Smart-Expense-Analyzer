import { 
    createTransaction, 
    getTransactionList,
    deleteTransaction,
    updateTransaction,
    getFinancialSummary,
    getFinancialAnalytics, 
    getMonthlyAnalytics
} from "../controller/transaction.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

import {Router} from "express"

const router = Router()

router.post("/create" ,verifyJWT ,createTransaction);

router.get("/getTransactionList",verifyJWT ,getTransactionList);

router.delete(
    "/delete/:id",
    verifyJWT,
    deleteTransaction
);

router.put(
    "/update/:id",
    verifyJWT,
    updateTransaction
);

router.get(
    "/summary",
    verifyJWT,
    getFinancialSummary
);

router.get(
    "/analytics",
    verifyJWT,
    getFinancialAnalytics
);

router.get(
    "/monthly",
    verifyJWT,
    getMonthlyAnalytics
);


export default router;