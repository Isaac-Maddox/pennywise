import { Category, Transaction, User } from "@prisma/client";

export type ActionResponse<Data = any> =
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

export type CategoryWithTransactionAmounts = Category & {
   transactions: Pick<Transaction, "amount">[];
};

export type TransactionWithCategoryName = Transaction & {
   category: Pick<Category, "name">;
};

export type SafeUser = Omit<User, "salt" | "password">;
