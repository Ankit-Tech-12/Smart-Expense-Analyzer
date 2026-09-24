import { 
    createExpense, 
    getExpenseList,
    deleteExpense,
    updateExpense,
    getFinancialSummary,
    getFinancialAnalytics, 
    getMonthlyAnalytics
} from "../controller/expense.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

import {Router} from "express"

const router = Router()

router.post("/create" ,verifyJWT ,createExpense);

router.get("/getExpenseList",verifyJWT ,getExpenseList);

router.delete(
    "/delete/:id",
    verifyJWT,
    deleteExpense
);

router.put(
    "/update/:id",
    verifyJWT,
    updateExpense
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