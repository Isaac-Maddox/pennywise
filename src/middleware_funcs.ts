import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "./db";
import { User } from "@prisma/client";

export const isLoggedIn = async (token: string | undefined): Promise<boolean> => {
   if (!token) {
      return false;
   }

   const userJWT = jwt.decode(token) as Omit<User, "password" | "salt">;

   console.log(userJWT);

   if (!userJWT) {
      return false;
   }

   const data = await prisma.user.findUnique({ where: { id: userJWT.id }, select: { salt: true } });

   console.log(data);

   if (!data) {
      return false;
   }

   if (!jwt.verify(token, data.salt)) {
      const cookieStore = await cookies();
      cookieStore.delete("usrjwt");
      return false;
   }

   return true;
};
