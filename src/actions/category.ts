"use server";

import { Category } from "@prisma/client";
import { ActionResponse, CategoryWithTransactionAmounts } from "@/types";
import prisma from "@/db";
import { checkUserExists } from "./auth";
import { getStartOfMonth } from "@/utils/date";

export async function createCategory(data: Pick<Category, "name" | "budget">): Promise<ActionResponse<Category>> {
   const missing = (["name", "budget"] as const).filter((field) => !data[field]);

   if (missing.length) {
      return {
         success: false,
         message: `Missing required fields: ${missing.join(", ")}`,
      };
   }

   const user = await checkUserExists();

   try {
      const newCategory = await prisma.category.create({
         data: {
            ...data,
            user: {
               connect: {
                  id: user.id,
               },
            },
         },
      });

      return {
         success: true,
         data: newCategory,
      };
   } catch {
      return {
         success: false,
         message: `Category already exists`,
      };
   }
}

export async function deleteCategory(data: Pick<Category, "id">): Promise<ActionResponse<Category>> {
   if (!data.id) {
      return {
         success: false,
         message: "Missing id field"
      }
   }

   await checkUserExists();

   try {
      const category = await prisma.category.update({
         where: {
            id: data.id
         },
         data: {
            deletedAt: new Date()
         }
      });

      return {
         success: true,
         data: category
      }
   } catch {
      return {
         success: false,
         message: "Category could not be deleted"
      }
   }
}

export async function getCategoryData<T extends GetCategoryDataOptions | undefined>(
   data?: T
): Promise<ActionResponse<GetCategoryDataResponse<T>>> {
   const user = await checkUserExists();

   try {
      const categories = (await prisma.category.findMany({
         where: {
            userId: user.id,
            OR: [
               { deletedAt: { gte: getStartOfMonth() } },
               { deletedAt: null }
            ]
         },
         orderBy: [
            {
               transactions: {
                  _count: "desc",
               },
            },
            {
               id: "asc",
            },
         ],
         ...(data?.transactions
            ? {
               include: {
                  transactions: {
                     where: {
                        purchasedAt: {
                           gte: data?.range?.from,
                           lte: data?.range?.to,
                        },
                     },
                     select: {
                        amount: true,
                     },
                  },
               },
            }
            : {}),
      })) as GetCategoryDataResponse<T>;

      return {
         success: true,
         data: categories,
      };
   } catch {
      return {
         success: false,
         message: `Internal Server Error`,
      };
   }
}

type GetCategoryDataResponse<T extends GetCategoryDataOptions | undefined> = T extends GetCategoryDataOptions
   ? T["transactions"] extends true
   ? CategoryWithTransactionAmounts[]
   : Category[]
   : Category[];

interface GetCategoryDataOptions {
   range?: {
      from?: Date;
      to?: Date;
   };
   transactions?: boolean;
}
