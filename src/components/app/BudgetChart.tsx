import { toKebabCase } from "@/utils/string";
import { Category } from "@prisma/client";
import "@/css/components/budget_chart.css";

export default function BudgetChart({ category, budget, amount, name }: BudgetChartProps) {
   let percentage = 0;
   const displayName = category?.name || name || "Total";

   if (category) {
      const budgetId = category.id;
      // Make and call a fucntion to get

      // SELECT SUM(amount) FROM Transaction
      // WHERE userId = budget.user.id AND
      // categoryId = budgetId
   } else {
      percentage = Math.round((amount / budget) * 100);
   }

   return (
      <div className={`budget-chart color-${"red"}`}>
         <progress id={toKebabCase(displayName)} value={percentage} max={100}></progress>
         <p className="category-percent">{percentage}%</p>
         <p className="category-name">{displayName}</p>
      </div>
   );
}

type BudgetChartProps =
   | {
        category: Category;
        budget?: never;
        amount?: never;
        name?: never;
     }
   | {
        budget: number;
        amount: number;
        name?: string;
        category?: never;
     };
