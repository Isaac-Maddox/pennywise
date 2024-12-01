export default function BudgetChartSkeleton({ size = "small" }: BudgetChartSkeletonProps) {
   return <div className={`budget-chart color-theme chart-${size}`}></div>;
}

interface BudgetChartSkeletonProps {
   size?: "large" | "small";
}
