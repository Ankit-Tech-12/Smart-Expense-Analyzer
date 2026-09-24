import { useEffect, useState } from "react";
import { getFinancialSummary } from "../api/finance.api";
import Card from "./Card";

const TotalExpense = () => {
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const response = await getFinancialSummary();

        setTotalExpense(response.data.totalExpense);
      } catch (error) {
        console.log(error);
      }
    };

    loadSummary();
  }, []);

  return (
    <Card className="bg-gradient-to-br from-blue-600/20 to-blue-900/10 border-blue-500/20">
      <p className="text-sm text-gray-400 mb-1">
        Total Expenses
      </p>

      <p className="text-3xl sm:text-4xl font-bold text-white">
        ₹{totalExpense.toLocaleString("en-IN")}
      </p>

      <p className="text-xs text-blue-400 mt-2">
        All time spending
      </p>
    </Card>
  );
};

export default TotalExpense;