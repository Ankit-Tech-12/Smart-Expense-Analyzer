import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Expense } from "../models/expense.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"

//creating expense in list
const createExpense = asyncHandler(async (req, res) => {
    const { amount, note, category, date } = req.body;

    if (!amount || !category || !date) {
        throw new ApiError(400, "Amount and category are required");
    }


    const data = await Expense.create({
        amount,
        note,
        category: category.trim().toLowerCase(),
        date,
        owner: req.user._id
    });

    if (!data) {
        throw new ApiError(
            400,
            "Expense creation failed for db"
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                data,
                "Expense created successfully"
            )
        );
});

// getting expense list
const getExpenseList = asyncHandler( async (req, res) => {
    const data= await Expense.find({
        owner:req.user._id
    }).sort({ createdAt:-1 });
    
    return res
    .status(200)
    .json(
        new ApiResponse(200, data, "Expense list fetched successfully")
    )
})

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

export {
    createExpense,
    getExpenseList,
    deleteExpense
}