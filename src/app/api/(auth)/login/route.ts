/**
 * POST /api/login
 * Attempt to login a user
 */

import jwt from "jsonwebtoken";

import prisma from "@/db";
import JSend from "../../JSend";
import { pbkdf2Sync } from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   const body: LoginRequestBody = await req.json();

   const missing = (["email", "password"] as const).filter((field) => !body[field]);

   if (!!missing.length) {
      return JSend.fail({
         message: `Missing fields`,
         missing,
      });
   }

   const user = await prisma.user.findUnique({
      where: { email: body.email },
   });

   if (!user) {
      return JSend.fail({
         message: "Invalid username or password",
      });
   }

   const hashed = pbkdf2Sync(body.password, Buffer.from(user.salt, "hex"), 310000, 32, "sha256");

   if (hashed.toString("hex") !== user.password) {
      return JSend.fail({
         message: "Invalid username or password",
      });
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

   const d = new Date();
   const cookieStore = await cookies();
   cookieStore.set("usrjwt", token, {
      secure: true,
      httpOnly: true,
      expires: d.setTime(d.getTime() + 60 * 60 * 24 * 7 * 1000),
   });

   return JSend.success();
}

interface LoginRequestBody {
   email: string;
   password: string;
}
