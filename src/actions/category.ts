"use server";

import { Category } from "@prisma/client";
import { ActionResponse, CategoryWithTransactions } from "@/types";
import prisma from "@/db";
import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { redirect } from "next/navigation";

export async function createCategory(data: Pick<Category, "name" | "budget">): Promise<ActionResponse<Category>> {
   const missing = (["name", "budget"] as const).filter((field) => !data[field]);

   if (missing.length) {
      return {
         success: false,
         message: `Missing required fields: ${missing.join(", ")}`,
      };
   }

   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")?.value;
   const user = await verifyToken(token);

   if (!user) {
      cookieStore.delete("usrjwt");
      redirect("/login");
   }

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
   } catch (error) {
      console.log(error);
      return {
         success: false,
         message: `Category already exists`,
      };
   }
}

export async function getAllCategories(): Promise<ActionResponse<CategoryWithTransactions[]>> {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")?.value;
   const user = await verifyToken(token);

   if (!user) {
      cookieStore.delete("usrjwt");
      redirect("/login");
   }

   try {
      const categories = await prisma.category.findMany({
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
         include: {
            transactions: {
               select: {
                  amount: true,
               },
            },
         },
      });

      return {
         success: true,
         data: categories,
      };
   } catch (error) {
      return {
         success: false,
         message: `Internal Server Error`,
      };
   }
}
