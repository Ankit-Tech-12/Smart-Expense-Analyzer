import TotalExpense from "../components/TotalExpense";
import CategorySummary from "../components/CategorySummary";
import SpendingSpikeAlert from "../components/SpendingSpikeAlert";
import MonthlyComparison from "../components/MonthlyComparison";
import AnimatedCard from "../components/AnimatedCard";

const Dashboard = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <AnimatedCard delay={0}>
        <TotalExpense />
      </AnimatedCard>

      <SpendingSpikeAlert />

      <AnimatedCard delay={0.05}>
        <CategorySummary />
      </AnimatedCard>
      
      <AnimatedCard delay={0.1}>
        <MonthlyComparison />
      </AnimatedCard>

    </div>
  );
};

export default Dashboard;
