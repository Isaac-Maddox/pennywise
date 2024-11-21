import { getUserbyToken } from "@/middleware_funcs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: { children: React.ReactNode[] }) {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")?.value;
   const user = await getUserbyToken(token);

   if (!user) {
      redirect("/login");
   }

   return <div className="app-page">{children}</div>;
}
