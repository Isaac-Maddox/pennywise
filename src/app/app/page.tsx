import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DashboardPage from "@/components/app/dashboard/DashboardPage";
import Loading from "@/components/Loading";

export default async function AppHome() {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")!.value;
   const user = jwt.decode(token) as User;

   if (!user) {
      redirect("/login");
   }

   return (
      <>
         <Suspense fallback={<Loading />}>
            <DashboardPage user={user} />
         </Suspense>
      </>
   );
}
