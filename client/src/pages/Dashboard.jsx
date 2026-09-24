import CategorySummary from "../components/CategorySummary";
import SpendingSpikeAlert from "../components/SpendingSpikeAlert";
import MonthlyComparison from "../components/MonthlyComparison";
import AnimatedCard from "../components/AnimatedCard";
import FinancialSummary from "../components/FinancialSummary";

const Dashboard = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <AnimatedCard delay={0}>
        <FinancialSummary />
      </AnimatedCard>

      <SpendingSpikeAlert />

      <AnimatedCard delay={0.05}>
        <CategorySummary />
      </AnimatedCard>

      {/* Monthly Comparisons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <AnimatedCard delay={0.1}>
          <MonthlyComparison type="expense" />
        </AnimatedCard>

        <AnimatedCard delay={0.15}>
          <MonthlyComparison type="income" />
        </AnimatedCard>
      </div>
    </div>
  );
};

export default Dashboard;