"use server";

import prisma from "@/db";
import { User } from "@prisma/client";
import { pbkdf2Sync, randomBytes } from "crypto";

export async function signup(
   data: Pick<User, "email" | "password" | "firstName" | "lastName">
): Promise<ActionResponse<null>> {
   const missing = (["email", "password", "firstName", "lastName"] as const).filter((field) => !data[field]);

   if (!!missing.length) {
      return {
         success: false,
         message: `Missing required fields: ${missing.join(", ")}`,
      };
   }

   const salt = randomBytes(16);
   const hashedPassword = pbkdf2Sync(data.password, salt, 310000, 32, "sha256");

   try {
      await prisma.user.create({
         data: {
            ...{ ...data, confirmPassword: undefined },
            password: hashedPassword.toString("hex"),
            salt: salt.toString("hex"),
         },
      });

      return {
         success: true,
         data: null,
      };
   } catch (err) {
      console.log(err);

      return {
         success: false,
         message: "This email is already in use",
      };
   }
}

type ActionResponse<Data = any> =
   | {
        success: true;
        data: Data;
        message?: never;
     }
   | {
        success: false;
        data?: never;
        message: string;
     };
