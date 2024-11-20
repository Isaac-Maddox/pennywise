import { isLoggedIn } from "@/middleware_funcs";
import JSend from "../JSend";
import { cookies } from "next/headers";

export async function GET(req: Request) {
   const cookieStore = await cookies();

   if (!(await isLoggedIn(cookieStore.get("usrjwt")?.value))) {
      return JSend(
         {
            status: "fail",
            data: {
               message: "You must be logged in to access this resource",
            },
         },
         401
      );
   }

   return JSend({
      status: "success",
      data: {
         message: "You are authorized!",
      },
   });
}
