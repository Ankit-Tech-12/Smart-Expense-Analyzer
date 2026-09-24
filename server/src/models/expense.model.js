import mongoose, { Schema } from "mongoose";

const expenseCategories = [
    "food",
    "transport",
    "rent",
    "shopping",
    "health",
    "entertainment",
    "other",
];

const incomeCategories = [
    "salary",
    "freelance",
    "business",
    "investment",
    "other",
];

const expenseSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["income", "expense"],
    },
    note: {
        type: String,
        trim: true
    },
     category: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    if (this.type === "expense") {
                        return expenseCategories.includes(value);
                    }

                    if (this.type === "income") {
                        return incomeCategories.includes(value);
                    }

                    return false;
                },
                message: "Invalid category for transaction type",
            },
        },
    source: {
        type: String,
        trim: true,
    },
    date: {
        type: String,
        required: true,
        match: /^\d{4}-\d{2}-\d{2}$/
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true,
    }
}, { timestamps: true })

export const Expense = mongoose.model("Expense", expenseSchema);