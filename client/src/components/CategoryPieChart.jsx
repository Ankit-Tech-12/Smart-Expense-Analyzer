import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getFinancialAnalytics } from "../api/finance.api";
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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;

    return (
      <div className="bg-[#1e2d45] border border-white/10 rounded-xl px-3 py-2 text-sm shadow-xl">
        <p className="text-gray-200 font-medium">
          {name}
        </p>

        <p className="text-emerald-400 font-semibold">
          ₹{value.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }

  return null;
};

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (percent < 0.05) return null;

  const RADIAN = Math.PI / 180;

  const radius =
    innerRadius +
    (outerRadius - innerRadius) * 0.5;

  const x =
    cx + radius * Math.cos(-midAngle * RADIAN);

  const y =
    cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CategoryPieChart = ({ type = "expense" }) => {
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await getFinancialAnalytics();

        if (type === "income") {
          setCategoryData(
            response.data.incomeByCategory
          );
        } else {
          setCategoryData(
            response.data.expenseByCategory
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadAnalytics();
  }, [type]);

  const data = Object.keys(categoryData).map(
    (key) => ({
      name: key,
      value: categoryData[key],
    })
  );

  if (data.length === 0) {
    return null;
  }

  const title =
    type === "income"
      ? "Income by Category"
      : "Spending by Category";

  return (
    <Card>
      <h2 className="text-base font-semibold text-gray-200 mb-4">
        {title}
      </h2>

      <div className="recharts-wrapper outline-none">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
              label={renderCustomLabel}
              activeShape={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              content={<CustomTooltip />}
            />

            <Legend
              formatter={(value) => (
                <span
                  style={{
                    color: "#9ca3af",
                    fontSize: "13px",
                  }}
                >
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CategoryPieChart;