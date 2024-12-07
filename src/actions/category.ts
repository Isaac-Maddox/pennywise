"use server";

import { Category } from "@prisma/client";
import { ActionResponse, CategoryWithTransactions } from "@/types";
import prisma from "@/db";
import { cookies } from "next/headers";
import { checkUserExists, verifyToken } from "./auth";
import { redirect } from "next/navigation";

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

export async function getCategoryData<T extends GetCategoryDataOptions | undefined>(
   data?: T
): Promise<ActionResponse<GetCategoryDataResponse<T>[]>> {
   const user = await checkUserExists();

   try {
      const categories = (await prisma.category.findMany({
         where: {
            userId: user.id,
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
      })) as GetCategoryDataResponse<T>[];

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
      ? CategoryWithTransactions
      : Category
   : Category;

interface GetCategoryDataOptions {
   range?: {
      from?: Date;
      to?: Date;
   };
   transactions?: boolean;
}
