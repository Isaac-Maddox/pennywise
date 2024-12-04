/*
  Warnings:

  - You are about to drop the column `disabled` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "disabled";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "vendor" TEXT;
