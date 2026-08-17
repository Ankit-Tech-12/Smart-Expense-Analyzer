import { useSelector } from "react-redux";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Cell,
} from "recharts";
import { selectMonthlyComparison } from "../App/features/expenses/expensesSelector";
import Card from "./Card";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e2d45] border border-white/10 rounded-xl px-3 py-2 text-sm shadow-xl">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="text-blue-400 font-semibold">
          ₹{payload[0].value.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
};

const MonthlyBarChart = () => {
  const { currentMonthTotal, lastMonthTotal } =
    useSelector(selectMonthlyComparison);

  if (currentMonthTotal === 0 && lastMonthTotal === 0) return null;

  const data = [
    { name: "Last Month", amount: lastMonthTotal },
    { name: "This Month", amount: currentMonthTotal },
  ];

  const isIncrease = currentMonthTotal > lastMonthTotal;

  return (
    <Card>
      <h2 className="text-base font-semibold text-gray-200 mb-4">
        Monthly Spending Comparison
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={52}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#6b7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
            <Cell fill="#3b82f6" />
            <Cell fill={isIncrease ? "#ef4444" : "#22c55e"} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-500 mt-2 text-center">
        This month's bar is{" "}
        <span className={isIncrease ? "text-red-400" : "text-emerald-400"}>
          {isIncrease ? "higher" : "lower"}
        </span>{" "}
        than last month
      </p>
    </Card>
  );
};

export default MonthlyBarChart;
