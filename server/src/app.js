import express from "express";
const app= express();

app.use(express.json());

import expenseRouter from "./routes/expense.route.js"

app.use("/api/v1/expense",expenseRouter);

export default app;