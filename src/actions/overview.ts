import prisma from "@/db";
import { ActionResponse } from "@/types";
import { checkUserExists } from "./auth";
import { getStartOfMonth } from "@/utils/date";
import { toCurrencyString } from "@/utils/string";

export async function getOverviewData(): Promise<ActionResponse<GetOverviewDataResponse>> {
   const user = await checkUserExists();
   const numberFormat = Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "USD"
   });

   const [rawCategories, rawTransactions] = await prisma.$transaction([
      prisma.category.findMany({
         where: {
            userId: user.id,
            OR: [
               { deletedAt: { gte: getStartOfMonth() } },
               { deletedAt: null }
            ]
         },
         include: {
            transactions: { select: { amount: true } }
         }
      }),
      prisma.transaction.findMany({
         where: {
            userId: user.id,
            purchasedAt: { gte: getStartOfMonth() }
         },
         orderBy: {
            purchasedAt: 'desc'
         },
         include: {
            category: {
               select: {
                  name: true
               }
            }
         }
      }),
   ])

   let transactionsTotal = 0;
   const transactions: GetOverviewDataResponse["transactions"] = rawTransactions.map((transaction) => {
      transactionsTotal += transaction.amount;

      return {
         date: transaction.purchasedAt.toLocaleDateString('en-US', {
            month: "short",
            day: "2-digit"
         }),
         name: transaction.title,
         category: transaction.category.name,
         vendor: transaction.vendor,
         amount: toCurrencyString(transaction.amount)
      }
   })

   let budgetTotal = 0;
   let spentTotal = 0;
   const budget: GetOverviewDataResponse["budget"] = rawCategories.map((category) => {
      const spent = category.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      budgetTotal += category.budget;
      spentTotal += spent;

      return {
         category: category.name,
         "budgeted-amount": toCurrencyString(category.budget),
         "spent-this-month": toCurrencyString(spent),
         remaining: toCurrencyString(category.budget - spent)
      }
   })

   return {
      success: true,
      data: {
         transactions,
         budget,
         totals: {
            transactions: { amount: toCurrencyString(transactionsTotal) },
            budget: {
               "budgeted-amount": toCurrencyString(budgetTotal),
               "spent-this-month": toCurrencyString(spentTotal),
               remaining: toCurrencyString(budgetTotal - spentTotal)
            }
         }
      }
   }
}

interface GetOverviewDataResponse {
   transactions: {
      date: string;
      name: string;
      category: string;
      vendor: string | null;
      amount: string;
   }[];
   budget: {
      category: string;
      "budgeted-amount": string;
      "spent-this-month": string;
      remaining: string;
   }[];
   totals: {
      transactions: {
         amount: string;
      };
      budget: {
         "budgeted-amount": string;
         "spent-this-month": string;
         remaining: string;
      }
   }
}