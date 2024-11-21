import { verifyToken } from "@/actions/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode[] }) {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")?.value;

   if (await verifyToken(token)) {
      redirect("/app");
   }

   return children;
}
