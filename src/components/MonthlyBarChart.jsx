import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { selectMonthlyComparison } from "../App/features/expenses/expensesSelector";
import Card from "./Card";

const MonthlyBarChart = () => {
  const { currentMonthTotal, lastMonthTotal } =
    useSelector(selectMonthlyComparison);

  if (currentMonthTotal === 0 && lastMonthTotal === 0) {
    return null;
  }

  const data = [
    { name: "Last Month", amount: lastMonthTotal },
    { name: "This Month", amount: currentMonthTotal },
  ];

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        Monthly Spending Comparison
      </h2>

      <BarChart width={320} height={260} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#3b82f6" />
      </BarChart>
    </Card>
  );
};

export default MonthlyBarChart;
