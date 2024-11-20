import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "./db";
import { User } from "@prisma/client";

export const getUserbyToken = async (token: string | undefined): Promise<Omit<User, 'password' | 'salt'> | null> => {
   if (!token) {
      return null;
   }

   const userJWT = jwt.decode(token) as Omit<User, "password" | "salt">;

   console.log(userJWT);

   if (!userJWT) {
      return null;
   }

   const data = await prisma.user.findUnique({ where: { id: userJWT.id }, select: { salt: true } });

   if (!data) {
      return null;
   }

   if (!jwt.verify(token, data.salt)) {
      const cookieStore = await cookies();
      cookieStore.delete("usrjwt");
      return null;
   }

   return userJWT;
};