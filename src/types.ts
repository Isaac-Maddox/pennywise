import { Category, Transaction } from "@prisma/client";

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

export type CategoryWithTransactions = Category & {
   transactions: Pick<Transaction, "amount">[];
};
