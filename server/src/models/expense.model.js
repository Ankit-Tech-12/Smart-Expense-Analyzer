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
    date: {
        type: String,
        required: true,
        match: /^\d{4}-\d{2}-\d{2}$/
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export const Expense = mongoose.model("Expense", expenseSchema);