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
            "food",
            "transport",
            "rent",
            "shopping",
            "health",
            "entertainment",
            "other",
        ],
    },
    owner:{
        type :Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamps: true })

export const Expense = mongoose.model("Expense", expenseSchema);