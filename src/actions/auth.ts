"use server";

import { ActionResponse } from "./types";
import prisma from "@/db";
import { User } from "@prisma/client";
import { pbkdf2Sync, randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export async function login(data: { email: string; password: string }): Promise<ActionResponse<Partial<User>>> {
   const missing = (["email", "password"] as const).filter((field) => !data[field]);

   if (!!missing.length) {
      return {
         success: false,
         message: `Missing required fields: ${missing.join(", ")}`,
      };
   }

   const user = await prisma.user.findUnique({
      where: { email: data.email },
   });

   if (!user) {
      return {
         success: false,
         message: "Invalid username or password",
      };
   }

   const hashed = pbkdf2Sync(data.password, Buffer.from(user.salt, "hex"), 310000, 32, "sha256");

   if (hashed.toString("hex") !== user.password) {
      return {
         success: false,
         message: "Invalid username or password",
      };
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
      httpOnly: true,
      expires: d.setTime(d.getTime() + 360 * 24 * 7 * 1000),
   });

   return {
      success: true,
      data: {
         ...user,
         password: undefined,
         salt: undefined,
      },
   };
}

export async function logout(): Promise<never> {
   const cookieStore = await cookies();
   cookieStore.delete("usrjwt");

   redirect("/login");
}
