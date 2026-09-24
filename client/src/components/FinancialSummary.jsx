import { useEffect, useState } from "react";
import { getFinancialSummary } from "../api/finance.api";
import Card from "./Card";

const FinancialSummary = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const response = await getFinancialSummary();

        setSummary(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadSummary();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

      {/* Total Income */}
      <Card className="bg-gradient-to-br from-emerald-600/20 to-emerald-900/10 border-emerald-500/20">
        <p className="text-sm text-gray-400 mb-1">
          Total Income
        </p>

        <p className="text-2xl sm:text-3xl font-bold text-white">
          ₹{summary.totalIncome.toLocaleString("en-IN")}
        </p>

        <p className="text-xs text-emerald-400 mt-2">
          All time income
        </p>
      </Card>

      {/* Total Expenses */}
      <Card className="bg-gradient-to-br from-red-600/20 to-red-900/10 border-red-500/20">
        <p className="text-sm text-gray-400 mb-1">
          Total Expenses
        </p>

        <p className="text-2xl sm:text-3xl font-bold text-white">
          ₹{summary.totalExpense.toLocaleString("en-IN")}
        </p>

        <p className="text-xs text-red-400 mt-2">
          All time spending
        </p>
      </Card>

      {/* Balance */}
      <Card className="bg-gradient-to-br from-blue-600/20 to-blue-900/10 border-blue-500/20">
        <p className="text-sm text-gray-400 mb-1">
          Balance
        </p>

        <p className="text-2xl sm:text-3xl font-bold text-white">
          ₹{summary.balance.toLocaleString("en-IN")}
        </p>

        <p className="text-xs text-blue-400 mt-2">
          Income − Expenses
        </p>
      </Card>

    </div>
  );
};

export default FinancialSummary;