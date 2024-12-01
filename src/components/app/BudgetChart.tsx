"use client";

import { toKebabCase } from "@/utils/string";
import "@/css/components/budget_chart.css";
import { useEffect, useRef } from "react";

export default function BudgetChart({
   size = "small",
   color = "theme",
   budget,
   multiplier,
   amount,
   name,
}: BudgetChartProps) {
   const chartElement = useRef<HTMLDivElement>(null);

   let displayPercentage = 0;
   let gradientDegrees = 0;
   let overBudget = false;
   const percentTextSize = size === "small" ? "text-h2" : "text-h1";
   const nameTextSize = size === "small" ? "text-md" : "text-lg";

   displayPercentage = Math.round((amount / budget) * 100);
   overBudget = amount > budget;
   if (overBudget) {
      gradientDegrees = displayPercentage - 100;
      console.log(gradientDegrees);
   } else {
      gradientDegrees = displayPercentage;
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
         <progress className="visually-hidden" id={toKebabCase(name)} value={gradientDegrees} max={100}></progress>
         <p className={`category-percent ${percentTextSize}`}>{displayPercentage}%</p>
         <p className={`category-name ${nameTextSize}`}>{name}</p>
      </div>
   );
}

interface BudgetChartProps {
   budget: number;
   name: string;
   amount: number;
   multiplier?: number;
   color?: string;
   size?: "large" | "small";
}
