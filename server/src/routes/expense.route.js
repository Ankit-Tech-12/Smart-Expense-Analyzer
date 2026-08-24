import { createExpense } from "../controller/expense.controller.js";

import {Router} from "express"

const router = Router()

router.post("/create", createExpense);

export default router;