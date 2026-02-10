import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { selectCategoryTotals } from "../App/features/expenses/expensesSelector";
import Card from "./Card";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f97316",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
  "#eab308",
];

const CategoryPieChart = () => {
  const categoryTotals = useSelector(selectCategoryTotals);

  const data = Object.keys(categoryTotals).map((key) => ({
    name: key,
    value: categoryTotals[key],
  }));

  if (data.length === 0) return null;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Spending by Category
      </h2>

      <PieChart width={320} height={260}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Card>
  );
};

export default CategoryPieChart;
