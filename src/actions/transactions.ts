"use server";

import { ActionResponse, TransactionWithCategoryName } from "@/types";
import prisma from "@/db";
import { checkUserExists } from "./auth";
import { Transaction } from "@prisma/client";

export async function getTransactions<T extends GetTransactionsOptions>({
   size,
   range,
   category,
}: T): Promise<ActionResponse<GetTransactionsReturnType<T>>> {
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
            purchasedAt: "desc",
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
      })) as GetTransactionsReturnType<T>;

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

interface GetTransactionsOptions {
   size?: number;
   range?: {
      from?: Date;
      to?: Date;
   };
   category?: boolean;
}

type GetTransactionsReturnType<T extends GetTransactionsOptions> = T["category"] extends true
   ? TransactionWithCategoryName[]
   : Transaction[];
