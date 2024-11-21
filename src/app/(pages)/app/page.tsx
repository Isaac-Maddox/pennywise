import { getUserbyToken } from "@/middleware_funcs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function AppHome() {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")?.value;
   const user = await getUserbyToken(token);

   return (
      <>
         <h1>Hello, {user?.firstName}</h1>
         <Link href="/logout">Log out</Link>
      </>
   );
}
