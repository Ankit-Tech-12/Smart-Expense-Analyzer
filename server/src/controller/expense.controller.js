import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Expense } from "../models/expense.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"

//creating expense in list
const createExpense = asyncHandler(async (req, res) => {
    const {
        amount,
        type = "expense",
        category,
        source,
        date,
        note,
    } = req.body;

    if (!amount || !category || !date) {
        throw new ApiError(
            400,
            "Amount, category and date are required"
        );
    }

    if (!["income", "expense"].includes(type)) {
        throw new ApiError(
            400,
            "Invalid transaction type"
        );
    }

    const data = await Expense.create({
        amount,
        type,
        category: category.trim().toLowerCase(),
        source: source?.trim(),
        date,
        note,
        owner: req.user._id,
    });

    if (!data) {
        throw new ApiError(
            400,
            "Transaction creation failed for db"
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                data,
                `${type === "income" ? "Income" : "Expense"} created successfully`
            )
        );
});

// getting expense list also filter by type
const getExpenseList = asyncHandler(async (req, res) => {
    const { type } = req.query;

    const filter = {
        owner: req.user._id,
    };

    if (type) {
        if (!["income", "expense"].includes(type)) {
            throw new ApiError(400, "Invalid transaction type");
        }

        filter.type = type;
    }

    const data = await Expense.find(filter)
        .sort({ date: -1, createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Transaction list fetched successfully"
        )
    );
});

//deleting expense from list
const deleteExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({
        _id: id,
        owner: req.user._id,
    });

    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                expense,
                "Expense deleted successfully"
            )
        );
});


// updating expense
const updateExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const {
        amount,
        type,
        category,
        source,
        date,
        note,
    } = req.body;

    // Find existing transaction
    const existingExpense = await Expense.findOne({
        _id: id,
        owner: req.user._id,
    });

    if (!existingExpense) {
        throw new ApiError(
            404,
            "Transaction not found"
        );
    }

    const updateData = {};

    if (amount !== undefined) {
        updateData.amount = amount;
    }

    if (type !== undefined) {
        if (!["income", "expense"].includes(type)) {
            throw new ApiError(
                400,
                "Invalid transaction type"
            );
        }

        updateData.type = type;
    }

    if (category !== undefined) {
        updateData.category = category
            .trim()
            .toLowerCase();
    }

    if (source !== undefined) {
        updateData.source = source.trim();
    }

    if (date !== undefined) {
        updateData.date = date;
    }

    if (note !== undefined) {
        updateData.note = note;
    }

    if (Object.keys(updateData).length === 0) {
        throw new ApiError(
            400,
            "No data provided for update"
        );
    }

    // Determine what the transaction will look like
    // after the update
    const finalType =
        updateData.type || existingExpense.type;

    const finalCategory =
        updateData.category || existingExpense.category;

    // Validate category according to final type
    if (finalType === "expense") {
        const validCategories = [
            "food",
            "transport",
            "rent",
            "shopping",
            "health",
            "entertainment",
            "other",
        ];

        if (!validCategories.includes(finalCategory)) {
            throw new ApiError(
                400,
                "Invalid category for expense"
            );
        }
    }

    if (finalType === "income") {
        const validCategories = [
            "salary",
            "freelance",
            "business",
            "investment",
            "other",
        ];

        if (!validCategories.includes(finalCategory)) {
            throw new ApiError(
                400,
                "Invalid category for income"
            );
        }
    }

    const expense = await Expense.findOneAndUpdate(
        {
            _id: id,
            owner: req.user._id,
        },
        updateData,
        {
            returnDocument: "after"
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            expense,
            "Transaction updated successfully"
        )
    );
});

// fetchinng finance summary
const getFinancialSummary = asyncHandler(async (req, res) => {
    const transactions = await Expense.find({
        owner: req.user._id,
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        }

        if (transaction.type === "expense") {
            totalExpense += transaction.amount;
        }
    });

    const balance = totalIncome - totalExpense;

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalIncome,
                totalExpense,
                balance,
            },
            "Financial summary fetched successfully"
        )
    );
});

//fetching financial analytice based on cateogry or source
const getFinancialAnalytics = asyncHandler(async (req, res) => {
    const transactions = await Expense.find({
        owner: req.user._id,
    });

    const incomeByCategory = {};
    const expenseByCategory = {};

    transactions.forEach((transaction) => {
        const category = transaction.category;

        if (transaction.type === "income") {
            incomeByCategory[category] =
                (incomeByCategory[category] || 0) + transaction.amount;
        }

        if (transaction.type === "expense") {
            expenseByCategory[category] =
                (expenseByCategory[category] || 0) + transaction.amount;
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                incomeByCategory,
                expenseByCategory,
            },
            "Financial analytics fetched successfully"
        )
    );
});

// fetching total monthly income and expense
const getMonthlyAnalytics = asyncHandler(async (req, res) => {
    const transactions = await Expense.find({
        owner: req.user._id,
    });

    const monthlyData = {};

    transactions.forEach((transaction) => {
        const month = transaction.date.slice(0, 7);

        if (!monthlyData[month]) {
            monthlyData[month] = {
                income: 0,
                expense: 0,
                balance: 0,
            };
        }

        if (transaction.type === "income") {
            monthlyData[month].income += transaction.amount;
        }

        if (transaction.type === "expense") {
            monthlyData[month].expense += transaction.amount;
        }

        monthlyData[month].balance =
            monthlyData[month].income -
            monthlyData[month].expense;
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            monthlyData,
            "Monthly analytics fetched successfully"
        )
    );
});

export {
    createExpense,
    getExpenseList,
    deleteExpense,
    updateExpense,
    getFinancialSummary,
    getFinancialAnalytics,
    getMonthlyAnalytics
}