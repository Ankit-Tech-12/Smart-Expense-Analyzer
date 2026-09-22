import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParse from "cookie-parser"
import cors from "cors";
const app= express();

// console.log("ORIGIN_URI:", process.env.ORIGIN_URI);

app.use(
  cors({
    origin: process.env.ORIGIN_URI,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

import expenseRouter from "./routes/expense.route.js"
import userRouter from "./routes/user.route.js"

app.use("/api/v1/expense",expenseRouter);
app.use("/api/v1/user",userRouter);

export default app;