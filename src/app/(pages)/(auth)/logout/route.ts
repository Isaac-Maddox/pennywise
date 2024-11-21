import { getUserbyToken } from "@/middleware_funcs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")?.value;

   const user = await getUserbyToken(token);

   console.log("Logging out", user);

   cookieStore.delete("usrjwt");

   redirect("/login");
}
