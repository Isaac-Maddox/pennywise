"use server";

import { ActionResponse } from "@/types";
import prisma from "@/db";
import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { redirect } from "next/navigation";

export async function getQuickSummary(): Promise<ActionResponse<QuickSummary>> {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")?.value;
   const user = await verifyToken(token);

   if (!user) {
      cookieStore.delete("usrjwt");
      redirect("/login");
   }

   const now = new Date();
   const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

   try {
      const total = await prisma.transaction.aggregate({
         _sum: {
            amount: true,
         },
         where: {
            userId: user.id,
            purchasedAt: {
               gte: startOfMonth,
            },
         },
      });

      const totalBudget = await prisma.category.aggregate({
         _sum: {
            budget: true,
         },
         where: {
            userId: user.id,
         },
      });

      return {
         success: true,
         data: {
            totalSpent: total._sum.amount || 0,
            totalBudget: totalBudget._sum.budget || 0,
         },
      };
   } catch (error) {
      console.log(error);
      return {
         success: false,
         message: `Category already exists`,
      };
   }
}

interface QuickSummary {
   totalSpent: number;
   totalBudget: number;
}
