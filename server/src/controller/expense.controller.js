import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { Expense } from "../models/expense.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const createExpense = asyncHandler(async (req, res) => {
    let { amount, note, category } = req.body;
    amount=amount.trim().toLowerCase();
    if(!amount && !note){
       throw new ApiError(400,"Expense list creation failed") 
    }
    if(category){
        category=category.trim().toLowerCase();
    }
    const data = await Expense.create({
        amount,
        note,
        category:category  || null
    })
    if(!data){
        throw new ApiError(400,"Expense list creation failed for db");
    }

    return res.status(201).json(
        new ApiResponse(201,data,"Expense list created successfully")
    )

})

export {
    createExpense
}