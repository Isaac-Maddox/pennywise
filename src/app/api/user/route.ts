import { getUserbyToken } from "@/middleware_funcs";
import JSend from "../JSend";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
   const cookieStore = await cookies();

   if (!(await getUserbyToken(cookieStore.get("usrjwt")?.value))) {
      return JSend.fail({
         message: "You must be logged in to access this resource",
      });
   }

   return JSend.success({
      message: "You are authenticated!",
   });
}
