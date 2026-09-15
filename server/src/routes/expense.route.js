import { 
    createExpense, 
    getExpenseList,
    deleteExpense 
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


export default router;