/**
 * POST /api/signup
 * Attempt to signup a user
 */

import prisma from "@/db";
import JSend from "../../JSend";
import { randomBytes, pbkdf2Sync } from "crypto";

export async function POST(req: Request) {
   const body: SignupRequestBody = await req.json();

   const missing = (["email", "firstName", "lastName", "password"] as const).filter((field) => !body[field]);

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

   const salt = randomBytes(16);
   const hashedPassword = pbkdf2Sync(body.password, salt, 310000, 32, "sha256");

   const user = await prisma.user.create({
      data: {
         ...body,
         password: hashedPassword.toString("hex"),
         salt: salt.toString("hex"),
      },
   });

   return JSend({
      status: "success",
      data: {
         user: {
            ...user,
            password: undefined,
            salt: undefined,
         },
      },
   });
}

interface SignupRequestBody {
   email: string;
   firstName: string;
   lastName: string;
   password: string;
}
