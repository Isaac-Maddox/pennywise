import { getUserbyToken } from "@/middleware_funcs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode[] }) {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")?.value;

   console.log("User token: " + token);

   if (await getUserbyToken(token)) {
      redirect("/app");
   }

   return children;
}
