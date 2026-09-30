import mongoose, { Schema } from "mongoose";
import {
    expenseCategories,
    incomeCategories,
} from "../constants/transaction.constants.js";


const transactionSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        min: 0.01,
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

// Index for faster transaction queries
transactionSchema.index({
  owner: 1,
  date: -1,
});

export const Transaction = mongoose.model("Transaction", transactionSchema);