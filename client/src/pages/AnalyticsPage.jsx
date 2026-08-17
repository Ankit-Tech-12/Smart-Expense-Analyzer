import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import AnimatedCard from "../components/AnimatedCard";

const AnalyticsPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold text-gray-200">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard delay={0}>
          <CategoryPieChart />
        </AnimatedCard>

        <AnimatedCard delay={0.08}>
          <MonthlyBarChart />
        </AnimatedCard>
      </div>
    </div>
  );
};

export default AnalyticsPage;
