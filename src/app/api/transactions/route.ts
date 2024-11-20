import { getUserbyToken } from "@/middleware_funcs";
import { cookies } from "next/headers";
import JSend from "../JSend";
import { NextRequest } from "next/server";
import prisma from "@/db";

export async function GET(req: NextRequest) {
   const cookieStore = await cookies();
   const jwt = cookieStore.get("usrjwt")?.value;
   const searchParams = req.nextUrl.searchParams;
   const page = Number(searchParams.get("page") ?? 1);
   const size = Number(searchParams.get("size") ?? 10);

   const user = await getUserbyToken(jwt);

   if (!user) {
      return JSend.Unauthenticated;
   }

   const transactions = await prisma.transaction.findMany({
      where: {
         userId: user.id
      },
      take: size,
      skip: (page - 1) * size
   });

   return JSend.success({
      transactions
   })
}