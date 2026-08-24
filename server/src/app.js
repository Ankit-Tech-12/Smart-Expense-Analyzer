import express from "express";
const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

import expenseRouter from "./routes/expense.route.js"
import userRouter from "./routes/user.route.js"

app.use("/api/v1/expense",expenseRouter);
app.use("/api/v1/user",userRouter);

export default app;