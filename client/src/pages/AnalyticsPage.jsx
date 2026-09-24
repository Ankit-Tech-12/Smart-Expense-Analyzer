import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import AnimatedCard from "../components/AnimatedCard";

const AnalyticsPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold text-gray-200">
        Analytics
      </h1>
      <h2>Expense</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard delay={0}>
          <CategoryPieChart type="expense" />
        </AnimatedCard>

        <AnimatedCard delay={0.16}>
          <MonthlyBarChart />
        </AnimatedCard>
    {/* making this page perfect */}
        <h2>Income</h2>
        <AnimatedCard delay={0.08}>
          <CategoryPieChart type="income" />
        </AnimatedCard>
      </div>
    </div>
  );
};

export default AnalyticsPage;