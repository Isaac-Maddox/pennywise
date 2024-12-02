"use client";

import { toKebabCase } from "@/utils/string";
import "@/css/components/budget_chart.css";
import { useEffect, useRef } from "react";

export default function BudgetChart({ size = "small", color = "theme", budget, multiplier, amount, name }: BudgetChartProps) {
   const chartElement = useRef<HTMLDivElement>(null);

   const percentTextSize = size === "small" ? "text-h2" : "text-h1";
   const nameTextSize = size === "small" ? "text-md" : "text-lg";
   const displayPercentage = Math.round((amount / budget) * 100);
   const overBudget = amount > budget;
   const gradientDegrees = overBudget ? displayPercentage - 100 : displayPercentage;

   useEffect(() => {
      setTimeout(() => {
         chartElement.current?.style.setProperty("--_progress", `${gradientDegrees * 3.6}deg`);

         if (multiplier) {
            chartElement.current?.style.setProperty("--_projected", `${gradientDegrees * 3.6 * multiplier}deg`);
         }
      }, 1);
   }, [chartElement]);

   return (
      <div ref={chartElement} className={`budget-chart color-${color} chart-${size} ${overBudget ? "over-budget" : ""}`}>
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
