"use server";

import { ActionResponse } from "@/types";
import prisma from "@/db";
import { User } from "@prisma/client";
import { pbkdf2Sync, randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const HASH_ITERATIONS: number = 310000;

export async function signup(
   data: Pick<User, "email" | "password" | "firstName" | "lastName"> & { confirmPassword: string }
): Promise<ActionResponse<null>> {
   const missing = (["email", "password", "firstName", "lastName"] as const).filter((field) => !data[field]);

   if (missing.length) {
      return {
         success: false,
         message: `Missing required fields: ${missing.join(", ")}`,
      };
   }

   const salt = randomBytes(16);
   const hashedPassword = pbkdf2Sync(data.password, salt, HASH_ITERATIONS, 32, "sha256");

   const createData = {
      ...data,
      confirmPassword: undefined,
      password: hashedPassword.toString("hex"),
      salt: salt.toString("hex"),
   };

   try {
      await prisma.user.create({
         data: createData,
      });

      return {
         success: true,
         data: null,
      };
   } catch {
      return {
         success: false,
         message: "This email is already in use",
      };
   }
}

export async function login(data: {
   email: string;
   password: string;
   remember: boolean;
}): Promise<ActionResponse<Partial<User>>> {
   const missing = (["email", "password", "remember"] as const).filter(
      (field) => !data[field] && data[field] !== false
   );

   if (missing.length) {
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

   const hashed = pbkdf2Sync(data.password, Buffer.from(user.salt, "hex"), HASH_ITERATIONS, 32, "sha256");

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
   if (data.remember) {
      cookieStore.set("usrjwt", token, {
         httpOnly: true,
         expires: d.setTime(d.getTime() + 360 * 24 * 7 * 1000),
      });
   } else {
      cookieStore.set("usrjwt", token, {
         httpOnly: true,
      });
   }

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

export const verifyToken = async (token: string | undefined): Promise<Omit<User, "password" | "salt"> | null> => {
   if (!token) {
      return null;
   }

   const userJWT = jwt.decode(token) as Omit<User, "password" | "salt"> | null;

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
