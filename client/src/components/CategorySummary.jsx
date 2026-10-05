import { useSelector } from "react-redux";
import Card from "./Card";

const CategorySummary = () => {
  const categoryAnalytics = useSelector(
    (state) => state.transactions.categoryAnalytics
  );

  const incomeCategories = Object.keys(
    categoryAnalytics.incomeByCategory
  );

  const expenseCategories = Object.keys(
    categoryAnalytics.expenseByCategory
  );

  const hasIncome = incomeCategories.length > 0;
  const hasExpenses = expenseCategories.length > 0;

  if (!hasIncome && !hasExpenses) {
    return null;
  }

  // Calculate total income once
  const totalIncome = Object.values(
    categoryAnalytics.incomeByCategory
  ).reduce((total, amount) => total + amount, 0);

  // Calculate total expenses once
  const totalExpense = Object.values(
    categoryAnalytics.expenseByCategory
  ).reduce((total, amount) => total + amount, 0);

  return (
    <Card>
      <h2 className="text-base font-semibold text-gray-200 mb-4">
        Category Summary
      </h2>

      {/* Income */}
      {hasIncome && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-emerald-400 mb-3">
            Income
          </h3>

          <ul className="space-y-3">
            {incomeCategories.map((category) => {
              const amount =
                categoryAnalytics.incomeByCategory[category];

              const percent =
                totalIncome > 0
                  ? Math.round((amount / totalIncome) * 100)
                  : 0;

              return (
                <li key={`income-${category}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-300 capitalize">
                      {category}
                    </span>

                    <span className="text-sm font-semibold text-emerald-400">
                      +₹{amount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Expenses */}
      {hasExpenses && (
        <div>
          <h3 className="text-sm font-medium text-red-400 mb-3">
            Expenses
          </h3>

          <ul className="space-y-3">
            {expenseCategories.map((category) => {
              const amount =
                categoryAnalytics.expenseByCategory[category];

              const percent =
                totalExpense > 0
                  ? Math.round((amount / totalExpense) * 100)
                  : 0;

              return (
                <li key={`expense-${category}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-300 capitalize">
                      {category}
                    </span>

                    <span className="text-sm font-semibold text-red-400">
                      -₹{amount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div
                      className="bg-red-500 h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default CategorySummary;