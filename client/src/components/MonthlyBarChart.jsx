import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { getMonthlyAnalytics } from "../api/finance.api";
import Card from "./Card";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e2d45] border border-white/10 rounded-xl px-3 py-2 text-sm shadow-xl">
        <p className="text-gray-400 mb-1">
          {label}
        </p>

        <p className="text-red-400 font-semibold">
          ₹{payload[0].value.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }

  return null;
};

const MonthlyBarChart = () => {
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

  const data = Object.keys(monthlyData)
    .sort()
    .map((month) => {
      const [year, monthNumber] = month.split("-");

      const date = new Date(
        Number(year),
        Number(monthNumber) - 1
      );

      return {
        month: date.toLocaleString("en-IN", {
          month: "short",
          year: "numeric",
        }),
        amount: monthlyData[month].expense,
      };
    });

  if (data.length === 0) {
    return null;
  }

  return (
    <Card>
      <h2 className="text-base font-semibold text-gray-200 mb-4">
        Monthly Spending
      </h2>

      <div className="recharts-wrapper outline-none">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} barSize={45}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#6b7280",
                fontSize: 12,
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
              content={<CustomTooltip />}
              cursor={{
                fill: "rgba(255,255,255,0.03)",
              }}
            />

            <Bar
              dataKey="amount"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
              activeBar={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Monthly expense trend
      </p>
    </Card>
  );
};

export default MonthlyBarChart;