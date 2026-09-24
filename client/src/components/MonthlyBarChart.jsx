import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { getMonthlyAnalytics } from "../api/finance.api";
import Card from "./Card";

const CustomTooltip = ({ active, payload, label, type }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e2d45] border border-white/10 rounded-xl px-3 py-2 text-sm shadow-xl">
        <p className="text-gray-400 mb-1">
          {label}
        </p>

        <p
          className={`font-semibold ${
            type === "income"
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          ₹{payload[0].value.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }

  return null;
};

const MonthlyBarChart = ({ type = "expense" }) => {
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    const loadMonthlyData = async () => {
      try {
        const response = await getMonthlyAnalytics();

        setMonthlyData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadMonthlyData();
  }, []);

  const now = new Date();

  const currentMonthKey = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  const previousDate = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  const previousMonthKey = `${previousDate.getFullYear()}-${String(
    previousDate.getMonth() + 1
  ).padStart(2, "0")}`;

  const currentMonthTotal =
    type === "income"
      ? monthlyData[currentMonthKey]?.income || 0
      : monthlyData[currentMonthKey]?.expense || 0;

  const lastMonthTotal =
    type === "income"
      ? monthlyData[previousMonthKey]?.income || 0
      : monthlyData[previousMonthKey]?.expense || 0;

  if (currentMonthTotal === 0 && lastMonthTotal === 0) {
    return null;
  }

  const data = [
    {
      name: "Last Month",
      amount: lastMonthTotal,
    },
    {
      name: "This Month",
      amount: currentMonthTotal,
    },
  ];

  const title =
    type === "income"
      ? "Monthly Income"
      : "Monthly Spending";

  const isIncrease =
    currentMonthTotal > lastMonthTotal;

  return (
    <Card>
      <h2 className="text-base font-semibold text-gray-200 mb-4">
        {title}
      </h2>

      <div className="recharts-wrapper outline-none">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barSize={52}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{
                fill: "#6b7280",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#6b7280",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value}`}
            />

            <Tooltip
              content={
                <CustomTooltip type={type} />
              }
              cursor={{
                fill: "rgba(255,255,255,0.03)",
              }}
            />

            <Bar
              dataKey="amount"
              radius={[6, 6, 0, 0]}
              activeBar={false}
            >
              <Cell fill="#3b82f6" />

              <Cell
                fill={
                  type === "income"
                    ? isIncrease
                      ? "#22c55e"
                      : "#3b82f6"
                    : isIncrease
                    ? "#ef4444"
                    : "#22c55e"
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-500 mt-2 text-center">
        This month's{" "}
        {type === "income"
          ? "income"
          : "spending"}{" "}
        is{" "}
        <span
          className={
            isIncrease
              ? type === "income"
                ? "text-emerald-400"
                : "text-red-400"
              : "text-emerald-400"
          }
        >
          {isIncrease ? "higher" : "lower"}
        </span>{" "}
        than last month
      </p>
    </Card>
  );
};

export default MonthlyBarChart;