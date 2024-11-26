import { logout } from "@/actions/auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export default async function AppHome() {
   const cookieStore = await cookies();
   const token = cookieStore.get("usrjwt")!.value;
   const user = jwt.decode(token) as User;

   return (
      <>
         <h1>Hello, {user?.firstName}</h1>
         <button onClick={logout}>Log out</button>
      </>
   );
}
