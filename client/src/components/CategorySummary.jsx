import { useSelector } from "react-redux";
import { selectCategoryTotals } from "../App/features/expenses/expensesSelector";
import Card from "./Card";

const CategorySummary = () => {
  const categoryTotals = useSelector(selectCategoryTotals);
  const categories = Object.keys(categoryTotals);

  if (categories.length === 0) return null;

  const total = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  return (
    <Card>
      <h2 className="text-base font-semibold text-gray-200 mb-4">
        Category Summary
      </h2>

      <ul className="space-y-3">
        {categories.map((category) => {
          const amount = categoryTotals[category];
          const percent = total > 0 ? Math.round((amount / total) * 100) : 0;

          return (
            <li key={category}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-300">{category}</span>
                <span className="text-sm font-semibold text-emerald-400">
                  ₹{amount.toLocaleString("en-IN")}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-white/5 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default CategorySummary;
