/**
 * POST /api/signup
 * Attempt to signup a user
 */

import prisma from "@/db";
import JSend from "../../JSend";
import { randomBytes, pbkdf2Sync } from "crypto";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   const body: SignupRequestBody = await req.json();

   const missing = (["email", "firstName", "lastName", "password"] as const).filter((field) => !body[field]);

   if (!!missing.length) {
      return JSend.fail({
         message: `Missing fields`,
         missing,
      });
   }

   const salt = randomBytes(16);
   const hashedPassword = pbkdf2Sync(body.password, salt, 310000, 32, "sha256");

   try {
      const user = await prisma.user.create({
         data: {
            ...body,
            password: hashedPassword.toString("hex"),
            salt: salt.toString("hex"),
         },
      });

      return JSend.success({
         user: {
            ...user,
            password: undefined,
            salt: undefined,
         }
      });
   } catch (err) {
      return JSend.fail({
         message: "This email is already in use"
      }, 400);
   }
}

interface SignupRequestBody {
   email: string;
   firstName: string;
   lastName: string;
   password: string;
}
