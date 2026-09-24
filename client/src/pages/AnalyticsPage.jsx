import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import AnimatedCard from "../components/AnimatedCard";

const AnalyticsPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-xl font-semibold text-gray-200">
        Analytics
      </h1>

      {/* Expense Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-200 mb-4">
          Expense
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatedCard delay={0}>
            <CategoryPieChart type="expense" />
          </AnimatedCard>

          <AnimatedCard delay={0.08}>
            <MonthlyBarChart type="expense" />
          </AnimatedCard>
        </div>
      </section>

      {/* Income Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-200 mb-4">
          Income
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatedCard delay={0.16}>
            <CategoryPieChart type="income" />
          </AnimatedCard>

          <AnimatedCard delay={0.24}>
            <MonthlyBarChart type="income" />
          </AnimatedCard>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;