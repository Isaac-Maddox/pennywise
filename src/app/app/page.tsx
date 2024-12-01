import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import Header from "@/components/app/dashboard/Header";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import HeaderFallback from "@/components/app/dashboard/HeaderFallback";

export default async function AppHome() {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")!.value;
   const user = jwt.decode(token) as User;

   if (!user) {
      redirect("/login");
   }

   return (
      <>
         <Suspense fallback={<HeaderFallback user={user} />}>
            <Header user={user} />
         </Suspense>
      </>
   );
}
