import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import AnimatedCard from "../components/AnimatedCard";

const AnalyticsPage = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
  <AnimatedCard>
    <CategoryPieChart />
  </AnimatedCard>

  <AnimatedCard delay={0.08}>
    <MonthlyBarChart />
  </AnimatedCard>
</div>
  );
};

export default AnalyticsPage;
