import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DashboardPage from "@/components/app/dashboard/DashboardPage";

export default async function AppHome() {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")!.value;
   const user = jwt.decode(token) as User;

   if (!user) {
      redirect("/login");
   }

   return (
      <>
         <Suspense fallback={<p>loading</p>}>
            <DashboardPage user={user} />
         </Suspense>
      </>
   );
}
