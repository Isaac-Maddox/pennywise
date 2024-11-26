import { verifyToken } from "@/actions/auth";
import Nav from "@/components/app/Nav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import "@/css/pages/app.css";

export default async function AppLayout({ children }: { children: React.ReactNode[] }) {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")?.value;
   const user = await verifyToken(token);

   if (!user) {
      redirect("/login");
   }

   return (
      <>
         <Nav />
         <div className="app-page">{children}</div>
      </>
   );
}
