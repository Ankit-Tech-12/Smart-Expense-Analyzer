import { createSelector } from "@reduxjs/toolkit";

// base selector (single source)
const selectExpenses = (state) => state.expenses.expenses;

// 1️⃣ Total expenses
export const selectTotalExpenses = createSelector(
    [selectExpenses],
    (expenses) =>
        expenses.reduce((total, expense) => total + expense.amount, 0)
);

// 2️⃣ Category-wise totals
export const selectCategoryTotals = createSelector(
    [selectExpenses],
    (expenses) =>
        expenses.reduce((result, expense) => {
            const category = expense.category;
            result[category] = (result[category] || 0) + expense.amount;
            return result;
        }, {})
);

// 3️⃣ Monthly comparison
export const selectMonthlyComparison = createSelector(
    [selectExpenses],
    (expenses) => {
        const now = new Date();

        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const lastMonthDate = new Date(currentYear, currentMonth - 1);
        const lastMonth = lastMonthDate.getMonth();
        const lastMonthYear = lastMonthDate.getFullYear();

        let currentMonthTotal = 0;
        let lastMonthTotal = 0;

        expenses.forEach((expense) => {
            const expenseDate = new Date(expense.date);
            const expenseMonth = expenseDate.getMonth();
            const expenseYear = expenseDate.getFullYear();

            if (
                expenseMonth === currentMonth &&
                expenseYear === currentYear
            ) {
                currentMonthTotal += expense.amount;
            }

            if (
                expenseMonth === lastMonth &&
                expenseYear === lastMonthYear
            ) {
                lastMonthTotal += expense.amount;
            }
        });

        return {
            currentMonthTotal,
            lastMonthTotal,
            difference: currentMonthTotal - lastMonthTotal,
        };
    }
);

//spike
export const selectSpendingSpike = createSelector(
  [selectMonthlyComparison],
  ({ currentMonthTotal, lastMonthTotal, difference }) => {
    if (lastMonthTotal === 0) {
      return {
        hasSpike: false,
        message: "",
      };
    }

    const percentageChange =
      (difference / lastMonthTotal) * 100;

    if (percentageChange >= 25) {
      return {
        hasSpike: true,
        message: `Spending increased by ${percentageChange.toFixed(
          1
        )}% compared to last month`,
      };
    }

    return {
      hasSpike: false,
      message: "",
    };
  }
);

