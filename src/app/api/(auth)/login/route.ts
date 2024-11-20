/**
 * POST /api/login
 * Attempt to login a user
 */

import jwt from "jsonwebtoken";

import prisma from "@/db";
import JSend from "../../JSend";
import { pbkdf2Sync } from "crypto";
import { cookies } from "next/headers";

export async function POST(req: Request) {
   const body: LoginRequestBody = await req.json();

   const missing = (["email", "password"] as const).filter((field) => !body[field]);

   if (!!missing.length) {
      return JSend(
         {
            status: "fail",
            data: {
               message: `Missing fields`,
               missing,
            },
         },
         400
      );
   }

   const user = await prisma.user.findUnique({
      where: { email: body.email },
   });

   if (!user) {
      return JSend(
         {
            status: "fail",
            data: {
               message: "Invalid username or password",
            },
         },
         401
      );
   }

   const hashed = pbkdf2Sync(body.password, Buffer.from(user.salt, "hex"), 310000, 32, "sha256");

   if (hashed.toString("hex") !== user.password) {
      return JSend(
         {
            status: "fail",
            data: {
               message: "Invalid username or password",
            },
         },
         401
      );
   }

   const token = jwt.sign(
      {
         ...user,
         password: undefined,
         salt: undefined,
         categories: undefined,
         transactions: undefined,
      },
      user.salt
   );

   const cookieStore = await cookies();
   cookieStore.set("usrjwt", token);

   return JSend({
      status: "success",
      data: null,
   });
}

interface LoginRequestBody {
   email: string;
   password: string;
}
