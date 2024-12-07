"use server";

import { ActionResponse, TransactionWithCategoryName } from "@/types";
import prisma from "@/db";
import { checkUserExists } from "./auth";
import { Transaction } from "@prisma/client";

export async function getTransactions<T extends GetTransactionsOptions>({
   size,
   range,
   category,
}: T): Promise<ActionResponse<GetTransactionReturnType<T>[]>> {
   const user = await checkUserExists();

   try {
      const transactions = (await prisma.transaction.findMany({
         where: {
            userId: user.id,
            purchasedAt: {
               gte: range?.from,
               lte: range?.to,
            },
         },
         orderBy: {
            createdAt: "desc",
         },
         take: size,
         ...(category
            ? {
                 include: {
                    category: {
                       select: {
                          name: true,
                       },
                    },
                 },
              }
            : {}),
      })) as GetTransactionReturnType<T>[];

      return {
         success: true,
         data: transactions,
      };
   } catch (error) {
      return {
         success: false,
         message: `Internal Server Error`,
      };
   }
}

interface QuickSummary {
   totalSpent: number;
   totalBudget: number;
}

interface GetTransactionsOptions {
   size?: number;
   range?: {
      from?: Date;
      to?: Date;
   };
   category?: boolean;
}

type GetTransactionReturnType<T extends GetTransactionsOptions> = T["category"] extends true
   ? TransactionWithCategoryName
   : Transaction;
