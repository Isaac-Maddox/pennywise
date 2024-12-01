"use client";

import { toKebabCase } from "@/utils/string";
import { Category } from "@prisma/client";
import "@/css/components/budget_chart.css";
import { useEffect, useRef } from "react";

export default function BudgetChart({ size = "small", category, budget, multiplier, amount, name }: BudgetChartProps) {
   const chartElement = useRef<HTMLDivElement>(null);

   let displayPercentage = 0;
   let gradientDegrees = 0;
   let overBudget = false;
   const displayName = category?.name || name || "Total";
   const color = category?.color || "theme";
   const percentTextSize = size === "small" ? "text-h2" : "text-h1";
   const nameTextSize = size === "small" ? "text-md" : "text-lg";

   if (category) {
      // const _ = category.id;
      // Make and call a fucntion to get
      // SELECT SUM(amount) FROM Transaction
      // WHERE userId = budget.user.id AND
      // categoryId = budgetId
   } else {
      displayPercentage = Math.round((amount / budget) * 100);
      overBudget = amount > budget;
      if (overBudget) {
         gradientDegrees = displayPercentage - 100;
         console.log(gradientDegrees);
      } else {
         gradientDegrees = displayPercentage;
      }
   }

   useEffect(() => {
      chartElement.current?.style.setProperty("--_progress", `${gradientDegrees * 3.6}deg`);
      if (multiplier) {
         chartElement.current?.style.setProperty("--_projected", `${gradientDegrees * 3.6 * multiplier}deg`);
      }
   }, [chartElement]);

   return (
      <div
         ref={chartElement}
         className={`budget-chart color-${color} chart-${size} ${overBudget ? "over-budget" : ""}`}>
         <progress
            className="visually-hidden"
            id={toKebabCase(displayName)}
            value={gradientDegrees}
            max={100}></progress>
         <p className={`category-percent ${percentTextSize}`}>{displayPercentage}%</p>
         <p className={`category-name ${nameTextSize}`}>{displayName}</p>
      </div>
   );
}

type BudgetChartProps =
   | {
        category: Category;
        multiplier?: number;
        size?: "large" | "small";
        budget?: never;
        amount?: never;
        name?: never;
     }
   | {
        budget: number;
        multiplier?: number;
        amount: number;
        name?: string;
        size?: "large" | "small";
        category?: never;
     };
