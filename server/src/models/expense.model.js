import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Food",
            "Transport",
            "Rent",
            "Shopping",
            "Health",
            "Entertainment",
            "Other",
        ],
    }
}, { timestamps: true })

export const Expense = mongoose.model("Expense", expenseSchema);