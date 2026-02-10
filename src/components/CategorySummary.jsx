import { useSelector } from "react-redux";
import { selectCategoryTotals } from "../App/features/expenses/expensesSelector";
import Card from "./Card";
const CategorySummary = () => {
  const categoryTotals = useSelector(selectCategoryTotals);

  const categories = Object.keys(categoryTotals); // Convert object keys to an array

  if (categories.length === 0) {
    return null;
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold px-4 py-3 border-b">
        Category Summary
      </h2>

      <ul className="divide-y">
        {categories.map((category) => (
          <li
            key={category}
            className="flex justify-between px-4 py-3"
          >
            <span className="font-medium text-gray-700">
              {category}
            </span>
            <span className="font-semibold text-green-600">
              ₹{categoryTotals[category]}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default CategorySummary;
